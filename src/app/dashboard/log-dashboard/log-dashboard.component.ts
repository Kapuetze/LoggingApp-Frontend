import { Component, OnInit } from '@angular/core';
import { LogService } from '../log.service';
import { Log } from '@models/log';

@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.css']
})
export class LogDashboardComponent implements OnInit {

	logs: Log[];
	objectKeys = Object.keys;

  	constructor(private logService:LogService) { }

  	ngOnInit() {
		this.logService.getByUser().subscribe(
			data => this.logs = data as Log[]
		)
	  }
	  
	getContent(content){
		var that = this;
		Object.keys(content).forEach(function (key, index) {
			
			if (typeof content[key] == 'object') {
				//alert("Object " + index);
				console.log(key);
				that.getContent(content[key]);
			}
			else {
				console.log(key + "   :   " + content[key]);
			}
		});
	}

}
