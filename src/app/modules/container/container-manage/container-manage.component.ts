import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Container } from '@models/container';
import { ContainerService } from '../container.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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

    constructor(private _route: ActivatedRoute, private _containerService: ContainerService) {
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

}
