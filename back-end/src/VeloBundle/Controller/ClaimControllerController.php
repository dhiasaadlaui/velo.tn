<?php

namespace VeloBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use VeloBundle\Entity\Claim;
use VeloBundle\Entity\Markers;

class ClaimControllerController extends Controller
{
    public function addAction(Request $request)
    {
        //récupérer le contenu de la requête envoyé par l'outil postman
        $data = $request->getContent();
        //deserialize data: création d'un objet à partir des données json envoyées
        $claim = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Claim', 'json');
        //ajout dans la base
        $em = $this->getDoctrine()->getManager();
        $em->merge($claim);
        $em->flush();

        return new JsonResponse(["msg"=>"deleted with success"],200);;
    }

    public function getclaimsAction()
    {
        $em=$this->getDoctrine()->getManager();
        $claims=$em->getRepository(Claim::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($claims,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
