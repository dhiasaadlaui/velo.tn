import { UserService } from 'src/app/core/services/user.service';
import { MarketplaceService } from './../../../core/services/marketplace.service';
import { Product, Auction, MarketService, Bid } from './../../../core/models/marketplace';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
  providers: [MessageService]
})
export class MarketComponent implements OnInit {

  products: Product[] = [];
  displayedProducts: Product[] = [];
  availableProducts: Product[] = [];
  services: MarketService[] = [];
  auctions: Auction[] = [];
  displayEditDialog: boolean = false;
  displayViewDialog: boolean = false;
  selectedProduct: Product;
  bid: number;
  displaybid: boolean = false;


  nameFilter: string;
  minPriceFilter: number = 0;
  maxpriceFilter: number = 9999999;

  constructor(
    private _marketplaceService: MarketplaceService,
    private _message: MessageService,
    private _userService: UserService
  ) { }
  runFilter() {

    this.displayedProducts = this.availableProducts.filter(element =>
      (element.name.toLowerCase()
      .includes(this.nameFilter.toLowerCase())) 
      && (element.price >= this.minPriceFilter) 
      && (element.price < this.maxpriceFilter)
    )
  }
  removeProduct(item) {
    this._marketplaceService.deleteProduct(item.id)
      .subscribe(
        response => {
          this.initializeAvailableProducts();
          this.showInfo('product successfuly deleted')
        },
        err => { this.showError(err) }
      )
  }
  ngOnInit() {
    this.initializeProducts();
    this.initializeAvailableProducts();
    this.initializeAuctions();
    this.initializeServices();
  }
  initializeServices() {
    this._marketplaceService.getMarketServices()
      .subscribe(
        services => { this.services = services; },
        err => { }
      )
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
        availableProducts => { this.availableProducts = availableProducts; this.displayedProducts = availableProducts; },
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

  selectProduct(item, mode) {
    this.selectedProduct = item;
    this.showDialog();
  }
  showDialog() {
    this.displayViewDialog = true;
  }


  bidOnProduct() {
    let bid = new Bid();
    bid.target_identifier = this.selectedProduct.id;
    bid.target_type = 'product'
    bid.bid = this.bid;
    bid.status = 'pending';
    bid.owner = this._userService.getUserId();
    this._marketplaceService.createBid(bid).subscribe(
      response => {
        this.showInfo(response.msg);
        this.displaybid = false;
      },
      err => { this.showError(err); this.displaybid = false; }
    )
  }

  showInfo(info) {
    this._message.add({ severity: 'info', summary: 'Info Message', detail: info });
  }
  showError(err) {
    this._message.add({ severity: 'error', summary: 'Error Message', detail: err });
  }

  showBidDialog(item) {
    this.selectedProduct = item;
    this.displaybid = true;
  }

}
