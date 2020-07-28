import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { MatStepperModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatSelectModule, MatCardModule, MatIconModule, MatPaginatorModule, MatMenuModule, MatBadgeModule, MatExpansionModule, MatTabsModule } from '@angular/material';
import { MarketComponent } from './components/market/market.component';
import { NewAuctionComponent } from './components/new-auction/new-auction.component';
import { ActiveAuctionsComponent } from './components/active-auctions/active-auctions.component';
import { BidsComponent } from './components/bids/bids.component';
import { TradeComponent } from './components/trade/trade.component';
import {ToastModule} from 'primeng/toast';
import {DialogModule} from 'primeng/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [MarketplaceComponent, MarketComponent, NewAuctionComponent, ActiveAuctionsComponent, BidsComponent, TradeComponent],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatBadgeModule,
    MatExpansionModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DialogModule,
    MatDividerModule,
    MatListModule
  ]
})
export class MarketplaceModule { }
