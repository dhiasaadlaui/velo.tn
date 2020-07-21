import { NewsComponent } from './news/news.component';
import { PickerComponent } from './picker/picker.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: 'picker', component: PickerComponent},
  { path: 'news', component: NewsComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
