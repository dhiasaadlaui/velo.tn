import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoFlowRoutingModule } from './info-flow-routing.module';
import { InfoFlowComponent } from './info-flow.component';
import { ChartsModule } from 'ng2-charts';
import { StoriesComponent } from './components/stories/stories.component';
import { DataFlowComponent } from './components/data-flow/data-flow.component';


@NgModule({
  declarations: [InfoFlowComponent, StoriesComponent, DataFlowComponent],
  imports: [
    CommonModule,
    InfoFlowRoutingModule,
    ChartsModule
  ]
})
export class InfoFlowModule { }
