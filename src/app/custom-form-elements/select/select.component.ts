import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

    @Input() id: string;
    @Input() label: string;
    @Input() options: any[];
    @Input() value: string;
    @Output() changed = new EventEmitter<string>();
  
    @Input() parentForm: FormGroup;
    
    constructor() { }

    ngOnInit() {
    }

}
