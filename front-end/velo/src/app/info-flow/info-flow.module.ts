import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { InfoFlowRoutingModule } from './info-flow-routing.module';
import { InfoFlowComponent } from './info-flow.component';
import { ChartsModule } from 'ng2-charts';
import { StoriesComponent } from './components/stories/stories.component';
import { DataFlowComponent } from './components/data-flow/data-flow.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
 
@NgModule({
  declarations: [InfoFlowComponent, StoriesComponent, DataFlowComponent],
  imports: [
    CommonModule,
    InfoFlowRoutingModule,
    ChartsModule,
    MatCardModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule 
   ],
  exports: [
    InfoFlowComponent,
    DataFlowComponent
  ],
  providers: [
    DatePipe
  ]
})
export class InfoFlowModule { }
