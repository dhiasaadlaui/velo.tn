<?php

namespace VeloBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use VeloBundle\Entity\Disponibility;
use FOS\RestBundle\Controller\Annotations as Rest;
use VeloBundle\Entity\ProductCategory;

class MarketplaceController extends Controller
{
    /**
     * @Rest\Post("/categories")
     */
    public function createCategory(Request $request)
    {
        $data = $request->getContent();
        $category = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\ProductCategory', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->persist($category);
        $em->flush();
        return new Response('category created succesfully');
    }

    /**
     * @Rest\Delete("/categories/{id}")
     */
    public function deleteCategory($id)
    {
    }

    /**
     * @Rest\Put("/categories")
     */
    public function updateCategory(Request $request)
    {
        $data = $request->getContent();
        $category = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\ProductCategory', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->merge($category);
        $em->flush();
        return new Response('category updated succesfully');
    }

    /**
     * @Rest\Get("/categories")
     */
    public function getCategories()
    {
        $em=$this->getDoctrine()->getManager();
        $categories=$em->getRepository(ProductCategory::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($categories,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * @Rest\Get("/categories/{id}")
     */
    public function getCategoryById($id)
    {
        $em=$this->getDoctrine()->getManager();
        $category=$em->getRepository(ProductCategory::class)->findOneBy(['id' => $id]);
        $data=$this->get('jms_serializer')->serialize($category,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }


}
