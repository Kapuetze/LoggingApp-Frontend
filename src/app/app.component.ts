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

  constructor(private _userService: UserService, 
    private _translateService: TranslateService,
    private _router: Router) {

    this._translateService.setDefaultLang('en-US');
    if (this._translateService.getBrowserLang() !== '') {
        this._translateService.use(this._translateService.getBrowserLang());
    } else {
        this._translateService.use('en-US'); // Set your language    
    }
  }

  public getUserName(){
    return localStorage.getItem('user_firstname');
  }

  public logout(){
    this._userService.logout();
    // Navigate to the login page with extras
    this._router.navigate(['/user', 'login']);
  }
}
