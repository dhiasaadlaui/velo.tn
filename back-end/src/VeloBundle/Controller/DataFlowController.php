<?php

namespace VeloBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use VeloBundle\Entity\InfoFlowEntity\DataFlow;
use VeloBundle\Entity\InfoFlowEntity\Story;
use VeloBundle\Entity\InfoFlowEntity\StoryComment;
use FOS\RestBundle\Controller\Annotations as Rest;
use VeloBundle\Entity\User;

class DataFlowController extends Controller
{


    /**
     * @Rest\Post("/addData")
     */
    public function addDataAction(Request $request)
    {
        $data = $request->getContent();
        $d = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\InfoFlowEntity\DataFlow', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->persist($d);
        $em->flush();
        return new Response('Story added succesfully');
    }


    /**
     * @Rest\Get("/getData/{username}")
     */
    public function getDataAction($username)
    {

        $em=$this->getDoctrine()->getManager();
        $d=$em->getRepository(DataFlow::class)->findOneBy(['username' => $username]);

        $data=$this->get('jms_serializer')->serialize($d,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/getDataLikes/{username}")
     */
    public function getDataLikesAction($username)
    {    $likes=0;
        $em=$this->getDoctrine()->getManager();
        $stories=$em->getRepository(Story::class)->findBy(['username' => $username]);

        foreach ($stories as $story) {
            $likes+= $story->getLikes();
         }
          return $likes;
     }
    /**
     * @Rest\Delete("/unsubscribe/{username}")
     */
    public function deleteDataAction($username)
    {
        $em=$this->getDoctrine()->getManager();
        $sdata=$em->getRepository(DataFlow::class)->find($username);

        $em->remove($sdata);
        $em->flush();
        return new JsonResponse(["msg"=>"data deleted with success"],200);
    }
    /**
     * @Rest\Post("/report/{username}")
     */
    public function reportAction(  $username)
    {
        $em=$this->getDoctrine()->getManager();
        $data=$em->getRepository(DataFlow::class)->findOneBy(['username' => $username]);
        $current=$data->getReports();
        $data->setReports($current+1);

         $em->persist($data);
        $em->flush();
        $response = array(
            'code' => 0,
            'message' => 'reported!',
            'errors' => null,
            'result' => null
        );
        return new JsonResponse($response, 200);
    }

    /**
     * @Rest\Post("/commend/{username}")
     */
    public function commendAction(  $username)
    {
        $em=$this->getDoctrine()->getManager();
        $data=$em->getRepository(DataFlow::class)->findOneBy(['username' => $username]);
        $current=$data->getCommends();
        $data->setCommends($current+1);

        $em->persist($data);
        $em->flush();
        $response = array(
            'code' => 0,
            'message' => 'commended!',
            'errors' => null,
            'result' => null
        );
        return new JsonResponse($response, 200);
    }
    
}
