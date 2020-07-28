 
export class DataFlow
 { public id: number;
    public username: string;
     public likes: number;
     public reports: number;
     public points: number;
     public commends: number;
     public events: number;
     public riderescue: number;
     public parkiteer: number;
     public marktplace: number;
     public stories: number;

     constructor( id:number, username: string,  likes:number,  reports:number ,  
        points:number ,  commends:number ,  events:number ,  rideRescue:number ,  parkiteer:number,  markteplace:number ,  publishedStories:number   ) {
      this.id=id; 
      this.username=username;
         this.likes=likes;
         this.reports=reports;
         this.points=points;
         this.commends=commends;
         this.events=events;
         this.riderescue=rideRescue;
         this.parkiteer=parkiteer;
         this.marktplace=markteplace;
         this.stories=publishedStories;
       }

  }
  