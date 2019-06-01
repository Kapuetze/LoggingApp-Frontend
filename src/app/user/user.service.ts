import { environment } from '@environment/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "@models/user";
import * as moment from "moment";
import { Observable, of } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable({
  	providedIn: 'root'
})
export class UserService {

  	constructor(private http:HttpClient) { }

	//register a new account
  	register(body: any){
		return this.http.post(environment.apiBase + "/user/register", body, {
			observe: "body",
			headers: new HttpHeaders().append("Content-Type", "application/json")
		});
	}

	//login an account
	login(body : any){
		return this.http.post(environment.apiBase + "/user/login", body, {
			observe: "body",
			withCredentials: true,
			headers: new HttpHeaders().append("Content-Type", "application/json")
		});
	}

	getUser(id: string) {
		return this.http.get(environment.apiBase + "/user/"+id).pipe(
			map((res) => res as User),
			catchError(error => of([]))
		);
	}
	
	public setSession(authResult) {
		const expiresAt = moment().add(authResult.expiration,'second');

		debugger;
		
		localStorage.setItem('user_id', authResult.user._id);
		localStorage.setItem('user_firstname', authResult.user.name.first);
        localStorage.setItem('token_id', authResult.token);
		localStorage.setItem("token_expiration", JSON.stringify(expiresAt.valueOf()) );
    }          

    logout() {
        localStorage.removeItem("token_id");
        localStorage.removeItem("token_expiration");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("token_expiration");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }    
}
