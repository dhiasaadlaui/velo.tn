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
    // tslint:disable-next-line: variable-name
    private _http: HttpClient
  ) { }

  // categories
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
  // products
  createProduct(product: Product) {
    return this._http.post<any>(`${BASE_PATH}/products`, product);
  }
  updateProduct(product: Product) {
    return this._http.put<any>(`${BASE_PATH}/products`, product);
  }
  deleteProduct(id: number) {
    return this._http.delete<any>(`${BASE_PATH}/products/` + id);
  }
  getProducts(): Observable<Product[]> {
    return this._http.get<any>(`${BASE_PATH}/products`);
  }
  getAvailableProducts(): Observable<Product[]> {
    return this._http.get<any>(`${BASE_PATH}/products/available`);
  }
  getProductByIdentifier(id: number): Observable<Product> {
    return this._http.get<any>(`${BASE_PATH}/products/` + id);
  }
  getProductByOwner(id: number): Observable<Product> {
    return this._http.get<any>(`${BASE_PATH}/products/owner/` + id);
  }

  // marketService
  createMarketService(marketService: MarketService) {
    return this._http.post<any>(`${BASE_PATH}/market-services`, marketService);
  }
  updateMarketService(marketService: MarketService) {
    return this._http.put<any>(`${BASE_PATH}/market-services`, marketService);
  }
  getMarketServices(): Observable<MarketService[]> {
    return this._http.get<any>(`${BASE_PATH}/market-services`);
  }
  getMarketServiceById(id: number): Observable<MarketService> {
    return this._http.get<any>(`${BASE_PATH}/market-services/` + id);
  }
  deleteMarketService(id: number) {
    return this._http.delete<any>(`${BASE_PATH}/market-services/` + id);
  }
  // bids
  createBid(bid: Bid) {
    return this._http.post<any>(`${BASE_PATH}/bids`, bid);
  }
  updateBid(bid: Bid) {
    return this._http.put<any>(`${BASE_PATH}/bids`, bid);
  }
  getBids(): Observable<Bid> {
    return this._http.get<any>(`${BASE_PATH}/bids`);
  }
  getBidsByOwner(id: number): Observable<Bid> {
    return this._http.get<any>(`${BASE_PATH}/bids/owner/` + id);
  }
  getBidsById(id: number): Observable<Bid> {
    return this._http.get<any>(`${BASE_PATH}/bids/` + id);
  }
  deleteBid(id: number) {
    return this._http.delete<any>(`${BASE_PATH}/bids/` + id);
  }

  // Auctions
  createAuction(auction: Auction) {
    return this._http.post<any>(`${BASE_PATH}/auctions`, auction);
  }
  updateAuction(auction: Auction) {
    return this._http.put<any>(`${BASE_PATH}/auctions`, auction);
  }
  getAuctions(): Observable<Auction[]> {
    return this._http.get<any>(`${BASE_PATH}/auctions`);
  }
  getAuctionById(id: number): Observable<Auction> {
    return this._http.get<any>(`${BASE_PATH}/auctions/` + id);
  }
  deleteAuction(id: number) {
    return this._http.delete<any>(`${BASE_PATH}/auctions/` + id);
  }

  // Trades
  createTrade(trade: Trade) {
    return this._http.post<any>(`${BASE_PATH}/trades`, trade);
  }
  updateTrade(trade: Trade) {
    return this._http.put<any>(`${BASE_PATH}/trades`, trade);
  }
  getTrades(): Observable<Trade> {
    return this._http.get<any>(`${BASE_PATH}/trades`);
  }
  getTradeById(id: number) {
    return this._http.get<any>(`${BASE_PATH}/trades/` + id);
  }
  deleteTrade(id: number) {
    return this._http.delete<any>(`${BASE_PATH}/trades/` + id);
  }

  getMarketActivities(userId: number): Observable<number> { return of(232); }


}
