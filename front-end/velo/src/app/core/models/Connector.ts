import { EventConfig } from './EventConfig';

interface ConnectorEntityArgs {
    id?: number;
    source_point_x?: number;
    source_point_y?: number;
    target_point_x?: number;
    target_point_y?: number;
    

 }
export class ConnectorEntity {
    id: number;
    source_point_x: number
    source_point_y: number
    target_point_x: number
    target_point_y: number
    event_config: EventConfig;

 
    constructor(args: ConnectorEntityArgs = {}) {
        this.id = args.id;
        this.source_point_x = args.source_point_x;
        this.source_point_y = args.source_point_y; 
        this.target_point_x = args.target_point_x; 
        this.target_point_y = args.target_point_y; 
    }
}

