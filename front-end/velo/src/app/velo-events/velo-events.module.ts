import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VeloEventsRoutingModule } from './velo-events-routing.module';
import { VeloEventsComponent } from './velo-events.component';
import { ScheduleModule, RecurrenceEditorModule, WeekService, DayService, MonthService, AgendaService, ResizeService, DragAndDropService, ExcelExportService  } from '@syncfusion/ej2-angular-schedule';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { DiagramModule } from '@syncfusion/ej2-angular-diagrams';
import { EventService } from '../core/services/EventService';
import { EventConfigService } from '../core/services/EventConfigService';
import { CategoryEventService } from '../core/services/CategoryEventService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventFormComponent } from './components/event-form/event-form.component';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BrowserModule } from '@angular/platform-browser';
import { ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { GridModule, FilterService, PageService, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule, ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { VeloEventAdminComponent } from './components/velo-event-admin/velo-event-admin.component';
import { StepService } from '../core/services/StepService';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
 import {
  CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
  ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService
} from '@syncfusion/ej2-angular-charts';
import { ToastModule } from '@syncfusion/ej2-angular-notifications';
import { InfoFlowModule } from '../info-flow/info-flow.module';
import { AuthenticationService } from '../core/services/authentication.service';
import { ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';


@NgModule({
  declarations: [VeloEventsComponent, AddEventComponent, EventDetailsComponent, EventFormComponent, VeloEventAdminComponent],
  imports: [
    CommonModule,
    VeloEventsRoutingModule,
    ScheduleModule,
    RecurrenceEditorModule,
    DiagramModule,
    FormsModule,
    ReactiveFormsModule,
    TextBoxModule,
    DatePickerModule,
    ProgressButtonModule,
    CommonModule,
    GridModule,
    NumericTextBoxAllModule,
    DropDownListAllModule,
    CheckBoxModule,
    ButtonModule, 
    DateTimePickerModule,
    ChartModule,
    ToastModule,
    InfoFlowModule,
    ComboBoxModule
  ],
  providers: [WeekService, DayService, MonthService, AgendaService, ResizeService, DragAndDropService,
    EventConfigService, EventService, CategoryEventService, FilterService, PageService, EditService,
    ToolbarService, PageService, CategoryService, StepService, CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
    ChartAnnotationService,AuthenticationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,ExcelExportService
  ],

})
export class VeloEventsModule { }
