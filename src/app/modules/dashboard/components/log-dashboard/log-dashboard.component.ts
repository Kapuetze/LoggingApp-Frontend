import { Component, OnInit } from '@angular/core';
import { Log } from '@models/log';
import { LogService } from 'src/app/modules/log/log.service';
import { Container } from '@models/container';
import { ContainerService } from 'src/app/modules/container/container.service';
import { map, catchError } from "rxjs/operators";

@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.css']
})
export class LogDashboardComponent implements OnInit {

    logs: Log[];
    containerOptions: any[];
    objectKeys = Object.keys;
    
    logCount: number = 0;

  	constructor(private _logService:LogService, private _containerService: ContainerService) { }

  	ngOnInit() {
        this._containerService.getContainers().subscribe(
			data => {
                let containers: Container[];
                containers = data as Container[];
                
                this.containerOptions = containers.map(i => ({ name: i.name, value: i._id }));
            }
        );

    }
    
    loadLogs(id: string){
        this._logService.queryForContainer(id).subscribe(
			data => this.logs = data as Log[]
        );
    }
}
