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
import { NodeEventEntity } from 'src/app/core/models/NodeEvent';
import { EventConfigService } from 'src/app/core/services/EventConfigService';
import { ConnectorEntity } from 'src/app/core/models/Connector';
import { EventConfig } from 'src/app/core/models/EventConfig';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  @Input() step: StepEntity; 
   @Input() category: CategoryEntity;
  eventForm: FormGroup

  //** DIAGRAMES */
  @ViewChild("diagram", { static: false })

  public diagram: DiagramComponent;
  public sourcePoint1: PointModel;
  public targetPoint1: PointModel;
  constructor(private eventService: EventService, private eventConfigService:EventConfigService) { }
  prop1: boolean = false;

  ngOnInit() {
    this.createForm()
    this.sourcePoint1 = { x: 300, y: 100 };
    this.targetPoint1 = { x: 400, y: 300 };
  }


  public created(args: Object): void {
    /*this.diagram.select([this.diagram.nodes[0], this.diagram.nodes[1], this.diagram.connectors[0]]);
    //copies the selected nodes
    this.diagram.copy();
    //pastes the copied objects
    this.diagram.paste(this.diagram.copy() as (NodeModel | ConnectorModel)[]);*/
  }

  public getNodeDefaults(node: NodeModel): NodeModel {
    node.height = 100;
    node.width = 100;
    node.style.fill = "#6BA5D7";
    node.style.strokeColor = "White";
    return node;
  }
  public node: NodeModel = {
    // Position of the node
    offsetX: 250,
    offsetY: 250,
    // Size of the node
    width: 100,
    height: 100,
    style: {
      fill: '#6BA5D7',
      strokeColor: 'white'
    },
  };
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

  testDiagrame() {
    this.diagram.nodes[0].offsetX = 56;
    this.diagram.nodes[0].offsetY = 48;

    this.diagram.add(this.node)

    this.diagram.nodes[1].offsetX = 749;
    this.diagram.nodes[1].offsetY = 247;

    this.diagram.connectors[0].sourcePoint.x = 60
    this.diagram.connectors[0].sourcePoint.y = 96


    this.diagram.connectors[0].targetPoint.x = 696
    this.diagram.connectors[0].targetPoint.y = 272

  }


  createForm() {  
    let event_name = new FormControl();
    let distance = new FormControl();
    let location_start = new FormControl();
    let location_end = new FormControl();
    let start_day = new FormControl();
    let end_day = new FormControl();
    let rep = new FormControl();
    let repeat_day = new FormControl();
    let end_repeat = new FormControl();
    let repeatDay = new FormControl();
    let rule = new FormControl();
    let gender = new FormControl();
    let age = new FormControl();
    let difficulty = new FormControl();
    let diagrame = new FormControl();
    let is_theme = new FormControl();
    let association_name = new FormControl();
    let category = new FormControl(this.category);
    this.eventForm = new FormGroup({
      event_name: event_name,
      distance: distance,
      location_start: location_start,
      location_end: location_end,
      start_day: start_day,
      end_day: end_day,
      rep: rep,
      repeatDay:repeatDay,
      repeat_day: repeat_day,
      end_repeat: end_repeat,
      rule: rule,
      gender: gender,
      age: age,
      difficulty: difficulty,
      diagrame: diagrame,
      is_theme: is_theme,
      association_name: association_name,
      category: category
    })

  }

  saveEvent(data) {
    console.log(data);
    
       data = this.eventForm.value;
      let eventLocal: EventEntity = this.eventService.buildEventTest(data);
      console.log(eventLocal)
      this.eventService.createEventNodeSubscription(eventLocal).subscribe(e => {
        console.log("COMON ............................");
        console.log(e);
        console.log("COMON ............................");        
        this.testDiagramedsd(e);
      });
    }

   
    testDiagramedsd(event){

      console.log(event);
      
      let  node : NodeEventEntity;
      this.diagram.nodes.forEach(e => {
        node = new NodeEventEntity();
        node.position_x = e.offsetX;
        node.position_y = e.offsetY;
        console.log("COMON ............................");
        console.log(event.eventConfig);
        console.log("COMON ............................");
        node.event_config = event.eventConfig;
        this.eventConfigService.createNode(node);
      })

      let conector:ConnectorEntity;
      this.diagram.connectors.forEach(e => {
        conector = new ConnectorEntity();
        conector.source_point_x = e.sourcePoint.x;
        conector.source_point_y= e.sourcePoint.y;
        conector.target_point_x = e.targetPoint.x;
        conector.target_point_y= e.targetPoint.y;

        conector.event_config = event.eventConfig;
        this.eventConfigService.createConnector(conector);
      })
    }
 

}
