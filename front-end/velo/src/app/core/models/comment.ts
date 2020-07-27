import { story } from './story';

export class comment
 { public id: number;
    public username: string;
     public content: string;
      constructor( id:number, userName: string, content: string ) {
      this.id=id; 
      this.username=userName;
         this.content=content;
       }

  }
  