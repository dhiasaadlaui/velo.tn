import { AssignComponent } from './components/assign/assign.component';
import { AssginedtomeComponent } from './components/assginedtome/assginedtome.component';
import { DisponibilityComponent } from './components/disponibility/disponibility.component';
import { StatsComponent } from './components/stats/stats.component';
import { ClaimwatcherComponent } from './components/claimwatcher/claimwatcher.component';
import { ClaimComponent } from './components/claim/claim.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideRescueComponent } from './ride-rescue.component';

const routes: Routes = [{ path: '', component: RideRescueComponent },
                        {path: 'login', component: EnrollComponent},
                        {path: 'claim', component: ClaimComponent},
                        {path: 'claims', component: ClaimwatcherComponent},
                        {path: 'stats', component: StatsComponent},
                        {path: 'disp', component: DisponibilityComponent},
                        {path: 'assigned', component: AssginedtomeComponent},
                        {path: 'assign', component: AssignComponent},
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RideRescueRoutingModule { }
