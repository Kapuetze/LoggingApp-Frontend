import { environment } from '@environment/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Container } from "@models/container";

import { Observable, of } from 'rxjs';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

    constructor(private _http: HttpClient) { }

    //create a new container
  	create(body: any){
		return this._http.post(environment.apiBase + "/container", body, {
			observe: "body",
			headers: new HttpHeaders().append("Content-Type", "application/json")
		});
	}

    getContainers() {
        return this._http.get(environment.apiBase + "/container").pipe(
            map((res) => res as Container),
            catchError(error => of([]))
        );
    }

    get(id: number) {
        return this._http.get(environment.apiBase + "/container/" + id).pipe(
            map((res) => res as Container),
            catchError(error => of([]))
        );
    }
}
