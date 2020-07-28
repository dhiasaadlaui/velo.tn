import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeloEventsComponent } from './velo-events.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { InfoFlowComponent } from '../info-flow/info-flow.component';

const routes: Routes = [
  { path: '', component: VeloEventsComponent },
  { path: 'addEvent', component: AddEventComponent },
  { path: 'eventDetails/:id', component: EventDetailsComponent },
  { path: 'velo-events/info-flow', component: InfoFlowComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeloEventsRoutingModule { }
