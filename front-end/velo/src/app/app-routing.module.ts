import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'velo-events', loadChildren: () => import('./velo-events/velo-events.module').then(m => m.VeloEventsModule) },
  { path: 'ride-rescue', loadChildren: () => import('./ride-rescue/ride-rescue.module').then(m => m.RideRescueModule) },
  { path: 'parkiteer', loadChildren: () => import('./parkiteer/parkiteer.module').then(m => m.ParkiteerModule) },
  { path: 'info-flow', loadChildren: () => import('./info-flow/info-flow.module').then(m => m.InfoFlowModule) },
  { path: 'marketplace', loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: '', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) }
];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
