interface EventConfigEntityArgs {
    id?: number
    rep?: number;
    dateRep?: number;
    status?: string;
    commentPermession?: boolean;
    showInviteList?: boolean;
    isArchived?: boolean;
    showDate?: number;
    event?: number;
}
export class EventConfig {
    id: number;
    rep: number;
    dateRep: number;
    status: string;
    commentPermession: boolean;
    showInviteList: boolean;
    isArchived: boolean;
    showDate: number;
    event: number;

    constructor(args: EventConfigEntityArgs = {}) {
        this.id = args.rep;
        this.rep = args.rep;
        this.dateRep = args.dateRep;
        this.status = args.status;
        this.commentPermession = args.commentPermession;
        this.showInviteList = args.showInviteList;
        this.isArchived = args.isArchived;
        this.showDate = args.showDate;
        this.event = args.event;
    }
  }

