import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { VeloEventsComponent } from '../velo-events/velo-events.component';
import { AddEventComponent } from '../velo-events/components/add-event/add-event.component';
import { EventDetailsComponent } from '../velo-events/components/event-details/event-details.component';
import { RideRescueComponent } from '../ride-rescue/ride-rescue.component';
import { ParkiteerComponent } from '../parkiteer/parkiteer.component';
import { MarketplaceComponent } from '../marketplace/marketplace.component';
import { InfoFlowComponent } from '../info-flow/info-flow.component';
import { AuthGuard } from '../_guards/auth.guard';


const routes: Routes = [
  { path: '', component: VeloEventsComponent, canActivate: [AuthGuard] },
  { path: 'velo-events', component: VeloEventsComponent, canActivate: [AuthGuard] },
  { path: 'ride-rescue', component: RideRescueComponent, canActivate: [AuthGuard] },
  { path: 'parkiteer', component: ParkiteerComponent, canActivate: [AuthGuard] },
  { path: 'info-flow', component: InfoFlowComponent, canActivate: [AuthGuard] },
  { path: 'marketplace', component: MarketplaceComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
