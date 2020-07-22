import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-velo-events',
  templateUrl: './velo-events.component.html',
  styleUrls: ['./velo-events.component.scss']
})
export class VeloEventsComponent implements OnInit {

  constructor() { 
    $(document).ready(function () {
      $(document).on("click", ".inactive-form", function () {
        $(".inactive-form,.active-form").toggleClass("inactive-form active-form");
      });
    });
    
  }

  ngOnInit() {
  }

}
