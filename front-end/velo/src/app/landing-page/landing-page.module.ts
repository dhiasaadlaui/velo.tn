import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { InfoFlowModule } from '../info-flow/info-flow.module';
import { MarketplaceModule } from '../marketplace/marketplace.module';
import { RideRescueModule } from '../ride-rescue/ride-rescue.module';
import { ParkiteerModule } from '../parkiteer/parkiteer.module';
import { VeloEventsModule } from '../velo-events/velo-events.module';


@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    InfoFlowModule,
    MarketplaceModule,
    RideRescueModule,
    ParkiteerModule,
    VeloEventsModule

  ]
})
export class LandingPageModule { }
