import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { story } from 'src/app/core/models/story';
import { HttpClient } from '@angular/common/http';
import { StoriesService } from 'src/app/core/services/stories.service';
import { comment } from 'src/app/core/models/comment';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { UserService } from 'src/app/core/services/user.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
  name: 'search'
})

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
   constructor(
    private http: HttpClient, 
    private route:ActivatedRoute,private router: Router,
    private _storiesService: StoriesService,
    private _userService: UserService,
    private _dateFormater: DatePipe

    ) { }
   stories: Observable<story[]>;
  comments: Observable<comment[]>;
   summary :string;
  content: string;
  img: string;
  storyId: number;
  likes:number;
  showComment:boolean=false;
  notification:boolean=false;
 //for comment
  commentNumber:number;
commentContent: string;
commentId:number;
isAdmin:boolean=false;
currentUser:string;
  ngOnInit() { 
  this.initializeStories();
  this.initializeComments();
   }
 

initializeStories(){
this.stories=this._storiesService
  .getStories();

}

initializeComments(){
  this.comments=this._storiesService
    .getComments()
    }
  


  goBack(){
    this.router.navigate(['..'], { relativeTo: this.route});
  
  }

publishStory(){
  console.log(this.summary, this.img, this.content);
  const s= new story(1,this._userService.getCurrentUser().username,this.summary,this.content,0, this._dateFormater.transform(new Date(),'yyyy-MM-dd')+'T'+this._dateFormater.transform(new Date(),'HH:mm:SS')+'+00:00',this.img,0);
  console.log(s);
  this._storiesService.createStory(s).subscribe(response=>{console.log("story created successfuly");
  this.stories=this._storiesService.getStories();},err=>{console.log("error when creating story",err);
  this.stories=this._storiesService.getStories();});
 }

updateStory(){
  console.log(this.summary, this.img, this.content);
  const s= new story(this.storyId,this._userService.getCurrentUser().username,this.summary,this.content,0, this._dateFormater.transform(new Date(),'yyyy-MM-dd')+'T'+this._dateFormater.transform(new Date(),'HH:mm:SS')+'+00:00',this.img,0);
  console.log(s);
  this._storiesService.updateStory(s,this.storyId).subscribe(response=>{console.log("story updated successfuly");
  this.stories=this._storiesService.getStories();},err=>{console.log("error when updating story",err);
  this.stories=this._storiesService.getStories();});
 }
 update(story)
{ 
    
  this.storyId=story.id;
    console.log(story.id);
   
} 
updateC(comment) {
  this.commentId= comment.id;
  console.log(comment.id);

}
incLikes(){
  this.likes+=1
}

deletStory(){
    
  this._storiesService.deleteStory(this.storyId).subscribe(response=>{console.log("story deleted successfuly");
  this.stories=this._storiesService.getStories();},err=>{console.log("error when deleting story",err);
  this.stories=this._storiesService.getStories();});
 }
 likeStory(story){
  this.storyId=story.id;

   this.change(story);
 
 }
  change(story) {
  var x = document.getElementById(story.id).innerText;
  if (x=="LIKE") {
    this._storiesService.likeStory(this.storyId).subscribe(response=>{console.log("story liked successfuly");
  },err=>{console.log("error when liking story",err);
  });
  story.likes+=1;

      document.getElementById(story.id).innerText  = "UNLIKE";
  }
  else {
    this._storiesService.unlikeStory(this.storyId).subscribe(response=>{console.log("story unliked successfuly");
  },err=>{console.log("error when liking story",err);
  });
      document.getElementById(story.id).innerText  = "LIKE";
        story.likes-=1;

  }
}
addComment(story){
  console.log(this.commentContent);
  const c= new comment(1, this._userService.getCurrentUser().username,this.commentContent) ;
  console.log(c);
  this._storiesService.createComment(c,this.storyId).subscribe(response=>{console.log("story created successfuly");
  this.comments=this._storiesService.getComments();},err=>{console.log("error when creating story",err);
  this.comments=this._storiesService.getComments();});
  story.comments+=1;
 }
 showComments() {
  var x = document.getElementById("comment").innerText;
  if (x=="SHOW COMMENTS") {

   this.showComment=true;
   document.getElementById("comment").innerText  = "HIDE COMMENTS";

  }

  if (x=="HIDE COMMENTS") {

    this.showComment=false;
    document.getElementById("comment").innerText  = "SHOW COMMENTS";
 
   }
 }

notify(){
  this.notification=true;
}

closeNotif(){
     this.notification=false;
  
}


 updateComment() {
  const c= new comment(this.commentId, this._userService.getCurrentUser().username,this.commentContent) ;
  this._storiesService.updateComment(c,this.commentId).subscribe(response=>{console.log("comment updated successfuly");
  this.comments=this._storiesService.getComments();},err=>{console.log("error when creating story",err);
  this.comments=this._storiesService.getComments();});
 

 }

 deletComment(){
    
  this._storiesService.deleteComment(this.commentId).subscribe(response=>{console.log("comment deleted successfuly");
  this.comments=this._storiesService.getComments();},err=>{console.log("error when deleting comment",err);
  this.comments=this._storiesService.getComments();});
  this.stories=this._storiesService.getStories();
 }
 setCurrentUser(){
   if(this._userService.getCurrentUser().username=='admin') {
     this.isAdmin=true;
   }
 this.currentUser=this._userService.getCurrentUser().username;
 }
}
