import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'People';
  activator = true;
  route: string | undefined;
  constructor(private router: Router, private location: Location){

    //Watch url path
    this.router.events.subscribe((val) => {
      if(this.location.path() != '/add'){
        this.activator = false
      } else {
        this.activator = true
      }
    });
  }

  //To activate people page
  addPeople(){
    this.activator = true;
    this.router.navigate(['/add']);
  }

  //To activate list page
  toList(){
    this.activator = false;
    this.router.navigate(['/list']);
  }
}
