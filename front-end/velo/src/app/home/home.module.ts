import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PickerComponent } from './picker/picker.component';
import { NewsComponent } from './news/news.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';


@NgModule({
  declarations: [HomeComponent, PickerComponent, NewsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
