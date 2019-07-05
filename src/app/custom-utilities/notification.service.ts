import { Injectable } from '@angular/core';
import * as UIkit from 'uikit';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	constructor() { }

    public notify(message : string, status = "danger", position = "top-center", timeout = "5000"){
        UIkit.notification({
            message: message,
            status: status,
            pos: position,
            timeout: timeout
        });
    }
}
