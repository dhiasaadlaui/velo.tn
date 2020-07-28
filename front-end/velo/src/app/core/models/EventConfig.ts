import { NodeEventEntity } from './NodeEvent';
import { ConnectorEntity } from './Connector';

interface EventConfigEntityArgs {
    id?:number;
    location_start?: string;
    location_end?: string;
    start_day?: string;
    end_day?: string;
    rep?:string;
    end_repeat?: string;
    rule?: string;
    gender?: string;
    age?: string;
    difficulty?: string;
    diagrame?: string;
    is_theme?: string;
    association_name?: string;

 }
export class EventConfig {
    id:number;
     location_start: string;
    location_end: string;
    start_day: string;
    end_day: string;
    rep: string;
    end_repeat: string;
    rule: string;
    gender: string;
    age: string;
    difficulty: string;
    diagrame: string;
    is_theme: string;
    association_name: string;
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
        this.is_theme = args.is_theme;
        this.association_name = args.association_name;
    }
  }

