<?php

namespace VeloBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use VeloBundle\Entity\Assignation;
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

    public function deleteClaimAction(Request $request,$id)
    {
        $em=$this->getDoctrine()->getManager();
        $claim=$em->getRepository(Claim::class)->find($id);
        $em->remove($claim);
        $em->flush();
        return new JsonResponse(["msg"=>"deleted with success"],200);
    }

    public function updateClaimAction(Request $request, $id)
    {
        $em=$this->getDoctrine()->getManager();
        $data = $request->getContent();
        $claim = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Claim', 'json');
        $oldclaim=$em->getRepository(Claim::class)->find($id);
        $em->merge($claim);
        $em->flush();
        return new JsonResponse(["msg"=>"success"],200);

    }
    public function updateAssignedClaimAction(Request $request, $id)
    {
        $em=$this->getDoctrine()->getManager();
        $data = $request->getContent();
        $claim = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Claim', 'json');
        $oldclaim=$em->getRepository(Claim::class)->find($id);
        $oldclaim->setStatus($claim->getStatus());
        $em->merge($oldclaim);
        $em->flush();
        return new JsonResponse(["msg"=>"success"],200);

    }

    public function assignAction($userid,$claimid)
    {
        $em=$this->getDoctrine()->getManager();
        $claim=$em->getRepository(Claim::class)->find($claimid);
        $assign = new Assignation();
        $assign->setUser($userid);
        $assign->setClaim($claim);
        $em->persist($assign);
        $em->flush();
        return new JsonResponse(["msg"=>"success"],200);
    }

    ##STAT
    public function getstatsAction(Request $request)
    {
        $mydata = array_fill_keys(
            array('Tunis', 'Carthage', 'Cité El Khadra', 'Djebel Jelloud', 'El Menzah','El Omrane','El Ouardia'), '');
        $newArr = array_fill_keys(
            array('Tunis', 'Carthage', 'Cité El Khadra', 'Djebel Jelloud', 'El Menzah','El Omrane','El Ouardia'), '');
        $em = $this->getDoctrine()->getManager();
        $connection = $em->getConnection();
        $statement = $connection->prepare("SELECT count(*) AS stat from markers WHERE address = :addr");
        foreach($mydata as $x => $x_value) {
            $statement->bindValue('addr', $x);
            $statement->execute();
            $results = $statement->fetchAll();
            $newArr[$x] = $results;
        }
        $data=$this->get('jms_serializer')->serialize($newArr,'json');
        $response=new Response($data);
        return $response;
    }

}
