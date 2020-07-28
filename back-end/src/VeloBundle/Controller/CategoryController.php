<?php

namespace VeloBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use VeloBundle\Entity\Category;
use VeloBundle\Entity\Step;
use VeloBundle\Entity\Event;
use VeloBundle\Repository\CategoryRepository;
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

class CategoryController extends ApiController
{
    /**
     * @var EntityManager
     **/
    private $entityManager;

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
     * @Rest\Get("/getCategories")
     */
    public function getCategories()
    {
        $em=$this->getDoctrine()->getManager();
        $claims=$em->getRepository(Category::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($claims,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Rest\Get("/getCategorieEvents/{id}")
     */
    public function getCategoryEvents(Request $request)
    {
        $request = $this->transformJsonBody($request);
        $categoryDB = $this->categoryRepository->findOneBy(['id' => $request->get('id')]);
        $events = $categoryDB->getEvents();
        // $jsonObject = $this->serializer($event,$this->serializer);
        //return $this->respond($jsonObject);
        $jsonObject = $this->serializer->serialize($events, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);

    }


    /**
     * @Rest\Get("/getCategory/{id}")
     */
    public function getCategory($id)
    {
        $this->encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $this->normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
        // Create and persist the new event Config using cascade since that the relation is composition oneToOne
        $category = $this->getDoctrine()->getManager()->getRepository(Category::class)->findOneBy(['id' => $id]);

        $jsonObject = $this->serializer->serialize($category, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);

    }


    /**
     * @Rest\Post("/createCategory")
     */
    public function createCategory(Request $request)
    {
        $this->encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $this->normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
        //récupérer le contenu de la requête envoyé par l'outil postman
            $em = $this->getDoctrine()->getManager();
            $data = $request->getContent();
            //$step=$em->getRepository(Step::class)->findOneBy(['id' => $id]);
            $category = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Category', 'json');
            $em ->persist($category);
            $em->flush();
           $jsonObject = $this->serializer->serialize($category, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);    }



    /**
     * @Rest\Put("/updateCategory/{id}")
     */
    public function updateCategory(Request $request, $id)
    {

        $this->encoders = [new JsonEncoder()]; // If no need for XmlEncoder
        $this->normalizers = [new DateTimeNormalizer(), new ObjectNormalizer()];
        $this->serializer = new Serializer($this->normalizers, $this->encoders);
        $categoryDB = $this->getDoctrine()->getManager()->getRepository(Category::class)->findOneBy(['id' => $id]);
        //récupérer le contenu de la requête envoyé par l'outil postman
        $dataReq = $request->getContent();
        //deserialize data: création d'un objet à partir des données json envoyées
        $categoryFromRequest = $this->get('jms_serializer')->deserialize($dataReq, 'VeloBundle\Entity\Category', 'json');

        $categoryDB->setCategoryName($categoryFromRequest->getCategoryName());
        $categoryDB->setCategoryImg($categoryFromRequest->getCategoryImg());
        if ($categoryFromRequest->getStep()) {
            $step_id =$categoryFromRequest->getStep()->getId();
            $step = $this->getDoctrine()->getManager()->getRepository(Step::class)->findOneBy(['id' => $step_id]);
            if (!$step) {
                return $this->respondValidationError('No Step entity with this (id = ' . $step_id . ") " . 'exist');
            } else {
                $stepFromRequeest = $categoryFromRequest->getStep();
                $step->setTitle($stepFromRequeest->getTitle());
                $step->setLocationStart($stepFromRequeest->getLocationStart());
                $step->setLocationEnd($stepFromRequeest->getLocationEnd());
                $step->setStartDay($stepFromRequeest->getStartDay());
                $step->setEndDay($stepFromRequeest->getEndDay());
                $step->setRepeat($stepFromRequeest->getRepeat());
                $step->setEndRepeat($stepFromRequeest->getEndRepeat());
                $step->setRule($stepFromRequeest->getRule());
                $step->setGender($stepFromRequeest->getGender());
                $step->setAge($stepFromRequeest->getAge());
                $step->setDifficulty($stepFromRequeest->getDifficulty());
                $step->setDiagrame($stepFromRequeest->getDiagrame());
                $step->setTheme($stepFromRequeest->getTheme());
                $step->setAssociationName($stepFromRequeest->getAssociationName());
                $categoryDB->setStep($step);
            }
        }
        // Create and persist the new event Config using cascade since that the relation is composition oneToOne
        $em = $this->getDoctrine()->getManager();
        $em->persist($categoryDB);
        $em->flush();
        $jsonObject = $this->serializer->serialize($categoryDB, 'json', [
            'circular_reference_handler' => function ($object) {
                return $object->getId();
            }
        ]);
        return new Response($jsonObject, 200, ['Content-Type' => 'application/json']);
    }



    /**
     * @Rest\Delete("/deleteCategory/{id}")
     */
    public function deleteEventAction($id)
    {
        $data = $this->getDoctrine()->getManager()->getRepository(Category::class)->findOneBy(['id' => $id]);
        if (!$data) {
            return $this->respondValidationError('No EventConfig entity with this (id = ' . $id .") ". 'exist');
        }
        $em = $this->getDoctrine()->getManager();
        $em->remove($data);
        $em->flush();

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


    private  function category(Request $req) {
        $category = new Category();
        $category->setCategoryName( $req->get('categoryName'));
        return $category;

    }


}
