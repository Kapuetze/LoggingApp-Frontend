import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-filter-options',
  templateUrl: './log-filter-options.component.html',
  styleUrls: ['./log-filter-options.component.css']
})
export class LogFilterOptionsComponent implements OnInit {

    operatorOptions: any[] = [
        { name: "==", value: "==" },
        { name: "<", value: "<" },
        { name: ">", value: ">" },
    ];

    filterForm : FormGroup = new FormGroup({
		field: new FormControl(null, Validators.required),
		operator: new FormControl(null, Validators.required),
		value: new FormControl(null, Validators.required)
	})

    constructor() { }

    ngOnInit() {
    }

}
