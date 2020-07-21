import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MarketComponent } from './components/market/market.component';
import { NewAuctionComponent } from './components/new-auction/new-auction.component';
import { ActiveAuctionsComponent } from './components/active-auctions/active-auctions.component';
import { BidsComponent } from './components/bids/bids.component';

@NgModule({
  declarations: [MarketplaceComponent, MarketComponent, NewAuctionComponent, ActiveAuctionsComponent, BidsComponent],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    MatInputModule,
    MatTabsModule
  ]
})
export class MarketplaceModule { }
