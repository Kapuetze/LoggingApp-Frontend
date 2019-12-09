import { Component, OnInit } from '@angular/core';
import { ContainerService } from '../container.service';
import { Container } from '@models/container';

@Component({
  selector: 'app-container-list',
  templateUrl: './container-list.component.html',
  styleUrls: ['./container-list.component.css']
})
export class ContainerListComponent implements OnInit {

    containers: Container[];

  	constructor(private _containerService: ContainerService) { }

  	ngOnInit() {
		this._containerService.getContainers().subscribe(
			data => this.containers = data as Container[]
        );
	}

}
