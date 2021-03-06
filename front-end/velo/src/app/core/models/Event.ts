import { EventConfig } from './EventConfig';
import { CategoryEntity } from './Category';

interface EventEntityArgs {
    id?:number;
    event_name?: string;
    distance?: number;
    location?: string;
    start_date?: string;
    end_date?: string;
    is_theme?: boolean;
    is_archived?: boolean;
    rate?: number;
    creator_user_id?: string;
    subscribers?: any[];
    category?:CategoryEntity
    subscribersCount?:number;
}
export class EventEntity {
    id:number;
    event_name: string
    distance: number
    location:string
    start_date:string
    end_date:string
    is_theme:boolean
    is_archived:boolean
    rate:number
    creator_user_id:string
    subscribers:any[];
    category?:CategoryEntity
    subscribersCount?:number;
    event_config: EventConfig;

    constructor(args: EventEntityArgs = {}) {
        this.id = args.id;
        this.event_name = args.event_name;
        this.distance = args.distance;
        this.location = args.location;
        this.start_date = args.start_date;
        this.end_date = args.end_date;
        this.is_theme = args.is_theme;
        this.is_archived = args.is_archived;
        this.rate = args.rate;
        this.creator_user_id = args.creator_user_id;
        this.subscribers = args.subscribers;
     }
  }

