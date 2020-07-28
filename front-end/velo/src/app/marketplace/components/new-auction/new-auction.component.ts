import { Product } from './../../../core/models/marketplace';
import { MarketplaceService } from './../../../core/services/marketplace.service';
import { UserService } from './../../../core/services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.scss'],
  providers: [MessageService]
})
export class NewAuctionComponent implements OnInit {





  username: string;
  type: string = 'product';


  @Input() viewOnly: boolean = false;


  @Input() product?: Product;

  @Input() edit?: boolean = false;


  productNameControl = new FormControl('', [
    Validators.required
  ]);

  productDescriptionControl = new FormControl('', [
    Validators.required
  ]);

  initialBidControl = new FormControl('', [
    Validators.required
  ]);
  priceControl = new FormControl('', [
    Validators.required
  ]);




  constructor(
    private _userService: UserService,
    private _marketService: MarketplaceService,
    private _message: MessageService
  ) { }

  ngOnInit() {
    if (!this.product) {
      this.product = new Product();
    }
    this.username = this._userService.getCurrentUser().username;
  }



  saveAuction() {


    if (this.edit) {
      this.product.category = 1;
      this.product.owner = this._userService.getUserId();
      this.product.creation_date = '2020-07-01T00:00:00+02:00';
      this.product.images = 'url';
      this.product.available = true;
      this._marketService.updateProduct(this.product).subscribe(
        response => { this.showInfo("product updated with success!") },
        err => { this.showError(err) }
      );
    } else {
      this.product.category = 1;
      this.product.owner = this._userService.getUserId();
      this.product.creation_date = '2020-07-01T00:00:00+02:00';
      this.product.images = 'url';
      this.product.available = true;
  
      this._marketService.createProduct(this.product).subscribe(
        response => { this.showInfo("Product created with success") },
        err => { this.showError(err) }
      );
    }


  }

  showInfo(info) {
    this._message.add({ severity: 'info', summary: 'Info Message', detail: info });
  }
  showError(err) {
    this._message.add({ severity: 'error', summary: 'Error Message', detail: err });
  }


}
