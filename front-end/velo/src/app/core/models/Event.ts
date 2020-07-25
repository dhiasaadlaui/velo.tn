interface EventEntityArgs {
    id?:number;
    event_name?: string;
    distance?: number;
    location?: string;
    start_date?: number;
    end_date?: number;
    is_theme?: boolean;
    subscribers?: any[];
    subscribersCount?:number;
}
export class EventEntity {
    id:number;
    event_name: string
    distance: number
    location:string
    start_date:number
    end_date:number
    is_theme:boolean
    subscribers:any[];
    subscribersCount?:number;

    constructor(args: EventEntityArgs = {}) {
        this.id = args.id;
        this.event_name = args.event_name;
        this.distance = args.distance;
        this.location = args.location;
        this.start_date = args.start_date;
        this.end_date = args.end_date;
        this.is_theme = args.is_theme;
        this.subscribers = args.subscribers;
     }
  }

