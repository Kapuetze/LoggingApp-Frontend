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

    //add a new filter
    addFilterGroup(){
        this.filters.push(this.newFilterGroup());
    }

    //remove a filter
    removeFilterGroup(index: number){
        this.filters.removeAt(index);
    }

    //return a new filter group
    newFilterGroup() : FormGroup {
        return new FormGroup({
            property: new FormControl(this.propertyOptions[0].value),
            operator: new FormControl(this.operatorOptions[0].value),
            value: new FormControl(null, Validators.required)
        });
    }

    //get available properties from the api
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

    //use filters with loadLogs function
    applyFilter(){

        if (!this.filterForm.valid) {
            this._notificationService.notify("The form is invalid.");
		}else{
            let query = {};
            let andQry = [];
            query = {
                $and: [
                    { $or: [{a: 1}, {b: 1}] },
                    { $or: [{c: 1}, {d: 1}] }
                ]
            };
            
            for (let control of this.filters.controls) {

                let fg = control as FormGroup;

                //build query object from form values
                let prop = fg.get("property").value;
                let operator = fg.get("operator").value;
                let value = fg.get("value").value;

                let floatQry;
                //transform value to a number
                if (!isNaN(value)) {
                    let floatValue = parseFloat(value);

                    //floats need to be parsed before querying
                    //but we never know if it is actually a float, so we need to search for the string as well
                    //using OR
                    switch (operator) {
                        case "==":
                            floatQry = floatValue;
                            break;
                        case "<":
                            floatQry = { "$lt": floatValue };
                            break;
                        case ">":
                            floatQry = { "$gt": floatValue };
                            break;
                        default:
                            break;
                    }
                }              

                let innerQry;
                switch (operator) {
                    case "==":
                        innerQry = value;
                        break;
                    case "<":
                        innerQry = { "$lt": value };
                        break;
                    case ">":
                        innerQry = { "$gt": value };
                        break;
                    default:
                        break;
                }

                if (!isNaN(value)) {
                    let newProp = {};
                    newProp[prop] = innerQry;
                    let floatProp = {};
                    floatProp[prop] = floatQry;

                    let orQry = { $or: [newProp, floatProp] }
                    andQry.push(orQry);
                }else{
                    let newProp = {};
                    newProp[prop] = innerQry;
                    andQry.push(newProp)
                }
            }

            if (andQry.length > 0) {
                query['$and'] = andQry;
            }else{
                query = {};
            }
            

            //load logs with query values
            this.loadLogs(this.getCurrentContainer(), query);
		}
    }

    //load logs for a container id
    loadLogs(id: string, query: any = null): void{

        if (query != null) {
            
        }
        this._logService.queryForContainer(id, query).subscribe(
			data => this.logs = data as Log[]
        );

        //save last container in session storage
        this.setCurrentContainer(id);
    }

    //change the current container
    switchContainer(id: string){
        this.filters.clear();
        this.containerForm.get("container").setValue(id, { onlySelf: true });
        this.getPossibleProperties(id);
        this.loadLogs(id);
    }

    //return the currently selected container
    getCurrentContainer(): string{
        return sessionStorage.getItem("current_container");
    }

    //set the currently selected container
    setCurrentContainer(id: string): void{
        sessionStorage.setItem("current_container", id);
    }
}
