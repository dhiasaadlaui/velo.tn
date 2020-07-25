import { Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
 import { StepEntity } from 'src/app/core/models/Step';
import { DiagramComponent, PointModel, NodeModel, ConnectorModel } from '@syncfusion/ej2-angular-diagrams';
import { SpinSettingsModel } from '@syncfusion/ej2-angular-splitbuttons';
 
@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  @Input() step: StepEntity;
  @Input() submitted: boolean = false;

  @Output() formEventEmitter = new EventEmitter()
  //** DIAGRAMES */
  @ViewChild("diagram", { static: false })
  public diagram: DiagramComponent;
  public sourcePoint1: PointModel;
  public targetPoint1: PointModel;

  @Input()
  set setProp(p: boolean) {
    // -- perform save function here
    console.log('thnx god');


}
  constructor() { }

  ngOnInit() {
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

  public handleForm(){
    this.formEventEmitter.emit('foo')
  }



}
