import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RideRescueRoutingModule } from './ride-rescue-routing.module';
import { RideRescueComponent } from './ride-rescue.component';
import {TableModule} from 'primeng/table';
import {TabMenuModule} from 'primeng/tabmenu';
import { EnrollComponent } from './components/enroll/enroll.component';
import { ClaimComponent } from './components/claim/claim.component';
import { ClaimwatcherComponent } from './components/claimwatcher/claimwatcher.component';
import { StatsComponent } from './components/stats/stats.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { GMapModule}  from 'primeng/gmap';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator'; 
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from "primeng/dropdown";
import { DisponibilityComponent } from './components/disponibility/disponibility.component';
import { AssignComponent } from './components/assign/assign.component';
import { AssginedtomeComponent } from './components/assginedtome/assginedtome.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { ListboxModule } from 'primeng/listbox';
import { ChartModule } from 'primeng/chart';
import { AdminComponent } from './components/admin/admin.component';


@NgModule({
  declarations: [RideRescueComponent, EnrollComponent, ClaimComponent, ClaimwatcherComponent, StatsComponent, DisponibilityComponent, AssignComponent, AssginedtomeComponent, AdminComponent],
  imports: [
    CommonModule,
    RideRescueRoutingModule,
    TableModule,
    TabMenuModule,
    FormsModule,
    ReactiveFormsModule,
    GMapModule,
    ButtonModule,
    DialogModule,
    CheckboxModule,
    CalendarModule,
    DataViewModule,
    PaginatorModule,
    PanelModule,
    DropdownModule,
    FullCalendarModule,
    ListboxModule,
    ChartModule,
  ]
})
export class RideRescueModule { }
