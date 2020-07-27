<?php

namespace VeloBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use VeloBundle\Entity\Disponibility;
use VeloBundle\Entity\InfoFlowEntity\Story;
use VeloBundle\Entity\InfoFlowEntity\StoryComment;
use FOS\RestBundle\Controller\Annotations as Rest;

class InfoFlowStoryController extends Controller
{


    /**
     * @Rest\Post("/addStory")
     */
     public function addStoryAction(Request $request)
    {
        $data = $request->getContent();
        $story = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\InfoFlowEntity\Story', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->persist($story);
        $em->flush();
        return new Response('Story added succesfully');
    }

    /**
     * @Rest\Post("/likeStory/{id}")
     */
    public function likeStory($id)
    {        $em=$this->getDoctrine()->getManager();
         $story=$em->getRepository(Story::class)->findOneBy(['id' => $id]);
         $likes = $story->getLikes();
        $story->setLikes($likes+1);
        $em = $this->getDoctrine()->getManager();
        $em->persist($story);
        $em->flush();
        return new Response('story liked!');
    }
    /**
     * @Rest\Post("/unlikeStory/{id}")
     */
    public function unlikeStory($id)
    {        $em=$this->getDoctrine()->getManager();
        $story=$em->getRepository(Story::class)->findOneBy(['id' => $id]);
        $likes = $story->getLikes();
        $story->setLikes($likes-1);
        $em = $this->getDoctrine()->getManager();
        $em->persist($story);
        $em->flush();
        return new Response('story liked!');
    }

    /**
     * @Rest\Get("/getStory/{id}")
     */
    public function getStoryAction($id)
    {

        $em=$this->getDoctrine()->getManager();
        $stories=$em->getRepository(Story::class)->findOneBy(['id' => $id]);
        $data=$this->get('jms_serializer')->serialize($stories,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/getStories")
     */
     public function getStoriesAction()
    {
        $em=$this->getDoctrine()->getManager();
        $stories=$em->getRepository(Story::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($stories,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;

    }
    /**
     * @Rest\Delete("/deleteStory/{id}")
     */
    public function deleteStoryAction($id)
    {
         $em=$this->getDoctrine()->getManager();
        $story=$em->getRepository(Story::class)->find($id);
        $comments=$em->getRepository(StoryComment::class)->findBy(['story' => $story]);
        foreach ($comments as $comment) {
            $em->remove($comment);
        }

        $em->remove($story);
        $em->flush();
        return new JsonResponse(["msg"=>"story deleted with success"],200);
    }
    /**
     * @Rest\Post("/updateStory/{id}")
     */
    public function updateStoryAction(Request $request, $id)
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
        $newContent=$data->getContent();
        $newSummary=$data->getSummary();
        $newImg= $data->getImg();
        if(!empty($newContent)){
            $story->setContent($newContent);
        }
        if(!empty($newSummary)){
            $story->setSummary($newSummary);
        }
        if(!empty($newImg)){
            $story->setImg($newImg);
        }
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
}
