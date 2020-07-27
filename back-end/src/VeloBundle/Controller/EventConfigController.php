<?php

namespace VeloBundle\Controller;

use VeloBundle\Entity\Event;
use VeloBundle\Entity\EventConfig;
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

class EventConfigController extends ApiController
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
     * @Rest\Get("/config/getConfigs")
     */
    public function index()
    {
        $em=$this->getDoctrine()->getManager();
        $events=$em->getRepository(EventConfig::class)->findAll();
        $jsonObject = $this->serializer->serialize($events, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        $response=new Response($jsonObject);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     *
     * @Rest\Get("/config/getConfig/{id}")
     */
    public function getConfig($id)
    {
        $this->encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $this->normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
        $eventConfig = $this->getDoctrine()->getManager()->getRepository(EventConfig::class)->findOneBy(['id' => $id]);
        $jsonObject = $this->serializer($eventConfig,$this->serializer);
        return $this->respond($jsonObject);
    }

    /**
     * @Rest\Post("/config/createConfig")
     */
    public function createConf(Request $request)
    {
        $this->encoders = [new JsonEncoder()];
        // If no need for XmlEncoder
        $this->normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
        //récupérer le contenu de la requête envoyé par l'outil postman
        $data = $request->getContent();
        //deserialize data: création d'un objet à partir des données json envoyées
        $event = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\EventConfig', 'json');
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
     * @Rest\Patch("/config/updateConfig/{id}")
     */
    public function updateConfig(Request $request, $id)
    {
        $data = $this->getDoctrine()->getManager()->getRepository(Event::class)->findOneBy(['id' => $id]);
        //récupérer le contenu de la requête envoyé par l'outil postman
        $dataReq = $request->getContent();
        //deserialize data: création d'un objet à partir des données json envoyées
        $step = $this->get('jms_serializer')->deserialize($dataReq, 'VeloBundle\Entity\EventConfig', 'json');

        $data->setLocationSart($step->getLocationSart());
        $data->setLocationEnd($step->getLocationEnd());
        $data->setStartDay($step->getStartDay());
        $data->setEndDay($step->getEndDay());
        $data->setRepeat($step->getRepeat());
        $data->setEndRepeat($step->getEndRepeat());
        $data->setRule($step->getRule());
        $data->setGender($step->getGender());
        $data->setAge($step->getAge());
        $data->setDifficulty($step->getDifficulty());
        $data->setTheme($step->getTheme());
        $data->setAssociationName($step->getAssociationName());
        // Create and persist the new event Config using cascade since that the relation is composition oneToOne
        $em = $this->getDoctrine()->getManager();
        $em->persist($data);
        $em->flush();
        return new JsonResponse(["msg"=>"Added with success"],200);;
    }



}
