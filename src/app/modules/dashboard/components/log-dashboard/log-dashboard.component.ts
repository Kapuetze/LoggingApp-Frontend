import { Component, OnInit } from '@angular/core';
import { Log } from '@models/log';
import { LogService } from 'src/app/modules/log/log.service';

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
		var result = this.parseObject(content, "<ul class='uk-list uk-list-small uk-margin-remove'>");
		result += "</ul>";
		return result;
	}

	parseObject(content, result){
		var that = this;
		Object.keys(content).forEach(function (key, index) {
			if (typeof content[key] == 'object') {
				//console.log(key);
				result += `<li class='uk-text-bold'>${key}</li><hr class='uk-margin-small'/>`;
				result += `<ul class="uk-list uk-list-small uk-margin-remove">`;
				result = that.parseObject(content[key], result);
				result += "</ul>";
			}
			else {
				result += `<li><span class='uk-text-bold'>${key}</span>: ${content[key]}</li>`;
				//console.log(key + "   :   " + content[key]);
			}
		});

		return result;
	}

}
