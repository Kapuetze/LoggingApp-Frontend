import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

    @ViewChild("appSelect", { static: true }) selectElement;
    @Input() id: string;
    @Input() label: string;
    @Input() options: any[];
    @Input() value: string;
    @Output() changed = new EventEmitter<string>();

    @Input() parentForm: FormGroup;
    
    constructor() { }

    ngOnInit() {

    }

    setValue(value: String){
        this.selectElement.nativeElement.value = value;
        this.selectElement.nativeElement.dispatchEvent(new Event('change'));
        console.log("Selected: " + this.selectElement.nativeElement.value);
    }
}
