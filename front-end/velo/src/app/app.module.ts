import { RideRescueModule } from './ride-rescue/ride-rescue.module';
import { InfoFlowModule } from './info-flow/info-flow.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { VeloEventsModule } from './velo-events/velo-events.module';
import { ParkiteerModule } from './parkiteer/parkiteer.module';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './core/components/top-nav-bar/top-nav-bar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    FooterComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ParkiteerModule,
    VeloEventsModule,
    MarketplaceModule,
    InfoFlowModule,
    RideRescueModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
