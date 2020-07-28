import { AdminComponent } from './components/admin/admin.component';
import { AssignComponent } from './components/assign/assign.component';
import { AssginedtomeComponent } from './components/assginedtome/assginedtome.component';
import { DisponibilityComponent } from './components/disponibility/disponibility.component';
import { StatsComponent } from './components/stats/stats.component';
import { ClaimwatcherComponent } from './components/claimwatcher/claimwatcher.component';
import { ClaimComponent } from './components/claim/claim.component';
import { EnrollComponent } from './components/enroll/enroll.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideRescueComponent } from './ride-rescue.component';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [{ path: '', component: RideRescueComponent },
                        {path: 'login-enrol', component: EnrollComponent, canActivate: [AuthGuard]},
                        {path: 'claim', component: ClaimComponent, canActivate: [AuthGuard]},
                        {path: 'claims', component: ClaimwatcherComponent, canActivate: [AuthGuard]},
                        {path: 'stats', component: StatsComponent, canActivate: [AuthGuard]},
                        {path: 'disp', component: DisponibilityComponent, canActivate: [AuthGuard]},
                        {path: 'assigned', component: AssginedtomeComponent, canActivate: [AuthGuard]},
                        {path: 'assign', component: AssignComponent, canActivate: [AuthGuard]},
                        {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]}
                        ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RideRescueRoutingModule { }
