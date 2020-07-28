import { LoginadminComponent } from './loginadmin/loginadmin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
 

const routes: Routes = [
  { path: 'velo-events', loadChildren: () => import('./velo-events/velo-events.module').then(m => m.VeloEventsModule) , canActivate: [AuthGuard] },
  { path: 'ride-rescue', loadChildren: () => import('./ride-rescue/ride-rescue.module').then(m => m.RideRescueModule) , canActivate: [AuthGuard] },
  { path: 'parkiteer', loadChildren: () => import('./parkiteer/parkiteer.module').then(m => m.ParkiteerModule) , canActivate: [AuthGuard] },
  { path: 'info-flow', loadChildren: () => import('./info-flow/info-flow.module').then(m => m.InfoFlowModule) , canActivate: [AuthGuard] },
  { path: 'landing-page', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) , canActivate: [AuthGuard] },
  
  { path: 'marketplace', loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule) , canActivate: [AuthGuard] },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) , canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule)  },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: LoginadminComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
