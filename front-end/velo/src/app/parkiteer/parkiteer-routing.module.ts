import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkiteerComponent } from './parkiteer.component';
import { ShowOffersComponent} from './components/show-offers/show-offers.component';
import { ReservationComponent} from './components/reservation/reservation.component';
import { ShowDemandesComponent } from './components/show-demandes/show-demandes.component';
import { ContactComponent} from './components/contact/contact.component';
import { ShowContactsComponent} from "./components/show-contacts/show-contacts.component";

const routes: Routes = [{ path: '', component: ParkiteerComponent },
  { path: 'show', component: ShowOffersComponent },
  { path: 'reserver', component: ReservationComponent },
  { path: 'showDemandes', component: ShowDemandesComponent },
  { path: 'AddContact', component: ContactComponent },
  { path: 'showContact', component: ShowContactsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParkiteerRoutingModule { }
