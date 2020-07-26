<?php

namespace VeloBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use VeloBundle\Entity\InfoFlowEntity\Story;
use VeloBundle\Entity\InfoFlowEntity\StoryComment;
use VeloBundle\Entity\User;
use FOS\RestBundle\Controller\Annotations as Rest;
class InfoFlowCommentController extends Controller
{

    /**
     * @Rest\Post("/addComment/{id}")
     */
    public function addCommentAction(Request $request, $id)
    {        $em = $this->getDoctrine()->getManager();

        $data = $request->getContent();
        $stories=$em->getRepository(Story::class)->findOneBy(['id' => $id]);

        $comment = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\InfoFlowEntity\StoryComment', 'json');
        $comment->setStory($stories);
        $em ->persist($comment);
        $em->flush();
        return new Response('comment added succesfully');
    }
    /**
     * @Rest\Get("/findComments")
     */
    public function findCommentsAction()
    {
        $em=$this->getDoctrine()->getManager();
        $comments=$em->getRepository(StoryComment::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($comments,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/findCommentsByStory/{id}")
     */
    public function findCommentsByStoryAction($id)
    {
        $em=$this->getDoctrine()->getManager();
        $stories=$em->getRepository(Story::class)->finOnedBy(['id' => $id]);
         $comments=$em->getRepository(StoryComment::class)->findBy(['story' => $stories]);
        $data=$this->get('jms_serializer')->serialize($comments,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
/**
 * @Rest\Get("/findComment/{id}")
 */
    public function findCommentAction($id)
    {
        $em=$this->getDoctrine()->getManager();
        $story=$em->getRepository(StoryComment::class)->findOneBy(['id' => $id]);
        $em->remove($story);
        $em->flush();
        return new JsonResponse(["msg"=>"story deleted with success"],200);
    }
    /**
     * @Rest\Post("/updateComment/{id}")
     */
    public function updateCommentAction(Request $request,$id)
    {
        $em=$this->getDoctrine()->getManager();
        $story=$em->getRepository(Story::class)->findOneBy(['id' => $id]);
        if (empty($story)) {
            $response = array(
                'code' => 1,
                'message' => 'story Not found !',
                'errors' => null,
                'result' => null
            );
            return new JsonResponse($response, Response::HTTP_NOT_FOUND);
        }
        $body = $request->getContent();

        $data = $this->get('jms_serializer')->deserialize($body, 'VeloBundle\Entity\InfoFlowEntity\Story', 'json');
        $story->setContent($data->getContent());
         $em->persist($story);
        $em->flush();
        $response = array(
            'code' => 0,
            'message' => 'updated!',
            'errors' => null,
            'result' => null
        );
        return new JsonResponse($response, 200);
    }
    /**
     * @Rest\Delete("/deleteComment/{id}")
     */
    public function deleteCommentAction($id)
    {
        $em=$this->getDoctrine()->getManager();
        $story=$em->getRepository(StoryComment::class)->find($id);
        $em->remove($story);
        $em->flush();
        return new JsonResponse(["msg"=>"story deleted with success"],200);
    }

}
