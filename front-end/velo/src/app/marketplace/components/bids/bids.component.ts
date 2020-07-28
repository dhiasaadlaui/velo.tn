import { MarketplaceService } from './../../../core/services/marketplace.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { MessageService } from 'primeng/api';
import { Bid } from 'src/app/core/models/marketplace';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss'],
  providers: [MessageService]
})
export class BidsComponent implements OnInit {

  constructor(
    private _userService: UserService,
    private _marketplaceService: MarketplaceService,
    private _message: MessageService
  ) { }

  myBids: Bid[] = [];
  allBids: Bid[] = [];
  displaybid: boolean = false;
  selectedBid: Bid;

    showBidDialog(item){
      this.selectedBid=item;
      this.displaybid=true;
      
    }

  bidOnProduct() {
    this._marketplaceService.updateBid(this.selectedBid).subscribe(
      response => {
        this.showInfo(response.msg);
        this.displaybid = false;
      },
      err => { this.showError(err); this.displaybid = false; }
    )

  }

  deleteBid(bid) {
    this._marketplaceService.deleteBid(bid.id).subscribe(
      response => {
        this.showInfo(response.msg);
        this.displaybid = false;
        this.initializeMyBids();
      },
      err => { this.showError(err); this.displaybid = false; }
    )

  }



  ngOnInit() {
    this.initializeBids();
    this.initializeMyBids();
  }

  initializeBids() {
    this._marketplaceService.getBids()
      .subscribe(
        bids => { this.allBids = bids; },
        err => { this.showError(err) }
      )

  }



  initializeMyBids() {
    this._marketplaceService.getBidsByOwner(this._userService.getUserId())
      .subscribe(
        bids => { this.myBids = bids; },
        err => { this.showError(err) }
      )
  }

  showInfo(info) {
    this._message.add({ severity: 'info', summary: 'Info Message', detail: info });
  }
  showError(err) {
    this._message.add({ severity: 'error', summary: 'Error Message', detail: err });
  }

}
