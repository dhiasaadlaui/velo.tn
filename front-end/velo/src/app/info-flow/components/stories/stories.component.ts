import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { story } from 'src/app/core/models/story';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router: Router) { }
  public stories: story[] = [new story ("habib","experience", "the best day of my life", "blaa blaaa blaa",0,"Posted on February 19, 2016"),

  new story ("sa3d","experience", "the best worst of my life", "blaa blaaa blaa",0,"Posted on February 19, 2016"),
 
  new story ("ali","thought", "lets do this", "blaa blaaa blaa",0,"Posted on February 19, 2016")];

  ngOnInit() {
  }
 
  goBack(){
    this.router.navigate(['..'], { relativeTo: this.route});
  
  }
  
}
