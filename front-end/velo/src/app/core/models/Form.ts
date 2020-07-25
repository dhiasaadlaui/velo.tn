interface FormEventArgs {
    title?: boolean
    locationSart?: boolean;
    locationEnd?: boolean;
    startDay?: boolean;
    endDay?: boolean;
    repeatDay?: boolean;
    endRepeat?: boolean;
    rule?: boolean;
    gender?: boolean;
    age?: boolean;
    difficulty?: boolean;
    diagrame?: boolean;
    theme?: boolean;
    associationName?: boolean;
 }
export class FormEvent {
    title: boolean;
    locationSart: boolean;
    locationEnd: boolean;
    startDay: boolean;
    endDay: boolean;
    endRepeat: boolean;
    rule: boolean;
    gender: boolean;
    age: boolean;
    difficulty: boolean;
    diagrame: boolean;
    theme: boolean;
    associationName: boolean;

    constructor(args: FormEventArgs = {}) {
        this.title = args.title;
        this.locationSart = args.locationSart;
        this.locationEnd = args.locationEnd;
        this.startDay = args.startDay;
        this.endDay = args.endDay;
        this.endRepeat = args.endRepeat;
        this.rule = args.rule;
        this.gender = args.gender;
        this.age = args.age;
        this.difficulty = args.difficulty;
        this.diagrame = args.diagrame;
        this.theme = args.theme;
        this.associationName = args.associationName;
    }
  }

