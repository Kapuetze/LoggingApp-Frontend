import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './modules/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';

  constructor(private userService: UserService) {}

  public getUserName(){
    return localStorage.getItem('user_firstname');
  }

  public logout(){
    this.userService.logout();
  }
}
