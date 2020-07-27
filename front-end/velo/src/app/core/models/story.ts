import { comment } from './comment';

export class story
 { public id: number;
    public username: string;
     public summary: string;
    public content: string;
    public likes: number;
     public date: string;
     public img: string
     public comments: number;

     constructor( id:number, userName: string, summary: string, content: string, likes:number, date: string, img: string, comments:number) {
      this.id=id; 
      this.username=userName;
         this.summary=summary;
        this.content=content;
        this.likes=likes;
        this.date=date;
        this.img=img;
        this.comments=comments;
     }

  }
  