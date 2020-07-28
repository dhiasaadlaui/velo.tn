import { EventConfig } from './EventConfig';

interface NodeEventEntityArgs {
    id?: number;
    position_x?: number;
    position_y?: number;
    labeln?: string;
    event_config?:EventConfig;
}
export class NodeEventEntity {
    id: number;
    position_x: number
    position_y: number
    labeln?: string;
    event_config: EventConfig;
 
    constructor(args: NodeEventEntityArgs = {}) {
        this.id = args.id;
        this.position_x = args.position_x;
        this.position_y = args.position_y; 
        this.labeln =  args.labeln; ;

    }
}

