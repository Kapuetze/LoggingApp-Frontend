import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../container.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container-add',
  templateUrl: './container-add.component.html',
  styleUrls: ['./container-add.component.css']
})
export class ContainerAddComponent implements OnInit {

    containerForm : FormGroup = new FormGroup({
		name: new FormControl(null, Validators.required)
	})

    constructor(private _containerService: ContainerService, private _router: Router) {}

    ngOnInit() {

    }

    add(){
        this._containerService.create(JSON.stringify(this.containerForm.value))
        .subscribe(
            data => { 
                this._router.navigate(["/container"]);
            },
            error => {
                console.log("Error: " + error.message);
            }
            
        )
    }

}
