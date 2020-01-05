import { environment } from '@environment/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Log } from '@models/log';

@Injectable({
  	providedIn: 'root'
})
export class LogService {

	constructor(private http:HttpClient) { }

	get(id: string) {
		return this.http.get(environment.apiBase + "/logs/"+id).pipe(
			map((res) => res as Log),
			catchError(error => of([]))
		);
	}
	
	getByUser() {
		return this.http.post(environment.apiBase + "/logs/search", {}).pipe(
			map((res) => res as Log),
			catchError(error => of([]))
		);
    }
    
    queryForContainer(id: string, query: any){
        if (query == null) {
            query = {};
        }
        return this.http.post(environment.apiBase + "/logs/search/" + id, query).pipe(
			map((res) => res as Log),
			catchError(error => of([]))
		);
    }
}
