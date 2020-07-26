import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { EventSettingsModel, View, PopupCloseEventArgs, ScheduleComponent, EventRenderedArgs, PopupOpenEventArgs, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { EventConfigService } from '../core/services/EventConfigService';
import { EventService } from '../core/services/EventService';
import { Observable } from 'rxjs';
import { EventEntity } from '../core/models/Event';
import { EventConfig } from '../core/models/EventConfig';
import { ActivatedRoute, Router } from '@angular/router';
import { EditSettingsModel, ToolbarItems, GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import { FormGroup, AbstractControl, FormControl, Validators } from '@angular/forms';
import { DialogEditEventArgs, SaveEventArgs } from '@syncfusion/ej2-angular-grids';
import { Browser } from '@syncfusion/ej2-base';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-velo-events',
  templateUrl: './velo-events.component.html',
  styleUrls: ['./velo-events.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VeloEventsComponent implements OnInit,OnDestroy {
  @ViewChild('scheduleObj', { static: false }) scheduleObj: ScheduleComponent;
  // DONT TOUCH !!
  @ViewChild('grid', { static: false })
  public grid: GridComponent;

  // ** PONTERS ** //
  selectedrecords: object[]
  operationTobeExecuted: string = '';
  eventToShowDetails:EventEntity;
  //

  // Subscriptions //
  eventSubscription$:any;

  /**
  * DATA.
  */
  events$: Observable<EventEntity[]>;
  events: EventEntity[];
  myEvents: EventEntity[];
  event: EventEntity;
  selectedEvent: EventEntity;

  eventConfigs$: Observable<any[]>;
  eventConfigs: EventConfig[];
  eventConfig: EventConfig;
  bool = 'readOnlyChange';

  // ****** TABLE VARIABLES // *****
  public newData: Object[];
  public editSettings: Object;
  public toolbar: ToolbarItems[] | object;
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
  // INIT DATE PICKERS
  public today: Date = new Date();
  public currentYear: number = this.today.getFullYear();
  public currentMonth: number = this.today.getMonth();
  public currentDay: number = this.today.getDate();
  public currentHour: number = this.today.getHours();
  public currentMinute: number = this.today.getMinutes();
  public currentSecond: number = this.today.getSeconds();
  public date: Date = new Date(new Date().setDate(14));
  public minDate: Date = new Date(this.currentYear,this.currentMonth,7,0,0,0);
  public maxDate: Date = new Date(this.currentYear,this.currentMonth,27,this.currentHour,this.currentMinute,this.currentSecond);
  /**
 * Flags.
 */
  showCalendar: boolean = true;
  showMoreEvents: boolean = false;
  ShowEventDetails:boolean =false;

  /**
 * Creates an instance of VeloEventsComponent.
 */
  constructor(private eventConfigService: EventConfigService, private eventServ: EventService,
    private route: ActivatedRoute, private router: Router, private userService: UserService
  ) {
    $(document).ready(function () {
      $(document).on("click", ".inactive-form", function () {
        $(".inactive-form,.active-form").toggleClass("inactive-form active-form");
      });
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
    this.events.forEach(element => {
      this.scheduleObj.addEvent({
        Id:  element.id,
        EventName: element.event_name + 'd',
        StartTime: new Date(element.start_date),
        EndTime: new Date(element.end_date),
        IsAllDay: false,
        IsReadonly: false,
        fddf: 'df',
        //RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1',
        CategoryColor: '#357cd2'
      })
    });
    /*this.event = this.events.find(element => element.id == 50);
    this.scheduleObj.addEvent({
      Id: this.event.id,
      EventName: this.event.event_name + 'd',
      StartTime: new Date(2020, 6, 27, 10, 0),
      EndTime: new Date(2020, 6, 27, 10, 0),
      IsAllDay: false,
      IsReadonly: false,
      fddf: 'df',
      RecurrenceRule: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR;INTERVAL=1',
      CategoryColor: '#357cd2'
    })*/
  }

  testRest(){
    this.scheduleObj.resetEventTemplates()
  }

  ngOnInit() {
     this.eventSubscription$ = this.eventServ.todos.subscribe(updatedTodos => {
      this.events = [];
      this.events = updatedTodos;
      this.myEvents = [];
      updatedTodos.forEach(e => {
        if(e.creator_user_id === this.userService.getCurrentUser().username){
          this.myEvents.push(e);
        }
      })
    });
    this.eventServ.loadAll();
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete',
      { text: 'Archive', tooltipText: 'Archive', prefixIcon: 'e-save', id: 'Archive' },
      { text: 'Refresh', tooltipText: 'Refresh', prefixIcon: 'e-reload	', id: 'Refresh' }];
    this.pageSettings = { pageCount: 5 };
    let i = 0;

    this.eventConfigService.todos.subscribe(data => data.forEach(element => {
      this.eventConfigs.push(element);
    }));


    //LOADING ALL ENTITIES (Event, EventConfig)
    /// this.eventConfig$ = this.eventServ.load(2);
    //let localDate = new Date(this.event$.startDate * 1000);

  }// -> ** ON INIT END
  ngOnDestroy(): void {
    this.eventSubscription$.unsubscribe(); 
  }




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
    this.scheduleObj.getSelectedElements().forEach((element) => {      
      console.log(element)
    });
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
    console.log(this.scheduleObj);
    
    this.scheduleObj.getEvents().forEach((element: any) => console.log(element.Id))
    let selectedEvent: any = this.scheduleObj.activeEventData.event;
    console.log(selectedEvent)
    console.log(<any>selectedEvent.EventName)
    console.log(<any>selectedEvent.Id)
    console.log(<any>selectedEvent.fddf)
    console.log(this.scheduleObj.getEventDetails(args.element))
    this.ShowEventDetails = true;
    this.eventToShowDetails = new EventEntity()
    this.eventToShowDetails.id = <any>selectedEvent.Id;
    // this.go()
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


  /**
 * Handle Table --> Start.
 */
  createFormGroup(data: IOrderModel): FormGroup {
    return new FormGroup({
      id: new FormControl(data.id),
      event_name: new FormControl(data.event_name, Validators.required),
      distance: new FormControl(data.distance, Validators.required),
      location: new FormControl(data.location, Validators.required),
      start_date: new FormControl(data.start_date, Validators.required),
      end_date: new FormControl(data.end_date, Validators.required),
      is_theme: new FormControl(data.is_theme),
      is_archived: new FormControl(data.is_archived),
      rate: new FormControl(data.rate),
      creator_user_id: new FormControl(data.creator_user_id),
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
    if (args.requestType === 'beginEdit') {
      this.operationTobeExecuted = 'update';
      console.log('i will update')
    } else if (args.requestType === 'add') {
      this.operationTobeExecuted = 'create';
      console.log('i will create')
    }
    if (args.requestType === 'save') {
      this.submitClicked = true;

      if (this.orderForm.valid) {
        let data: any;
        data = this.orderForm.value;
        let eventLocal: EventEntity = this.eventServ.buildEvent(data);
        if(new Date(eventLocal.start_date) > new Date(eventLocal.end_date)){
          alert("End Date Cant be greater then start Date please change inputs")
          return;
        }
        if (this.operationTobeExecuted != '') {
          console.log('OPERATION START ......')
          if (this.operationTobeExecuted === 'update') {
            console.log('UPDATE START ......')           
            this.eventServ.update(eventLocal);
            this.eventServ.loadAll()
          } else if (this.operationTobeExecuted === 'create') {
            if(eventLocal.is_archived == null){
              eventLocal.is_archived = false;
            }
            console.log('CREATE START ......')
            this.eventServ.create(eventLocal);
            alert('Event Created Successfuly')
            this.eventServ.loadAll()
          }
        }

      } else {
        args.cancel = true;
      }
    } else if (args.requestType === 'delete') {
      if (this.selectedEvent != null) {
        this.eventServ.remove(this.selectedEvent.id);
        alert('Event :' + " " + this.selectedEvent.event_name + " " + " was deleted successfully")
      } else {
        alert('Somthing went wrong  Cannot Delete Event' + this.selectedEvent.id)
      }
      this.selectedEvent = null;
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

  rowSelected(args: RowSelectEventArgs) {
    const selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
    console.log(this.grid.getRowInfo(args.target).rowData);
    this.selectedEvent = this.eventServ.buildEvent(this.grid.getRowInfo(args.target).rowData);
    console.log(this.selectedEvent.id)
  }

  handleToolBarClicks(args: ClickEventArgs): void {
    if (args.item.id === 'Archive') {
      if (this.selectedEvent == null) {
        alert("please select Event")
      } else {
        if(this.selectedEvent.is_archived == true){
          alert("Event already archived")
        }else {
          this.eventServ.archiver(this.selectedEvent);
          alert('Event archived successfully')
          this.eventServ.loadAll()
        }
      }
    }else if (args.item.id === 'Refresh') {
      this.eventServ.loadAll()
    }

  }

  get event_name(): AbstractControl { return this.orderForm.get('event_name'); }

  get distance(): AbstractControl { return this.orderForm.get('distance'); }

  get location(): AbstractControl { return this.orderForm.get('location'); }

  get start_date(): AbstractControl { return this.orderForm.get('start_date'); }

  get end_date(): AbstractControl { return this.orderForm.get('end_date'); }

  get is_theme(): AbstractControl { return this.orderForm.get('is_theme'); }

  get is_archived(): AbstractControl { return this.orderForm.get('is_archived'); }

  get rate(): AbstractControl { return this.orderForm.get('rate'); }

  get creator_user_id(): AbstractControl { return this.orderForm.get('creator_user_id'); }

  get subscribersCount(): AbstractControl { return this.orderForm.get('subscribersCount'); }

}
/**
* Handle Table --> END.
*/



export interface IOrderModel {
  id?: number;
  event_name?: string;
  distance?: number;
  location?: string;
  start_date?: number;
  end_date?: number;
  is_theme?: boolean;
  is_archived?: boolean;
  rate?: number;
  creator_user_id?: string;
  subscribers?: any[];
  subscribersCount?: number;
}
