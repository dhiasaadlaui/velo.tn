import { RideRescueModule } from './ride-rescue/ride-rescue.module';
import { InfoFlowModule } from './info-flow/info-flow.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { VeloEventsModule } from './velo-events/velo-events.module';
import { ParkiteerModule } from './parkiteer/parkiteer.module';
import { LandingPageModule } from './landing-page/landing-page.module';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopNavBarComponent } from './core/components/top-nav-bar/top-nav-bar.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    FooterComponent,
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
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    LandingPageModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
