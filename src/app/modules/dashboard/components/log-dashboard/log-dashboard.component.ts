import { Component, OnInit, ViewChild } from '@angular/core';
import { Log } from '@models/log';
import { LogService } from 'src/app/modules/log/log.service';
import { Container } from '@models/container';
import { ContainerService } from 'src/app/modules/container/container.service';
import { map, catchError, last } from "rxjs/operators";
import { SelectComponent } from 'src/app/custom-form-elements/select/select.component';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NotificationService } from 'src/app/custom-utilities/notification.service';

@Component({
  selector: 'app-log-dashboard',
  templateUrl: './log-dashboard.component.html',
  styleUrls: ['./log-dashboard.component.css']
})
export class LogDashboardComponent implements OnInit {

    logs: Log[];

    @ViewChild("containerSelect", { static: true }) containerSelect: SelectComponent;
    containerOptions: any[];
    propertyOptions: any[];
    objectKeys = Object.keys;
    
    logCount: number = 0;

    operatorOptions: any[] = [
        { name: "==", value: "==" },
        { name: "<", value: "<" },
        { name: ">", value: ">" },
    ];

    connectorOptions: any[] = [
        { name: "AND", value: "AND" },
        { name: "OR", value: "OR" },
    ];

    containerForm : FormGroup = new FormGroup({
        container: new FormControl()
    });

    filterForm : FormGroup = new FormGroup({
        showForm: new FormControl(true),
		filters: new FormArray([])
    });
    
    get filters(): FormArray { return this.filterForm.get('filters') as FormArray; }

  	constructor(private _logService:LogService, private _containerService: ContainerService, private _notificationService: NotificationService) { }

    //load logs for default container
  	ngOnInit() {
        this._containerService.getContainers().subscribe(
			data => {
                let containers: Container[];
                containers = data as Container[];
                
                this.containerOptions = containers.map(i => ({ name: i.name, value: i._id }));
             
                //load default container or last used container
                let lastContainerId = this.getCurrentContainer();
                if (this.containerOptions.findIndex(i => i.value == lastContainerId) > -1) {
                    this.switchContainer(lastContainerId);
                }else if (this.containerOptions.length > 0) {
                    this.switchContainer(this.containerOptions[0].value);
                } else {
                    console.log("Please create a container first.");
                }
            }
        );

    }

    addFilterGroup(){
        this.filters.push(this.newFilterGroup());
    }

    removeFilterGroup(index: number){
        this.filters.removeAt(index);
    }

    newFilterGroup() : FormGroup {
        return new FormGroup({
            property: new FormControl(this.propertyOptions[0].value),
            operator: new FormControl(this.operatorOptions[0].value),
            //connector: new FormControl(this.connectorOptions[0].value),
            value: new FormControl(null, Validators.required)
        });
    }

    getPossibleProperties(id: string){
        this._logService.getPropertyNamesForContainer(id).subscribe(
			data => {
                let properties: String[];
                properties = data as String[];        
                this.propertyOptions = properties.map(i => ({ name: i, value: i }));

                this.filters.setValue
            }
        );
    }

    applyFilter(){

        if (!this.filterForm.valid) {
            this._notificationService.notify("The form is invalid.");
		}else{
            let query = {};
            
            for (let control of this.filters.controls) {

                let fg = control as FormGroup;

                //build query object from form values
                let prop = fg.get("property").value;
                let operator = fg.get("operator").value;
                let value = fg.get("value").value;

                //transform value to a number
                if (!isNaN(value)) {
                    value = parseFloat(value);
                }              

                let innerQuery;
                switch (operator) {
                    case "==":
                        innerQuery = value;
                        break;
                    case "<":
                        innerQuery = { "$lt": value };
                        break;
                    case ">":
                        innerQuery = { "$gt": value };
                        break;
                    default:
                        break;
                }

                // let arr = new Array();
                // let queryConnector = {};
                // switch (connector) {
                //     case "AND":
                //         arr.push(innerQuery);
                //         queryConnector["$and"] = arr;
                //         break;
                //     case "OR":
                //         arr = new Array();
                //         arr.push(innerQuery);
                //         queryConnector["$or"] = arr;
                //         break;
                
                //     default:
                //         break;
                // }

                query[prop] = innerQuery;
            }
            //load logs with query values
            this.loadLogs(this.getCurrentContainer(), query);
		}
    }

    loadLogs(id: string, query: any = null): void{

        if (query != null) {
            
        }
        this._logService.queryForContainer(id, query).subscribe(
			data => this.logs = data as Log[]
        );

        //save last container in session storage
        this.setCurrentContainer(id);
    }

    switchContainer(id: string){
        this.filters.clear();
        this.containerForm.get("container").setValue(id, { onlySelf: true });
        this.getPossibleProperties(id);
        this.loadLogs(id);
    }

    getCurrentContainer(): string{
        return sessionStorage.getItem("current_container");
    }

    setCurrentContainer(id: string): void{
        sessionStorage.setItem("current_container", id);
    }
}
