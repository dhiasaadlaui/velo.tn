import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EventSettingsModel, View, PopupCloseEventArgs, ScheduleComponent, EventRenderedArgs, PopupOpenEventArgs, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { EventConfigService } from '../core/services/EventConfigService';
import { EventService } from '../core/services/EventService';
import { Observable } from 'rxjs';
import { EventEntity } from '../core/models/Event';
import { EventConfig } from '../core/models/EventConfig';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterSettingsModel } from '@syncfusion/ej2-angular-grids';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { DataUtil } from '@syncfusion/ej2-data';
import {  DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { Browser } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-velo-events',
  templateUrl: './velo-events.component.html',
  styleUrls: ['./velo-events.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VeloEventsComponent implements OnInit {
  @ViewChild('scheduleObj', { static: false }) scheduleObj: ScheduleComponent;
  /**
  * DATA.
  */
  events$: Observable<EventEntity[]>;
  events: EventEntity[];
  event: EventEntity;

  eventConfigs$: Observable<any[]>;
  eventConfigs: EventConfig[];
  eventConfig: EventConfig;
  bool = 'readOnlyChange';
  // ******
  public newData: Object[];
  public editSettings: Object;
  public toolbar: string[];
  public orderForm: FormGroup;
  public pageSettings: Object;
  public shipCityDistinctData: Object[];
  public shipCountryDistinctData: Object[];
  public submitClicked: boolean = false;

  /**
   * CALENDAR INIT.
   */
  public setView: View = 'Month';
  public eventSettings: EventSettingsModel;
  public data: object[] = [];
  //**** */

  /**
 * Flags.
 */
  showCalendar: boolean = true;
  showMoreEvents: boolean = false;

  /**
 * Creates an instance of VeloEventsComponent.
 */
  constructor(private eventConfigService: EventConfigService, private eventServ: EventService, private route: ActivatedRoute,
    private router: Router) {
    $(document).ready(function () {
      $(document).on("click", ".inactive-form", function () {
        $(".inactive-form,.active-form").toggleClass("inactive-form active-form");
      });
    });
    this.eventServ.loadAll();
    this.events$ = this.eventServ.todos;
    this.eventServ.todos.subscribe(updatedTodos => {
      this.events = updatedTodos;
    });
    this.setView = 'Month';
    this.eventSettings = {
      dataSource: this.data,
      fields: {
        id: 'Id',
        subject: {
          name: 'EventName',
          validation: {
            required: true,
            regex: ['^[a-zA-Z0-9- ]*$', 'Special character(s) not allowed in this field']
          }

        },
        description: {
          name: 'description',
          validation: {
            required: true,
            regex: ['^[a-zA-Z0-9- ]*$', 'Special character(s) not allowed in this field']
          }
        },
        location: {
          name: 'description',
          validation: {
            required: true,
            regex: ['^[a-zA-Z0-9- ]*$', 'Special character(s) not allowed in this field']
          }
        },
        isAllDay: { name: 'IsAllDay' },
        startTime: { name: 'StartTime' },
        endTime: { name: 'EndTime' },
      }
    };

  }

  /**
   * Search for events that match Criteria and added to the calendar the result .
   */
  find() {
    this.event = this.events.find(element => element.id == 3);
    console.log('find' + this.event.event_name)
    this.scheduleObj.addEvent({
      Id: 3,
      EventName: this.event.event_name + 'd',
      StartTime: new Date(2020, 6, 25, 10, 0),
      EndTime: new Date(2020, 6, 25, 10, 0),
      IsAllDay: false,
      IsReadonly: false,
      fddf: 'df',
      RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1',
      CategoryColor: '#357cd2'
    })
  }

  ngOnInit() {


    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    this.pageSettings = { pageCount: 5 };
    let i = 0;

    this.eventConfigService.todos.subscribe(data => data.forEach(element => {
      this.eventConfigs.push(element);
    }));


    //LOADING ALL ENTITIES (Event, EventConfig)
    /// this.eventConfig$ = this.eventServ.load(2);
    //let localDate = new Date(this.event$.startDate * 1000);

  }// -> ** ON INIT END




  /**
 * Handle PopUp CloseEvent "Calendar".
 */
  onPopupClose(args: PopupCloseEventArgs) {
    console.log('alive')
    if (args.type === 'Editor') {
      if (["Add", "Save", "EditSeries", "EditOccurrence"].indexOf(this.scheduleObj.currentAction) > -1) {
        // Handle the code if "save" button is clicked.
        alert("saved");
      } else if (this.scheduleObj.currentAction === null) {
        // Handle the code if "cancel" button is clicked.
        alert("cancel");
      }
    } else if (["Delete"].indexOf(this.scheduleObj.currentAction) > -1) {
      // Handle the code if "cancel" button is clicked.
      this.scheduleObj.getSelectedElements().forEach((element) => {
        console.log(element)

      });
      let selectedEvent: any = this.scheduleObj.activeEventData.event;
      this.eventServ.remove(selectedEvent.Id)
    }
  }

  oneventRendered(args: EventRenderedArgs): void {
    console.log(' color alive')

    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.scheduleObj.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.borderLeftColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
    }
  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
    this.scheduleObj.getEvents().forEach((element: any) => console.log(element.Id))
    let selectedEvent: any = this.scheduleObj.activeEventData.event;
    console.log(selectedEvent)
    console.log(<any>selectedEvent.EventName)
    console.log(<any>selectedEvent.Id)
    console.log(<any>selectedEvent.fddf)
    console.log(this.scheduleObj.getEventDetails(args.element))
    this.go();
  }

  public onEventCheck(args: any): boolean {
    let eventObj: any = args.data instanceof Array ? args.data[0] : args.data;
    return (eventObj.StartTime < new Date());
  }


  public onActionBegin(args: ActionEventArgs): void {
    if ((args.requestType === 'eventCreate') || args.requestType === 'eventChange') {
      args.cancel = this.onEventCheck(args);
    }
    if ((args.requestType === 'eventDelete')) {
    }
  }

  toggleCalendarView() {
    this.showCalendar = !this.showCalendar;
    this.showMoreEvents = this.showMoreEvents ? false : false;
    console.log(this.showCalendar)
  }

  go() {
    this.router.navigate([`../eventDetails`], { relativeTo: this.route });
  }



  createFormGroup(data: IOrderModel): FormGroup {
    return new FormGroup({
      event_name: new FormControl(data.event_name, Validators.required),
      distance: new FormControl(data.distance, Validators.required),
      location: new FormControl(data.location, Validators.required),
      start_date: new FormControl(data.start_date),
      end_date: new FormControl(data.end_date),
      is_theme: new FormControl(data.is_theme),
     });
  }

  dateValidator() {
    return (control: FormControl): null | Object => {
      return control.value && control.value.getFullYear &&
        (1900 <= control.value.getFullYear() && control.value.getFullYear() <= 2099) ? null : { OrderDate: { value: control.value } };
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      this.submitClicked = false;
      this.orderForm = this.createFormGroup(args.rowData);
    }
    if (args.requestType === 'save') {
      this.submitClicked = true;
      if (this.orderForm.valid) {
        args.data = this.orderForm.value;
        console.log(args.data)
      } else {
        args.cancel = true;
      }
    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      if (Browser.isDevice) {
        args.dialog.height = window.innerHeight - 90 + 'px';
        (<Dialog>args.dialog).dataBind();
      }
      // Set initail Focus
      if (args.requestType === 'beginEdit') {
        (args.form.elements.namedItem('event_name') as HTMLInputElement).focus();
      } else if (args.requestType === 'add') {
        (args.form.elements.namedItem('distance') as HTMLInputElement).focus();
      }
    }
  }

  get event_name(): AbstractControl { return this.orderForm.get('event_name'); }

  get distance(): AbstractControl { return this.orderForm.get('distance'); }

  get location(): AbstractControl { return this.orderForm.get('location'); }

  get start_date(): AbstractControl { return this.orderForm.get('start_date'); }

  get end_date(): AbstractControl { return this.orderForm.get('end_date'); }

  get is_theme(): AbstractControl { return this.orderForm.get('is_theme'); }

}




export interface IOrderModel {
  event_name?: string;
  distance?: number;
  location?: string;
  start_date?: number;
  end_date?: number;
  is_theme?: boolean;
}
