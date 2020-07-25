import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef } from '@angular/core';
import { DiagramComponent, PointModel, NodeModel, ConnectorModel } from '@syncfusion/ej2-angular-diagrams';
import { SpinSettingsModel } from '@syncfusion/ej2-angular-splitbuttons';
import { CategoryEntity } from 'src/app/core/models/Category';
import { Observable, Subject } from 'rxjs';
import { FormInputComponent } from '../form-input/form-input.component';
import { FormEvent } from 'src/app/core/models/Form';
import { StepEntity } from 'src/app/core/models/Step';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEntity } from 'src/app/core/models/Event';
import { EventService } from 'src/app/core/services/EventService';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Input() step: StepEntity;
  eventForm: FormGroup

  //** DIAGRAMES */
  @ViewChild("diagram", { static: false })

  public diagram: DiagramComponent;
  public sourcePoint1: PointModel;
  public targetPoint1: PointModel;
  constructor(private eventSerice:EventService) { }
  prop1: boolean = false;

  ngOnInit() {
    this.createForm()
    this.sourcePoint1 = { x: 300, y: 100 };
    this.targetPoint1 = { x: 400, y: 300 };
  }


  public created(args: Object): void {
    this.diagram.select([this.diagram.nodes[0], this.diagram.nodes[1], this.diagram.connectors[0]]);
    //copies the selected nodes
    this.diagram.copy();
    //pastes the copied objects
    this.diagram.paste(this.diagram.copy() as (NodeModel | ConnectorModel)[]);
  }

  public getNodeDefaults(node: NodeModel): NodeModel {
    node.height = 100;
    node.width = 100;
    node.style.fill = "#6BA5D7";
    node.style.strokeColor = "White";
    return node;
  }
  public getConnectorDefaults(obj: ConnectorModel) {
    obj.style = {
      strokeColor: '#6BA5D7',
      fill: '#6BA5D7',
      strokeWidth: 2
    }
    obj.targetDecorator = {
      style: {
        fill: '#6BA5D7',
        strokeColor: '#6BA5D7'
      }
    }
  }


  createForm() {
    let title = new FormControl();
    let locationSart = new FormControl();
    let locationEnd = new FormControl();
    let startDay = new FormControl();
    let endDay = new FormControl();
    let repeat = new FormControl();
    let repeatDay = new FormControl();
    let endRepeat = new FormControl();
    let rule = new FormControl();
    let gender = new FormControl();
    let age = new FormControl();
    let difficulty = new FormControl();
    let diagrame = new FormControl();
    let theme = new FormControl();
    let associationName = new FormControl();
    this.eventForm = new FormGroup({
      title: title,
      locationSart: locationSart,
      locationEnd: locationEnd,
      startDay: startDay,
      endDay: endDay,
      repeat: repeat,
      repeatDay: repeatDay,
      endRepeat: endRepeat,
      rule: rule,
      gender: gender,
      age: age,
      difficulty: difficulty,
      diagrame: diagrame,
      theme: theme,
      associationName: associationName
    })
    title.setValidators(Validators.required)
    locationSart.setValidators(Validators.required)
    locationEnd.setValidators(Validators.required)
    startDay.setValidators(Validators.required)
    endDay.setValidators(Validators.required)
    repeat.setValidators(Validators.required)
    repeatDay.setValidators(Validators.required)
    endRepeat.setValidators(Validators.required)
    rule.setValidators(Validators.required)
    gender.setValidators(Validators.required)
    age.setValidators(Validators.required)
    difficulty.setValidators(Validators.required)
    diagrame.setValidators(Validators.required)
    theme.setValidators(Validators.required)
    associationName.setValidators(Validators.required)
  }

  saveEvent(data) {
   let event:EventEntity = new EventEntity();
   console.log(data.locationSart)
   event.location = "data.locationSart";
   event.start_date = 55515158;
   event.end_date = 454154544;
   event.event_name = data.title;
   event.distance = 5548485;
   event.is_theme = false;

   console.log(event)
   this.eventSerice.create(event);

      
  }


}
