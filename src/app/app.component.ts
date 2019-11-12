import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './modules/user/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';

  constructor(private userService: UserService, private translateService: TranslateService) {

    this.translateService.setDefaultLang('en-US');
    if (this.translateService.getBrowserLang() !== '') {
        this.translateService.use(this.translateService.getBrowserLang());
    } else {
        this.translateService.use('en-US'); // Set your language    
    }
  }

  public getUserName(){
    return localStorage.getItem('user_firstname');
  }

  public logout(){
    this.userService.logout();
  }
}
