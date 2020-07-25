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

    public function getEventsAction()
    {
        $em=$this->getDoctrine()->getManager();
        $claims=$em->getRepository(Event::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($claims,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }



    /**
     * @Rest\Get("/getEvent/{id}")
     */
    public function getEventAction($id)
    {
        $event = $this->getDoctrine()->getManager()->findOneBy(['id' => $id]);
        // $jsonObject = $this->serializer($event,$this->serializer);
        //return $this->respond($jsonObject);
        $jsonObject = $this->serializer->serialize($event, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);

    }

    /**
     * @Rest\Post("/addEvent")
     */
    public function addEventAction(Request $request)
    {
        //récupérer le contenu de la requête envoyé par l'outil postman
        $data = $request->getContent();
        //deserialize data: création d'un objet à partir des données json envoyées
        $event = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Event', 'json');
        if (!$request) {
            return $this->respondValidationError('Please provide a valid request!');
        }

        // Create and persist the new event Config using cascade since that the relation is composition oneToOne
        $em = $this->getDoctrine()->getManager();
        $em->merge($event);
        $em->flush();
        return new JsonResponse(["msg"=>"Added with success"],200);;
    }

    /**
     * @Rest\Delete("/deleteEvent/{id}")
     */
    public function deleteEventAction($id)
    {
        $event = $this->eventRepository->findOneBy(['id' => $id]);
        if (!$event) {
            return $this->respondValidationError('No EventConfig entity with this (id = ' . $id .") ". 'exist');
        }
        $this->entityManager->remove($event);
        $this->entityManager->flush();

    }

    /**
     * @Rest\Patch("/updateEvent/{id}")
     */
    public function patchEventAction(Request $request)
    {
        if (!$request) {
            return $this->respondValidationError('Please provide a valid request!');
        }
        // validate Variables Needed !!!!!
        if (!$request->getContent()) {
            return $this->respondValidationError('Please provide an Event!');
        }

        if (!$request->get('eventName')) {
            return $this->respondValidationError('Please provide an event!');
        }

        $event = $this->eventRepository->findOneBy([
            'id' => $request->get('id')]);

        if (!$event) {
            return $this->respondValidationError('No Event entity with this (id = ' . $request->get('id') . ") " . 'exist');
        }
        $event = $this->createEvent($request);
        $this->entityManager->persist($event);
        $this->entityManager->flush();

        /** ONLY FOR TEST */
        //return $this->json([
        //     'response' => 'Updated Successfully'
        // ]);
        /**              **/

        $jsonObject = $this->serializer($event, $this->serializer);
        return $this->respond($jsonObject);
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


    private function createEvent(Request $req)
    {
        $event = new Event();
        $event->setEventName($req->get('eventName'));
        $event->setDistance($req->get('distance'));
        $event->setLocation($req->get('location'));
        $event->setStartDate($req->get('startDate'));
        $event->setEndDate($req->get('startDate'));
        $event->setIsTheme($req->get('isTheme'));

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


}
