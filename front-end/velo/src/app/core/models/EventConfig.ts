import { NodeEventEntity } from './NodeEvent';
import { ConnectorEntity } from './Connector';

interface EventConfigEntityArgs {
    id?:number;
    location_start?: boolean;
    location_end?: boolean;
    start_day?: boolean;
    end_day?: boolean;
    rep?:boolean;
    end_repeat?: boolean;
    rule?: boolean;
    gender?: boolean;
    age?: boolean;
    difficulty?: boolean;
    diagrame?: boolean;
    theme?: boolean;
    association_name?: boolean;

 }
export class EventConfig {
    id:number;
     location_start: boolean;
    location_end: boolean;
    start_day: boolean;
    end_day: boolean;
    rep: boolean;
    end_repeat: boolean;
    rule: boolean;
    gender: boolean;
    age: boolean;
    difficulty: boolean;
    diagrame: boolean;
    theme: boolean;
    association_name: boolean;
    nodes : NodeEventEntity[];
    conectors: ConnectorEntity[];


    constructor(args: EventConfigEntityArgs = {}) {
         this.id = args.id;
         this.location_start = args.location_start;
        this.location_end = args.location_end;
        this.start_day = args.start_day;
        this.end_day = args.end_day;
        this.rep = args.rep;
        this.end_repeat = args.end_repeat;
        this.rule = args.rule;
        this.gender = args.gender;
        this.age = args.age;
        this.difficulty = args.difficulty;
        this.diagrame = args.diagrame;
        this.theme = args.theme;
        this.association_name = args.association_name;
    }
  }

