import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/core/services/EventService';
import { element } from 'protractor';
import { EventEntity } from 'src/app/core/models/Event';
import { map, filter } from 'rxjs/operators';
import { Observable, interval } from 'rxjs';
import { DiagramComponent, PointModel, NodeModel, ConnectorModel } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  event: EventEntity;
  event$: Observable<EventEntity[]>;
  subscription: any;

  //** DIAGRAMES */
  @ViewChild("diagram", { static: false })

  public diagram: DiagramComponent;
  public sourcePoint1: PointModel;
  public targetPoint1: PointModel;
  public obj: object[] = [];
  constructor(private router: ActivatedRoute, private eventService: EventService) { }




  ngOnInit() {
    this.event$ = this.eventService.todos;
    /*this.eventService.todos.subscribe((element : EventEntity[]) => {
      let id:number = (+this.router.snapshot.params['id']);
      console.log(id);
      
      this.event = this.eventService.find(id);
      console.log(this.event)
    });*/
    this.subscription = this.eventService.todos.subscribe(x => x.forEach(e => {
      if (e.id == (+this.router.snapshot.params['id'])) {
        this.event = new EventEntity();
        this.event = e;
        this.initDiagrame();        
      }
    }));
    this.eventService.loadAll();
    
    /*const subscription3 = this.eventService.todos.pipe(
      map(value => value),
      filter(value => value % 2 === 0)
    ).subscribe(value => console.log(value));*/

  }

  public created(args: Object): void {
    /*this.diagram.select([this.diagram.nodes[0], this.diagram.nodes[1], this.diagram.connectors[0]]);
    //copies the selected nodes
    this.diagram.copy();
    //pastes the copied objects
    this.diagram.paste(this.diagram.copy() as (NodeModel | ConnectorModel)[]);*/
  }

  public getNodeDefaults(node: NodeModel) {
    /*node.height = 100;
    node.width = 100;
    node.style.fill = "#6BA5D7";
    node.style.strokeColor = "White";
    return node;*/
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

  initDiagrame() {
    console.log(this.event.event_config);
    this.event.event_config.nodes.forEach(e => {
      this.node = {
        offsetX: e.position_x, offsetY: e.position_y, width: 100,
        height: 100,
        style: {
          fill: '#6BA5D7',
          strokeColor: 'white'
        }
      }
      this.diagram.add(this.node)
    })

    this.event.event_config.conectors.forEach(e => {
      this.sourcePoint1 = { x: e.source_point_x, y: e.source_point_y };
      this.targetPoint1 = { x: e.target_point_x, y: e.target_point_y };
      this.obj.push({ sourcePoint1: this.sourcePoint1, targetPoint1: this.targetPoint1 })
    })

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
