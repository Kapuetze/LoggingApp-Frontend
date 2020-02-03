import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Container } from '@models/container';
import { ContainerService } from '../container.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/custom-utilities/notification.service';

@Component({
  selector: 'app-container-manage',
  templateUrl: './container-manage.component.html',
  styleUrls: ['./container-manage.component.css']
})
export class ContainerManageComponent implements OnInit {

    container: Container;

    containerForm : FormGroup = new FormGroup({
		name: new FormControl(null, Validators.required)
	})

    constructor(private _route: ActivatedRoute, private _containerService: ContainerService, private _router: Router, private _notificationService: NotificationService) {
        this._route.params.subscribe( params => {   
                if (params.id) {
                    this._containerService.get(params.id).subscribe(
                        data => this.container = data as Container
                    )
                }    
            }        
        );
    }

    ngOnInit() {
    }

    edit() {
        this._containerService.patch(this.container._id, JSON.stringify(this.containerForm.value))
        .subscribe(
            data => { 
                this._notificationService.notify("Successfully edited container");
                this._router.navigate(["/container"]);
            },
            error => {
                console.log("Error: " + error.message);
            }
        )
    }

}
