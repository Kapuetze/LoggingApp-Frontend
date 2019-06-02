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
    
    logCount: number = 0;

  	constructor(private logService:LogService) { }

  	ngOnInit() {
		this.logService.query().subscribe(
			data => this.logs = data as Log[]
        )
        
        this.logService
	}
}
