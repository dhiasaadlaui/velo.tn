import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GridComponent, ToolbarItems, SaveEventArgs, DialogEditEventArgs, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Browser } from '@syncfusion/ej2-base';
import { Dialog } from '@syncfusion/ej2-angular-popups';
import { StepEntity } from 'src/app/core/models/Step';
import { CategoryService } from 'src/app/core/services/CategoryService';
import { Observable } from 'rxjs';
import { CategoryEntity } from 'src/app/core/models/Category';
import { StepService } from 'src/app/core/services/StepService';

@Component({
  selector: 'app-velo-event-admin',
  templateUrl: './velo-event-admin.component.html',
  styleUrls: ['./velo-event-admin.component.scss']
})
export class VeloEventAdminComponent implements OnInit, OnDestroy {
  @ViewChild('gridCategory', { static: false })
  public grid: GridComponent;

  // Subscriptions //
  categorySubscription$: any;
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


  constructor(private categoryService: CategoryService, private stepService: StepService) { }
  
  ngOnInit() {
    this.categorySubscription$ = this.categoryService.todos.subscribe(updatedTodos => {
      this.categories = [];
      this.categories = updatedTodos;
      let localArrayObject: Object[] = [];
    });
    this.categoryService.loadAll();
     // INIT TABLE HEADER
     this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
     this.toolbar = ['Add', 'Edit', 'Delete',
       { text: 'Archive', tooltipText: 'Archive', prefixIcon: 'e-save', id: 'Archive' },
       { text: 'Async', tooltipText: 'Async', prefixIcon: 'e-reload', id: 'Refresh' }];
     this.pageSettings = { pageCount: 5 };
  }
  ngOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
  }

  /**
 * Handle Table --> Start.
 */
  createFormGroup(data: IFormStructure): FormGroup {
    console.log(data.step.location_start);
    let categoryLocal:CategoryEntity = this.categoryService.buildCategory(data);
    
    return new FormGroup({
      category_name: new FormControl(categoryLocal.category_name),
      category_img: new FormControl(categoryLocal.category_img),
      //STEP
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
        let categoryEntity: CategoryEntity = this.categoryService.buildCategory(data);
        if (this.operationTobeExecuted != '') {
          console.log('OPERATION START ......')
          if (this.operationTobeExecuted === 'update') {
            console.log('UPDATE START ......')
            this.categoryService.update(categoryEntity);
          } else if (this.operationTobeExecuted === 'create') {
            /*if (categoryEntity.is_archived == null) {
              categoryEntity.is_archived = false;
            }*/
            console.log('CREATE START ......')
            this.categoryService.create(categoryEntity);
            alert('Event Created Successfuly')
            this.categoryService.loadAll()
          }
        }

      } else {
        args.cancel = true;
      }
    } else if (args.requestType === 'delete') {
      if (this.selectedCategory != null) {
        this.categoryService.remove(this.selectedCategory.id);
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
    this.selectedCategory = this.categoryService.buildCategory(this.grid.getRowInfo(args.target).rowData);
    console.log('SELECTED selectedCategory' + this.selectedCategory.category_name)
  }

  handleToolBarClicks(args: ClickEventArgs): void {
    if (args.item.id === 'Refresh') {
    
    let category: CategoryEntity;
    let step : StepEntity;
    let obj:Object;

    obj ={
      category_name: "777",
      category_img: "https://picsum.photos/200/300?t=1",
      step: {
          id:null,
          title: true,
          location_start: false,
          location_end: false,
          start_day: false,
          end_day: false,
          rep: false,
          end_repeat: false,
          rule: false,
          gender: false,
          age: false,
          difficulty: false,
          diagrame: false,
          theme: false,
          association_name: false
      }
}
this.categoryService.create(obj);
    }

    /*if (args.item.id === 'Archive') {
      if (this.selectedCategory == null) {
        alert("please select Event")
      } else {
        if (this.selectedCategory.is_archived == true) {
          alert("Event already archived")
        } else {
          this.eventServ.archiver(this.selectedCategory);
          alert('Event archived successfully')
          this.eventServ.loadAll()
        }
      }
    } else if (args.item.id === 'Refresh') {
      this.eventServ.loadAll()
    }*/

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
