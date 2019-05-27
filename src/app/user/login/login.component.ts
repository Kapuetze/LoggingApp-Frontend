import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import * as UIkit from 'uikit';

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

	constructor(private userService: UserService) { }

	ngOnInit() {
	}

	login(){
		if (!this.loginForm.valid) {
			UIkit.notification({
				message: 'Invalid credentials!',
				status: 'danger',
				pos: 'top-center',
				timeout: 5000
			});
			console.log(this.loginForm.errors);
		}else{
			this.userService.login(JSON.stringify(this.loginForm.value))
			.subscribe(
				data => { 
					this.userService.setSession(data);
				},
				error => {
					console.log("Error: " + error.message);
				}
			)
		}
	}
}
