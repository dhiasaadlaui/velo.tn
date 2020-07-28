<?php

namespace VeloBundle\Controller;

use mysql_xdevapi\Exception;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use VeloBundle\Entity\Auction;
use VeloBundle\Entity\Bid;
use VeloBundle\Entity\MarketService;
use VeloBundle\Entity\Product;
use VeloBundle\Entity\ProductCategory;
use VeloBundle\Entity\Trade;

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
        return new JsonResponse(["msg"=>"category created with success"],200);
    }

    /**
     * @Rest\Delete("/categories/{id}")
     */
    public function deleteCategory($id)
    {
        $em=$this->getDoctrine()->getManager();
        $category=$em->getRepository(ProductCategory::class)->findOneBy(['id'=>$id]);
        $em->remove($category);
        $em->flush();
        return new JsonResponse(["msg"=>"category deleted with success"],200);
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
        return new JsonResponse(["msg"=>"category updated with success"],200);
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


    //product
    /**
     * @Rest\Post("/products")
     */
    public function createProduct(Request $request){
        $data = $request->getContent();
        $product = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Product', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->persist($product);
        $em->flush();
        return new JsonResponse(["msg"=>"product created with success"],200);
    }
    /**
     * @Rest\Put("/products")
     */
    public function updateProduct(Request $request){
        $data = $request->getContent();
        $product = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Product', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->persist($product);
        $em->flush();
        return new JsonResponse(["msg"=>"product updated with success"],200);
    }
    /**
     * @Rest\Delete("/products/{id}")
     */
    public function deleteProduct($id){
        $em=$this->getDoctrine()->getManager();
        $product=$em->getRepository(Product::class)->findOneBy(['id'=>$id]);
        $em->remove($product);
        $em->flush();
        return new JsonResponse(["msg"=>"product deleted with success"],200);
    }
    /**
     * @Rest\Get("/products")
     */
    public function getProducts(){
        $em=$this->getDoctrine()->getManager();
        $products=$em->getRepository(Product::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($products,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/products/available")
     */
    public function getAvailableProducts(){
        $em=$this->getDoctrine()->getManager();
        $product=$em->getRepository(Product::class)->findBy(['available' => true]);
        $data=$this->get('jms_serializer')->serialize($product,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/products/{id}")
     */
    public function getProductByIdentifier($id){
        $em=$this->getDoctrine()->getManager();
        $product=$em->getRepository(Product::class)->findOneBy(['id' => $id]);
        $data=$this->get('jms_serializer')->serialize($product,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/products/owner/{id}")
     */
    public function getProductByOwner($id){
        $em=$this->getDoctrine()->getManager();
        $product=$em->getRepository(Product::class)->findOneBy(['owner' => $id]);
        $data=$this->get('jms_serializer')->serialize($product,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    // marketService
    /**
     * @Rest\Post("/market-services")
     */
    public function createMarketService(Request $request){
        $data = $request->getContent();
        $service = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\MarketService', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->persist($service);
        $em->flush();
        return new JsonResponse(["msg"=>"Service created with success"],200);
    }
    /**
     * @Rest\Put("/market-services")
     */
    public function updateMarketService(Request $request){
        $data = $request->getContent();
        $service = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\MarketService', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->merge($service);
        $em->flush();
        return new JsonResponse(["msg"=>"Service created with success"],200);
    }
    /**
     * @Rest\Get("/market-services")
     */
    public function getMarketServices(){
        $em=$this->getDoctrine()->getManager();
        $service=$em->getRepository(MarketService::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($service,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/market-services/{id}")
     */
    public function getMarketServiceById($id){
        $em=$this->getDoctrine()->getManager();
        $service=$em->getRepository(MarketService::class)->findOneBy(['id' => $id]);
        $data=$this->get('jms_serializer')->serialize($service,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Delete("/market-services/{id}")
     */
    public function deleteMarketService($id){
        $em=$this->getDoctrine()->getManager();
        $service=$em->getRepository(MarketService::class)->findOneBy(['id'=>$id]);
        $em->remove($service);
        $em->flush();
        return new JsonResponse(["msg"=>"service deleted with success"],200);
    }

    // bids
    /**
     * @Rest\Post("/bids")
     */
    public function createBid(Request $request){
        $data = $request->getContent();
        $bid = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Bid', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->persist($bid);
        $em->flush();
        return new JsonResponse(["msg"=>"Bid created with success"],200);
    }
    /**
     * @Rest\Put("/bids")
     */
    public function updateBid(Request $request){
        $data = $request->getContent();
        $bid = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Bid', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->merge($bid);
        $em->flush();
        return new JsonResponse(["msg"=>"Bid created with success"],200);
    }
    /**
     * @Rest\Get("/bids")
     */
    public function getBids(){
        $em=$this->getDoctrine()->getManager();
        $bids=$em->getRepository(Bid::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($bids,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/bids/owner/{id}")
     */
    public function getBidsByOwner($id){
        $em=$this->getDoctrine()->getManager();
        $bid=$em->getRepository(Bid::class)->findBy(['owner' => $id]);
        $data=$this->get('jms_serializer')->serialize($bid,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/bids/{id}")
     */
    public function getBidsById($id){
        $em=$this->getDoctrine()->getManager();
        $bid=$em->getRepository(Bid::class)->findOneBy(['id' => $id]);
        $data=$this->get('jms_serializer')->serialize($bid,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Delete("/bids/{id}")
     */
    public function deleteBid($id){
        $em=$this->getDoctrine()->getManager();
        $bid=$em->getRepository(Bid::class)->findOneBy(['id'=>$id]);
        $em->remove($bid);
        $em->flush();
        return new JsonResponse(["msg"=>"bid deleted with success"],200);
    }

    // Auctions
    /**
     * @Rest\Post("/auctions")
     */
    public function createAuction(Request $request){
        $data = $request->getContent();
        $auction = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Auction', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->persist($auction);
        $em->flush();
        return new JsonResponse(["msg"=>"Auction created with success"],200);
    }
    /**
     * @Rest\Put("/auctions")
     */
    public function updateAuction(Request $request){
        $data = $request->getContent();
        $auction = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Auction', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->merge($auction);
        $em->flush();
        return new JsonResponse(["msg"=>"Auction created with success"],200);
    }
    /**
     * @Rest\Get("/auctions")
     */
    public function getAuctions(){
        $em=$this->getDoctrine()->getManager();
        $auctions=$em->getRepository(Auction::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($auctions,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/auctions/{id}")
     */
    public function getAuctionById($id){
        $em=$this->getDoctrine()->getManager();
        $auction=$em->getRepository(Auction::class)->findOneBy(['id' => $id]);
        $data=$this->get('jms_serializer')->serialize($auction,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Delete("/auctions/{id}")
     */
    public function deleteAuction($id){
        $em=$this->getDoctrine()->getManager();
        $auction=$em->getRepository(Auction::class)->findOneBy(['id'=>$id]);
        $em->remove($auction);
        $em->flush();
        return new JsonResponse(["msg"=>"Auction deleted with success"],200);
    }


    // Trades
    /**
     * @Rest\Post("/trades")
     */
    public function createTrade(Request $request){
        $data = $request->getContent();
        $trade = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Trade', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->persist($trade);
        $em->flush();
        return new JsonResponse(["msg"=>"Auction created with success"],200);
    }
    /**
     * @Rest\Put("/trades")
     */
    public function updateTrade(Request $request){
        $data = $request->getContent();
        $trade = $this->get('jms_serializer')->deserialize($data, 'VeloBundle\Entity\Trade', 'json');
        $em = $this->getDoctrine()->getManager();
        $em->merge($trade);
        $em->flush();
        return new JsonResponse(["msg"=>"Trade updated with success"],200);
    }
    /**
     * @Rest\Get("/trades")
     */
    public function getTrades(){
        $em=$this->getDoctrine()->getManager();
        $trade=$em->getRepository(Trade::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($trade,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Get("/trades/{id}")
     */
    public function getTradeById($id){
        $em=$this->getDoctrine()->getManager();
        $trade=$em->getRepository(Trade::class)->findOneBy(['id' => $id]);
        $data=$this->get('jms_serializer')->serialize($trade,'json');
        $response=new Response($data);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    /**
     * @Rest\Delete("/trades/{id}")
     */
    public function deleteTrade($id){
        $em=$this->getDoctrine()->getManager();
        $trade=$em->getRepository(Trade::class)->findOneBy(['id'=>$id]);
        $em->remove($trade);
        $em->flush();
        return new JsonResponse(["msg"=>"Trade deleted with success"],200);
    }


}
