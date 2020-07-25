import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoFlowComponent } from './info-flow.component';
import { DataFlowComponent } from './components/data-flow/data-flow.component';
import { StoriesComponent } from './components/stories/stories.component';

const routes: Routes = [{ path: '', component: InfoFlowComponent },
  { path: 'data-flow',  component: DataFlowComponent },
  { path: 'stories',  component: StoriesComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoFlowRoutingModule { }
