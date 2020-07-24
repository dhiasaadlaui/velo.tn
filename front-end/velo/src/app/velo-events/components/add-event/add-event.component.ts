import { Component, OnInit, ViewChild } from '@angular/core';
import { DiagramComponent, Diagram, NodeModel, ConnectorModel, PointModel } from '@syncfusion/ej2-angular-diagrams';
import { CategoryEntity } from 'src/app/core/models/Category';
import { Observable } from 'rxjs';
import { EventEntity } from 'src/app/core/models/Event';
import { CategoryService } from 'src/app/core/services/CategoryService';
import { element } from 'protractor';
import { FormsModule } from '@angular/forms';
import { StepEntity } from 'src/app/core/models/Step';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {


  /**
 * FLAGS.
 */
  showEventForm: boolean = false;
  selectedValue = "";


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

  ngOnInit(): void {

    function numberOnly(input) {
      var regex = /[^0-9]/gi;
      input.value = input.value.replace(regex, "");
    }

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
  constructor(private categoryServ: CategoryService) {
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
    this.categoryServ.loadAll();
    this.categories$ = this.categoryServ.todos;
    this.categoryServ.todos.subscribe((updatedTodos: CategoryEntity[]) => {
      updatedTodos.forEach(el => this.categories.push(el));
    });
    console.log(this.categories)
    this.categoryServ.getJSON().subscribe(updatedTodos => {
      updatedTodos.forEach(
        (element: CategoryEntity) => {
          this.categories.push(element)
        });
    });
    console.log(this.categories)

  }


  toggleEventForm() {
    if (this.category != null) {
      this.showEventForm = !this.showEventForm;
    } else {
      this.showEventForm = false;
    }
  }

  findCateogry() {
    let id: number = +this.selectedValue;
    let localArray: CategoryEntity[] = [];
    this.categoryServ.todos.subscribe((updatedTodos: CategoryEntity[]) => {
      updatedTodos.forEach(el => localArray.push(el));
    });
    if (id === -1) {
      this.categories = localArray;
      this.category = null;
      this.showEventForm = false;
    } else {
      this.category = localArray.find(category => category.id === id);
      console.log(this.category)
      this.categories = [this.category];
      console.log(this.categories)

    }

  }


}
