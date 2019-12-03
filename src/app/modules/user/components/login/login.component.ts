import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../user.service';
import { NotificationService } from 'src/app/custom-utilities/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm : FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.email, Validators.required]),
		password: new FormControl(null, Validators.required),
	})

    constructor(private _userService: UserService, 
        private _notificationService: NotificationService, 
        private _activatedRoute: ActivatedRoute, 
        private _router: Router) { }

	ngOnInit() {
	}

	login(){
		if (!this.loginForm.valid) {
            this._notificationService.notify("Invalid credentials.");
			console.log(this.loginForm.errors);
		}else{
			this._userService.login(JSON.stringify(this.loginForm.value))
			.subscribe(
				data => { 
                    this._userService.setSession(data);
                    let nextUrl = this._activatedRoute.snapshot.queryParams["next"];
                    if(nextUrl){
                        this._router.navigate([nextUrl]);
                    }else{
                        this._router.navigate(["/dashboard"]);
                    }
                    
				},
				error => {
                    this._notificationService.notify(error.message);
				}
			)
		}
	}
}
