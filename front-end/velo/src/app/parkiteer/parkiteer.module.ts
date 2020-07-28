import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParkiteerRoutingModule } from './parkiteer-routing.module';
import { ParkiteerComponent } from './parkiteer.component';
import { ShowOffersComponent} from './components/show-offers/show-offers.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { ShowDemandesComponent } from './components/show-demandes/show-demandes.component';
import { ContactComponent } from './components/contact/contact.component';
import { ShowContactsComponent } from './components/show-contacts/show-contacts.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [ParkiteerComponent, ShowOffersComponent, ReservationComponent, ShowDemandesComponent, ContactComponent, ShowContactsComponent],
  imports: [
    CommonModule,
    ParkiteerRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    ToastModule,
    ButtonModule,
    MatIconModule


  ],
  exports: [FormsModule,
  ReactiveFormsModule,ToastModule,ButtonModule]
})
export class ParkiteerModule { }
