import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GridComponent, ToolbarItems, SaveEventArgs, DialogEditEventArgs, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import { StepEntity } from 'src/app/core/models/Step';
import { CategoryEventService } from 'src/app/core/services/CategoryEventService';
import { Observable } from 'rxjs';
import { CategoryEntity } from 'src/app/core/models/Category';
import { StepService } from 'src/app/core/services/StepService';
import { EventService } from 'src/app/core/services/EventService';
import { EventEntity } from 'src/app/core/models/Event';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-velo-event-admin',
  templateUrl: './velo-event-admin.component.html',
  styleUrls: ['./velo-event-admin.component.scss']
})
export class VeloEventAdminComponent implements OnInit, OnDestroy {
  @ViewChild('gridCategory', { static: false })
  public grid: GridComponent;
  @ViewChild('element',{ static: false }) element;
  public position = { X: 'Right' };
  // Subscriptions //
  categorySubscription$: any;
  eventSubscription$: any;
  /**
* DATA.
*/
  category$: Observable<CategoryEntity[]>;
  steps$: Observable<StepEntity[]>;


  categories: CategoryEntity[];
  category: CategoryEntity;
  steps: StepEntity[];
  step: StepEntity;
  selectedCategory: CategoryEntity;
  selectedStep: StepEntity;
  events: EventEntity[] = [];


  // ** PONTERS ** //
  selectedrecords: object[]
  operationTobeExecuted: string = '';
  categoryStructureToShowDetails: StepEntity;

  // ****** TABLE VARIABLES // *****
  public newData: Object[];
  public editSettings: Object;
  public toolbar: ToolbarItems[] | object;
  public orderForm: FormGroup;
  public pageSettings: Object;
  public shipCityDistinctData: Object[];
  public shipCountryDistinctData: Object[];
  public submitClicked: boolean = false;


  /****** CHARTS  */
  public primaryXAxis: Object;
  public chartData: Object[] = [];

  // TOAST 
  toastMsg:IToast = {msgBody: '', msgTitle:''}
  

  constructor(private categoryEventService: CategoryEventService, private stepService: StepService, 
    private eventService: EventService, private userService:UserService, private router:Router) { }

  ngOnInit() {   
    
    this.categorySubscription$ = this.categoryEventService.todos.subscribe(updatedTodos => {
      this.categories = [];
      this.categories = updatedTodos;

    });
    this.categoryEventService.loadAll();

    this.eventSubscription$ = this.eventService.todos.subscribe(updatedTodos => {
      this.events = [];
      this.events = updatedTodos;
    });
    console.log('calling event service');
    
    this.eventService.loadAll();
    // INIT TABLE HEADER
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
    this.toolbar = ['Add', 'Edit', 'Delete',
      { text: 'Archive', tooltipText: 'Archive', prefixIcon: 'e-save', id: 'Archive' },
      { text: 'Async', tooltipText: 'Async', prefixIcon: 'e-reload', id: 'Refresh' }];
    this.pageSettings = { pageCount: 5 };

    // INIT CHARTS 


    this.primaryXAxis = {
      valueType: 'Category'
    };
  }
  ngOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
  }



  /**
 * Handle Table --> Start.
 */
  createFormGroup(data: IFormStructure): FormGroup {
    console.log(data.step.id);
    let categoryLocal: CategoryEntity = this.categoryEventService.buildCategory(data);

    return new FormGroup({
      id: new FormControl(categoryLocal.id),
      category_name: new FormControl(categoryLocal.category_name),
      category_img: new FormControl(categoryLocal.category_img),
      //STEP
      step_id: new FormControl(data.step.id),
      title: new FormControl(categoryLocal.step.title),
      location_start: new FormControl(categoryLocal.step.location_start),
      location_end: new FormControl(categoryLocal.step.location_end),
      start_day: new FormControl(categoryLocal.step.start_day),
      end_day: new FormControl(categoryLocal.step.end_day),
      rep: new FormControl(categoryLocal.step.rep),
      end_repeat: new FormControl(categoryLocal.step.end_repeat),
      rule: new FormControl(categoryLocal.step.rule),
      gender: new FormControl(categoryLocal.step.gender),
      age: new FormControl(categoryLocal.step.age),
      difficulty: new FormControl(categoryLocal.step.difficulty),
      diagrame: new FormControl(categoryLocal.step.diagrame),
      theme: new FormControl(categoryLocal.step.theme),
      association_name: new FormControl(categoryLocal.step.association_name),
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
      console.log(this.orderForm.value);

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
        let categoryEntity: CategoryEntity = this.categoryEventService.buildCategory(data);
        console.log("DATA WIL BE UPDATED ......................");
        console.log(data);
        console.log("DATA WIL BE UPDATED .......................");


        if (this.operationTobeExecuted != '') {
          console.log('OPERATION START ......')
          if (this.operationTobeExecuted === 'update') {
            console.log('UPDATE START ......')
            this.categoryEventService.update(categoryEntity);
             this.toastMsg.msgTitle = " Updated Successfuly"
            this.toastMsg.msgBody = "Hey : " + " " + this.userService.getCurrentUser().username +" " + "the Category " + " " + categoryEntity.category_name +" " + "has been successfuly Updated"
            this.element.show();
            this.categoryEventService.loadAll();
          } else if (this.operationTobeExecuted === 'create') {            
            console.log('CREATE START ......')
            this.categoryEventService.create(categoryEntity);
            this.toastMsg.msgBody = "Hey : " + " " + this.userService.getCurrentUser().username +" " + "the Category " + " " + categoryEntity.category_name + " " + "has been successfuly Created"
            this.categoryEventService.loadAll();
          }
        }

      } else {
        args.cancel = true;
      }
    } else if (args.requestType === 'delete') {
      if (this.selectedCategory != null) {
        this.categoryEventService.remove(this.selectedCategory.id);
        alert('Event :' + " " + this.selectedCategory.category_name + " " + " was deleted successfully")
      } else {
        alert('Somthing went wrong  Cannot Delete Event' + this.selectedCategory.id)
      }
      this.selectedCategory = null;
    }
  }

  actionComplete(args: DialogEditEventArgs): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      if (Browser.isDevice) {
        args.dialog.height = window.innerHeight - 90 + 'px';
        (<Dialog>args.dialog).dataBind();
        this.categoryEventService.loadAll()
      }
      // Set initail Focus
      if (args.requestType === 'beginEdit') {
        (args.form.elements.namedItem('category_name') as HTMLInputElement).focus();
      } else if (args.requestType === 'add') {
        (args.form.elements.namedItem('category_img') as HTMLInputElement).focus();
      }
    }
  }

  rowSelected(args: RowSelectEventArgs) {
    const selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
    console.log(this.grid.getRowInfo(args.target).rowData);
    this.selectedCategory = this.categoryEventService.buildCategory(this.grid.getRowInfo(args.target).rowData);
    console.log('SELECTED selectedCategory' + this.selectedCategory.category_name)
  }

  handleToolBarClicks(args: ClickEventArgs): void {
    if (args.item.id === 'Refresh') {
      this.categoryEventService.loadAll()
    }

  }

  get category_name(): AbstractControl { return this.orderForm.get('category_name'); }

  get category_img(): AbstractControl { return this.orderForm.get('category_img'); }

  get title(): AbstractControl { return this.orderForm.get('title'); }

  get location_start(): AbstractControl { return this.orderForm.get('location_start'); }

  get location_end(): AbstractControl { return this.orderForm.get('location_end'); }

  get start_day(): AbstractControl { return this.orderForm.get('start_day'); }

  get end_day(): AbstractControl { return this.orderForm.get('end_day'); }

  get rep(): AbstractControl { return this.orderForm.get('rep'); }

  get end_repeat(): AbstractControl { return this.orderForm.get('end_repeat'); }

  get rule(): AbstractControl { return this.orderForm.get('rule'); }

  get gender(): AbstractControl { return this.orderForm.get('gender'); }

  get difficulty(): AbstractControl { return this.orderForm.get('difficulty'); }

  get theme(): AbstractControl { return this.orderForm.get('theme'); }

  get association_name(): AbstractControl { return this.orderForm.get('association_name'); }

  topUsedCategory() {


    let obj: Object[] = [];
    let i: number = 0;

    this.categories.forEach(categoy => {
      i = 0;
      this.events.forEach(event => {
        if (event.category.id == categoy.id) {
          console.log("Category Name" + categoy.category_name + "Category Id " +categoy.id + " " + "Event Id : " + " " + event.category.id + " Event Name" + event.event_name + " " + "Pointet : " + i)
          i = i + 1;
          obj.push(
            { month: categoy.category_name + i, sales: i  }
          )
          console.log("Pointer : " +i);
          
        }
      });
    });

    console.log(obj);
    
    this.chartData = obj;
    

  }





  topSubscribedCategoy() {


    let obj: Object[] = [];
    let i: number = 0;

    this.categories.forEach(categoy => {
      i = 1;
      this.events.forEach(event => {
        if (event.category.id == categoy.id && event.subscribers.length != 0 ) {
          console.log("Category Name" + categoy.category_name + "Category Id " +categoy.id + " " + "Event Id : " + " " + event.category.id + " Event Name" + event.event_name + " " + "Pointet : " + i)
         i = event.subscribers.length;
          obj.push(
            { month: categoy.category_name + i, sales: i }
          )
          console.log("Pointer : " +i);
          
        }
      });
    });

    console.log(obj);
    
    this.chartData = obj;
    
  }
  
  navigate(){
    console.log(this.router.getCurrentNavigation());
    
  this.router.navigate['/info-flow']
}
}
/**
* Handle Table --> END.
*/



export interface IFormStructure {
  id?: number;
  category_name?: string;
  category_img?: string;
  // STEP
  step?: StepEntity
}

export interface IToast {
  msgTitle?: string;
  msgBody?: string;
}
