import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeloEventsComponent } from './velo-events.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { InfoFlowComponent } from '../info-flow/info-flow.component';
import { AuthGuard } from '../_guards/auth.guard';
import { RideRescueComponent } from '../ride-rescue/ride-rescue.component';
import { ParkiteerComponent } from '../parkiteer/parkiteer.component';
import { MarketplaceComponent } from '../marketplace/marketplace.component';

const routes: Routes = [
  { path: '', component: VeloEventsComponent, canActivate: [AuthGuard] },
  { path: 'addEvent', component: AddEventComponent, canActivate: [AuthGuard] },
  { path: 'eventDetails/:id', component: EventDetailsComponent, canActivate: [AuthGuard] },
  { path: 'velo-events/ride-rescue', component: RideRescueComponent, canActivate: [AuthGuard] },
  { path: 'velo-events/parkiteer', component: ParkiteerComponent, canActivate: [AuthGuard] },
  { path: 'velo-events/info-flow', component: InfoFlowComponent, canActivate: [AuthGuard] },
  { path: 'velo-events/marketplace', component: MarketplaceComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeloEventsRoutingModule { }
