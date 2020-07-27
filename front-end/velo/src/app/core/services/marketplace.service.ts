import { environment } from './../../../environments/environment';
import { Category, MarketService, Bid, Auction, Trade } from './../models/marketplace';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../models/marketplace';

const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(
    private _http: HttpClient
  ) { }


  createCategory(category: Category) {
    return this._http.post<any>(`${BASE_PATH}/categories`, category);
  }
  deleteCategory(id: number) {
    return this._http.delete<any>(`${BASE_PATH}/categories/` + id);
  }
  updateCategory(category: Category) {
    return this._http.put<any>(`${BASE_PATH}/categories`, category);
  }
  getCategories(): Observable<Category[]> {
    return this._http.get<any>(`${BASE_PATH}/categories`);
  }
  getCategoryById(id: number): Observable<Category> {
    return this._http.get<any>(`${BASE_PATH}/categories/` + id);
  }

  createProduct(product: Product) { }
  updateProduct(product: Product) { }
  deleteProduct(product: Product) { }
  getProducts(): Observable<Product[]> { return of(this.products); }
  getAvailableProducts(): Observable<Product[]> { return of(this.products); }
  getProductByIdentifier(id: number): Observable<Product> { return of(this.product); }
  getProductByOwner(id: number): Observable<Product> { return of(this.product); }

  createMarketService(marketService: MarketService) { }
  updateMarketService(marketService: MarketService) { }
  getMarketServices(): Observable<MarketService[]> { return of(); }
  getMarketServiceById(id: number): Observable<MarketService> { return of(); }
  deleteMarketService(marketService: MarketService) { }

  createBid(bid: Bid) { }
  updateBid(bid: Bid) { }
  getBids(): Observable<Bid> { return of(); }
  getBidsByOwner(id: number): Observable<Bid> { return of(); }
  deleteBid(bid: Bid) { }

  createAuction(auction: Auction) { }
  updateAuction(auction: Auction) { }
  getAuctions(): Observable<Auction[]> { return of([]); }
  getAuctionById(id: number): Observable<Auction> { return of(); }
  deleteAuction(auction: Auction) { }

  createTrade(trade: Trade) { }
  updateTrade(trade: Trade) { }
  getTrades(): Observable<Trade> { return of(); }
  getTradeById() { }
  deleteTrade() { }

  getMarketActivities(userId: number): Observable<number> { return of(232); }


  // tslint:disable-next-line: member-ordering
  product: Product = {
    id: 1,
    category: 2,
    owner: 2,
    creationDate: '10/2/2020',
    name: 'Product name',
    description: 'this is product description',
    images: ['https://www.usinenouvelle.com/mediatheque/5/6/7/000798765_image_896x598/klement.jpg',
      'https://www.usinenouvelle.com/mediatheque/5/6/7/000798765_image_896x598/klement.jpg',
      'https://www.usinenouvelle.com/mediatheque/5/6/7/000798765_image_896x598/klement.jpg'],
    price: 3450,
    startingBid: 2000,
    available: true,
  };

  // tslint:disable-next-line: member-ordering
  products: Product[] = [
    {
      id: 1,
      category: 2,
      owner: 2,
      creationDate: '10/2/2020',
      name: 'Product name',
      description: 'this is product description',
      images: ['https://www.usinenouvelle.com/mediatheque/5/6/7/000798765_image_896x598/klement.jpg',
        'https://www.usinenouvelle.com/mediatheque/5/6/7/000798765_image_896x598/klement.jpg',
        'https://www.usinenouvelle.com/mediatheque/5/6/7/000798765_image_896x598/klement.jpg'],
      price: 3450,
      startingBid: 2000,
      available: true,
    },
    {
      id: 1,
      category: 2,
      owner: 2,
      creationDate: '10/2/2020',
      name: 'Product name',
      description: 'this is product description',
      images: ['https://www.usinenouvelle.com/mediatheque/5/6/7/000798765_image_896x598/klement.jpg',
        'https://www.usinenouvelle.com/mediatheque/5/6/7/000798765_image_896x598/klement.jpg',
        'https://www.usinenouvelle.com/mediatheque/5/6/7/000798765_image_896x598/klement.jpg'],
      price: 3450,
      startingBid: 2000,
      available: true,
    }
  ];



}





