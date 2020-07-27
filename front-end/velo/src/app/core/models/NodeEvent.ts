interface NodeEventEntityArgs {
    id?: number;
    position_x?: number;
    position_y?: number;
}
export class NodeEventEntity {
    id: number;
    position_x: number
    position_y: number
 
    constructor(args: NodeEventEntityArgs = {}) {
        this.id = args.id;
        this.position_x = args.position_x;
        this.position_y = args.position_y; 
    }
}

