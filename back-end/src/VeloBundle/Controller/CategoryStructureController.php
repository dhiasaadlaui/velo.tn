<?php

namespace VeloBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use VeloBundle\Controller\ApiController;
use VeloBundle\Entity\Step;
use VeloBundle\Repository\StepRepository;

class CategoryStructureController extends ApiController
{
    /**
     * @var EntityManager
     **/
    private $entityManager;


    /**
     * @var StepRepository
     **/
    private $stepRepository;


    /**
     * @var Encoders
     **/
    private $encoders;

    /**
     * @var Normalizers
     **/
    private $normalizers;

    /**
     * @var Serializer
     **/
    private $serializer;

    /**
     * @Rest\Get("/getSteps")
     */
    public function getSteps()
    {
        $this->encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $this->normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
        $em=$this->getDoctrine()->getManager();
        $events=$em->getRepository(Step::class)->findAll();
        $jsonObject = $this->serializer->serialize($events, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);

        /*//$data=$this->get('jms_serializer')->serialize($events,'json');
        $response=new Response($jsonObject);
        $response->headers->set('Content-Type', 'application/json');
        return $response;*/
    }



    /**
     * @Rest\Get("/getStep/{id}")
     */
    public function getStep($id)
    {
        $this->encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $this->normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
        // Create and persist the new event Config using cascade since that the relation is composition oneToOne
        $event = $this->getDoctrine()->getManager()->getRepository(Step::class)->findOneBy(['id' => $id]);

        $jsonObject = $this->serializer->serialize($event, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);

    }


    /**
     * @Rest\Post("/createStep")
     */
    public function createStep(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $data = $request->getContent();
        $step = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Step', 'json');
         $em ->persist($step);
        $em->flush();
        return new Response('Story added succesfully');
    }

    /**
     * @Rest\Delete("/deleteStep/{id}")
     */
    public function deleteStepAction($id)
    {
        $event = $this->getDoctrine()->getManager()->getRepository(Step::class)->findOneBy(['id' => $id]);
        if (!$event) {
            return $this->respondValidationError('No EventConfig entity with this (id = ' . $id .") ". 'exist');
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($event);
        $em->flush();

    }


    public function updateAction(Request $request, $id)
    {
        $data = $this->getDoctrine()->getManager()->getRepository(Step::class)->findOneBy(['id' => $id]);
        //récupérer le contenu de la requête envoyé par l'outil postman
        $dataReq = $request->getContent();
        //deserialize data: création d'un objet à partir des données json envoyées
        $step = $this->get('jms_serializer')->deserialize($dataReq, 'VeloBundle\Entity\Step', 'json');

        $data->setTitle($step->getTitle('event_name'));
        $data->setLocationSart($step->getLocationSart('distance'));
        $data->setLocationEnd($step->getLocationEnd('location'));
        $data->setStartDay($step->getStartDay('start_date'));
        $data->setEndDay($step->getEndDay('end_date'));
        $data->setRepeat($step->getRepeat('repeat'));
        $data->setEndRepeat($step->getEndRepeat('end_repeat'));
        $data->setRule($step->getRule('rule'));
        $data->setGender($step->getGender('gender'));
        $data->setAge($step->getAge('age'));
        $data->setDifficulty($step->getDifficulty('difficulty'));
        $data->setDiagrame($step->getDiagrame('diagrame'));
        $data->setTheme($step->getTheme('theme'));
        $data->setAssociationName($step->getAssociationName('association_name'));
        $data->setCategory($step->getCategory('category_step_id'));
        // Create and persist the new event Config using cascade since that the relation is composition oneToOne
        $em = $this->getDoctrine()->getManager();
        $em->persist($data);
        $em->flush();
        return new JsonResponse(["msg"=>"Added with success"],200);;


    }

    /**
     * @Rest\Get("/ping")
     */
    public function healthCheck()
    {
        return $this->json([
            'response' => 'pong',
        ]);
    }


    private function createSteps(Request $req)
    {
        $data = new Step();
        $data->setTitle($req->get('event_name'));
        $data->setLocationSart($req->get('distance'));
        $data->setLocationEnd($req->get('location'));
        $data->setStartDay($req->get('start_date'));
        $data->setEndDay($req->get('end_date'));
        $data->setRepeat($req->get('repeat'));
        $data->setEndRepeat($req->get('end_repeat'));
        $data->setRule($req->get('rule'));
        $data->setGender($req->get('gender'));
        $data->setAge($req->get('age'));
        $data->setDifficulty($req->get('difficulty'));
        $data->setDiagrame($req->get('diagrame'));
        $data->setTheme($req->get('theme'));
        $data->setAssociationName($req->get('association_name'));
        $data->setCategory($req->get('category_step_id'));

        /*if ($req->get('category')) {
            $category = $this->categoryRepository->find([
                'id' => $req->get('category')]);
            if (!$category) {
                return $this->respondValidationError('No Category entity with this (id = ' . $req->get('category') . ") " . 'exist');
            } else {
                $event->setCategory($category);
            }
        }*/
        return $data;
    }

    public function subscribeToEventAction(Request $request)
    {
        //récupérer le contenu de la requête envoyé par l'outil postman
        $data = $request->getContent();
        //deserialize data: création d'un objet à partir des données json envoyées
        $user = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\User', 'json');
        //ajout dans la base
        $em = $this->getDoctrine()->getManager();
        $em->merge($user);
        $em->flush();
        return new Response('User added succesfully');
    }


}
