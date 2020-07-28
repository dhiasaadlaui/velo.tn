import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DiagramComponent, Diagram, NodeModel, ConnectorModel, PointModel } from '@syncfusion/ej2-angular-diagrams';
import { CategoryEntity } from 'src/app/core/models/Category';
import { Observable } from 'rxjs';
import { EventEntity } from 'src/app/core/models/Event';
import { CategoryEventService } from 'src/app/core/services/CategoryEventService';
import { element } from 'protractor';
import { FormsModule } from '@angular/forms';
import { StepEntity } from 'src/app/core/models/Step';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  // Subscriptions //
  categorySubscription$: any;

  /**
 * FLAGS.
 */
  showEventForm: boolean = false;
  selectedValue = "";
  comboBoxValue = '';
  categoryFound:boolean = false;


  /**
 * DATA.
 */
  categories$: Observable<CategoryEntity[]>;
  categories: CategoryEntity[] = [];
  category: CategoryEntity;

  events$: Observable<EventEntity[]>;
  events: EventEntity[] = [];
  event: EventEntity;

  steps$: Observable<StepEntity[]>;
  steps: StepEntity[] = [];
  step: StepEntity;
  public catDropDown: { [key: string]: Object }[] = []
  public fields: Object = { text: 'Name', value: 'Id' };

  ngOnInit() {
    this.categorySubscription$ = this.categoryServ.todos.subscribe(updatedTodos => {
      this.categories = [];
      this.categories = updatedTodos;
      this.categories.forEach(element => {
        this.catDropDown.push( { Id: element.id, Name: element.category_name } )
       });
    });
    this.categoryServ.loadAll();

    function numberOnly(input) {
      var regex = /[^0-9]/gi;
      input.value = input.value.replace(regex, "");
    }


    /* Demo purposes only */
$(".hover").mouseleave(
  function() {
    $(this).removeClass("hover");
  }
);
    $(document).ready(function () {
      var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

      allWells.hide();

      navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
          $item = $(this);
        if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-primary').addClass('btn-default');
          $item.addClass('btn-primary');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
        }
      });

      allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url'],textarea[textarea]"),
          isValid = true;
        console.log(curStepBtn);
        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
          console.log(curInputs);
          if (!(<any>curInputs[i]).validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
        }

        if (isValid)
          nextStepWizard.removeAttr('disabled').trigger('click');
      });

      $('div.setup-panel div a.btn-primary').trigger('click');
    });

  }
  constructor(private categoryServ: CategoryEventService) {
    $(document).ready(function () {

      var navListItems = $('div.setup-panel div a'),
        allWells = $('.setup-content'),
        allNextBtn = $('.nextBtn');

      allWells.hide();

      navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
          $item = $(this);

        if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-primary').addClass('btn-default');
          $item.addClass('btn-primary');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
        }
      });

      allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content"),
          curStepBtn = curStep.attr("id"),
          nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
          if (!(<any>curInputs[i]).validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
        }

        if (isValid)
          nextStepWizard.removeAttr('disabled').trigger('click');
      });

      $('div.setup-panel div a.btn-primary').trigger('click');
    });

  }
  ngOnDestroy(): void {
    this.categorySubscription$.unsubscribe();
  }


  toggleEventForm() {
    if (this.category != null) {
      this.showEventForm = !this.showEventForm;
    } else {
      this.showEventForm = false;
    }
  }


  selectCategory(data:CategoryEntity){
    this.category = data;
    this.category != null ? this.showEventForm = true : this.showEventForm = false;
  }

  findCateogry() {
    console.log(this.comboBoxValue);    
    let id: number = +this.comboBoxValue;
    let localArray: CategoryEntity[] = [];
    this.categoryServ.todos.subscribe((updatedTodos: CategoryEntity[]) => {
      localArray = updatedTodos;
    });
    if (id == 0) {
      this.categoryFound = false
      this.categories = localArray;
      this.category = null;
      this.showEventForm = false;
    } else {
      console.log(id);
      
      this.category = localArray.find(category => category.id === id);
      this.category != null ? this.categoryFound = true : this.categoryFound = false;

    }
    this.category != null ? this.showEventForm = true : this.showEventForm = false;

  }


}
