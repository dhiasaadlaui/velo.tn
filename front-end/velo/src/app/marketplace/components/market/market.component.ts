import { MarketplaceService } from './../../../core/services/marketplace.service';
import { Product, Auction } from './../../../core/models/marketplace';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  products: Product[] = [];
  availableProducts: Product[] = [];
  auctions: Auction[] = [];


  constructor(
    private _marketplaceService: MarketplaceService
  ) { }

  ngOnInit() {
    this.initializeProducts();
    this.initializeAvailableProducts();
    this.initializeAuctions();
  }


  initializeProducts() {
    this._marketplaceService.getProducts()
      .subscribe(
        products => { this.products = products; },
        err => { }
      )
  }
  initializeAvailableProducts() {
    this._marketplaceService.getAvailableProducts()
      .subscribe(
        availableProducts => { this.availableProducts = availableProducts; },
        err => { }
      )
  }
  initializeAuctions() {
    this._marketplaceService.getAuctions()
      .subscribe(
        auctions => { this.auctions = auctions; },
        err => { }
      )
  }



}
