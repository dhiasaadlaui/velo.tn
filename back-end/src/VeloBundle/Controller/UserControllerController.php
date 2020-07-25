<?php

namespace VeloBundle\Controller;

use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use VeloBundle\Entity\Disponibility;
use VeloBundle\Entity\User;
use VeloBundle\Entity\Volonteer;

class UserControllerController extends Controller
{
    public function addAction(Request $request)
    {
        //récupérer le contenu de la requête envoyé par l'outil postman
        $data = $request->getContent();
        //deserialize data: création d'un objet à partir des données json envoyées
        $user = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Volonteer', 'json');
        //ajout dans la base
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
     return new Response('User added succesfully');
}

    public function getusersAction()
    {
        $em=$this->getDoctrine()->getManager();
        $users=$em->getRepository(User::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($users,'json');
        $response=new Response($data);
        return $response;

    }

    public function finduserAction(User $user)
    {
        $data=$this->get('jms_serializer')->serialize($user,'json');
        $response=new Response($data);
        return $response;
    }

    public function updateUserAction(Request $request, $id)
    {
        $em=$this->getDoctrine()->getManager();
        $user=$em->getRepository(Volonteer::class)->find($id);
        $data=$request->getContent();
        $yummy = json_decode($data);
       /* foreach ($yummy->disponibility->v_date as $value){
            $dis = new Disponibility();
            $dateObj = DateTime::createFromFormat('Y-m-d', $value);
            $dis->setDate($dateObj);
            $dis->setVolunteer($user);
            $em->persist($dis);

        }*/
        $user->setIsVolunteer(true);
        $em->persist($user);
        $em->flush();
        return new JsonResponse(["msg"=>"success"],200);

    }

    public function deleteUserAction(Request $request)
    {
        $id=$request->get('id');
        $em=$this->getDoctrine()->getManager();
        $user=$em->getRepository(User::class)->find($id);
        $em->remove($user);
        $em->flush();
        return new JsonResponse(["msg"=>"deleted with success"],200);
    }

}
