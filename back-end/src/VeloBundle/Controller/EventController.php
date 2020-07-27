<?php

namespace VeloBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use VeloBundle\Entity\Claim;
use VeloBundle\Entity\Event;
use VeloBundle\Entity\EventConfig;
use VeloBundle\Repository\CategoryRepository;
use VeloBundle\Repository\EventConfigRepository;
use VeloBundle\Repository\EventRepository;
use Doctrine\ORM\EntityManagerInterface;
use FOS\RestBundle\Controller\AbstractFOSRestController;
use FOS\RestBundle\Request\ParamFetcher;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use VeloBundle\Controller\ApiController;

class EventController extends ApiController
{
    /**
     * @var EntityManager
     **/
    private $entityManager;

    /**
     * @var EventRepository
     **/
    private $eventRepository;

    /**
     * @var EventConfigRepository
     **/
    private $eventConfigRepository;

    /**
     * @var CategoryRepository
     **/
    private $categoryRepository;

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
     * @Rest\Get("/getEvents")
     */

    public function getEvents()
    {
        $em=$this->getDoctrine()->getManager();
        $events=$em->getRepository(Event::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($events,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }



    /**
     * @Rest\Get("/getEvent/{id}")
     */
    public function getEvent($id)
    {
        $this->encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $this->normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
         // Create and persist the new event Config using cascade since that the relation is composition oneToOne
        $event = $this->getDoctrine()->getManager()->getRepository(Event::class)->findOneBy(['id' => $id]);

        $jsonObject = $this->serializer->serialize($event, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);

    }


    /**
     * @Rest\Post("/createEvent")
     */
    public function createEvent(Request $request)
    {
        $this->encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $this->normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
        //récupérer le contenu de la requête envoyé par l'outil postman
        $data = $request->getContent();
        //deserialize data: création d'un objet à partir des données json envoyées
        $event = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Event', 'json');
        if (!$request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        // Create and persist the new event Config using cascade since that the relation is composition oneToOne
        $em = $this->getDoctrine()->getManager();
        $em->persist($event);
        $em->flush();
        $jsonObject = $this->serializer->serialize($event, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);
    }

    /**
     * @Rest\Delete("/deleteEvent/{id}")
     */
    public function deleteEventAction($id)
    {
        $event = $this->getDoctrine()->getManager()->getRepository(Event::class)->findOneBy(['id' => $id]);
        if (!$event) {
            return $this->respondValidationError('No EventConfig entity with this (id = ' . $id .") ". 'exist');
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($event);
        $em->flush();

    }

    /**
     * @Rest\Put("/updateEvent/{id}")
     */
    public function updateEvent(Request $request, $id)
    {
        $data = $this->getDoctrine()->getManager()->getRepository(Event::class)->findOneBy(['id' => $id]);
        //récupérer le contenu de la requête envoyé par l'outil postman
        $dataReq = $request->getContent();
        //deserialize data: création d'un objet à partir des données json envoyées
        $event = $this->get('jms_serializer')->deserialize($dataReq, 'VeloBundle\Entity\Event', 'json');

        $data->setEventName($event->getEventName('event_name'));
        $data->setDistance($event->getDistance('distance'));
        $data->setLocation($event->getLocation('location'));
        $data->setStartDate($event->getStartDate('start_date'));
        $data->setEndDate($event->getEndDate('end_date'));
        $data->setIsTheme($event->getIsTheme('is_theme'));
        $data->setIsArchived($event->getIsArchived('is_archived'));
        $data->setRate($event->getRate('rate'));
        $data->setCreatorUserId($event->getCreatorUserId('creator_user_id'));
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


    private function createEventd(Request $req)
    {
        $event = new Event();
        $event->setEventName($req->get('event_name'));
        $event->setDistance($req->get('distance'));
        $event->setLocation($req->get('location'));
        $event->setStartDate($req->get('start_date'));
        $event->setEndDate($req->get('end_date'));
        $event->setIsTheme($req->get('is_theme'));

        if ($req->get('category')) {
            $category = $this->categoryRepository->find([
                'id' => $req->get('category')]);
            if (!$category) {
                return $this->respondValidationError('No Category entity with this (id = ' . $req->get('category') . ") " . 'exist');
            } else {
                $event->setCategory($category);
            }
        }
        return $event;
    }

    public function subscribeToEventAction(Request $request)
    {
        // called and invoke update with just the champs subscribe ++
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
