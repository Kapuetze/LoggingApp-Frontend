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
		filters: new FormArray([this.newFilterGroup()])
	});

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
        let filters = this.filterForm.get("filters") as FormArray;
        filters.push(this.newFilterGroup());
    }

    removeFilterGroup(index: number){
        let filters = this.filterForm.get("filters") as FormArray;
        filters.removeAt(index);
    }

    newFilterGroup() : FormGroup {
        return new FormGroup({
            property: new FormControl(null, Validators.required),
            operator: new FormControl(),
            connector: new FormControl(),
            value: new FormControl(null, Validators.required)
        });
    }

    getPossibleProperties(id: string){
        this._logService.getPropertyNamesForContainer(id).subscribe(
			data => {
                let properties: String[];
                properties = data as String[];        
                this.propertyOptions = properties.map(i => ({ name: i, value: i }));
            }
        );
    }

    applyFilter(){

        if (!this.filterForm.valid) {
            this._notificationService.notify("The form is invalid.");
		}else{
            let query = {};
            
            //build query object from form values
            let prop = this.filterForm.get("property").value;
            let operator = this.filterForm.get("operator").value;
            let value = this.filterForm.get("value").value;

            //transform value to a number
            if (!isNaN(value)) {
                value = parseFloat(value);
            }

            let queryVal;
            switch (operator) {
                case "==":
                    queryVal = value;
                    break;
                case "<":
                    queryVal = { "$lt": value };
                    break;
                case ">":
                    queryVal = { "$gt": value };
                    break;
                default:
                    break;
            }
            query["content." + prop] = queryVal;

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
