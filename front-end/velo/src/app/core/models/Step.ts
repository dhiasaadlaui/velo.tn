interface StepEntityArgs {
    id?:number;
    title?: boolean
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
export class StepEntity {
    id:number;
    title: boolean;
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

    constructor(args: StepEntityArgs = {}) {
        this.id = args.id;
        this.title = args.title;
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

