import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeloEventsComponent } from './velo-events.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';

const routes: Routes = [
  { path: '', component: VeloEventsComponent },
  { path: 'addEvent', component: AddEventComponent },
  { path: 'eventDetails', component: EventDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeloEventsRoutingModule { }
