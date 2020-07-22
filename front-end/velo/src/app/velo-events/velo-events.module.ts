import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeloEventsRoutingModule } from './velo-events-routing.module';
import { VeloEventsComponent } from './velo-events.component';


@NgModule({
  declarations: [VeloEventsComponent],
  imports: [
    CommonModule,
    VeloEventsRoutingModule,
  ]
})
export class VeloEventsModule { }
