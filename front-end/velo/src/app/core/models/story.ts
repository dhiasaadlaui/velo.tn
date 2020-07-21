export class story
 { public userName: string;
    public type: string;
    public summary: string;
    public content: string;
    public likes: number;
     public date: string;
     constructor(  userName: string,  type: string,  summary: string, content: string, likes:number, date: string) {
        this.userName=userName;
        this.type=type;
        this.summary=summary;
        this.content=content;
        this.likes=likes;
        this.date=date;
     }

  }
  