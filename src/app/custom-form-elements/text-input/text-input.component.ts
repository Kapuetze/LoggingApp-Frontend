import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit {

  @Input() id: string;
  @Input() label: string;
  @Input() type: string = "text";
  @Input() placeholder: string;
  @Input() value: string;

  @Input() parentForm: FormGroup;

  constructor() { }

  ngOnInit() {

  }
}
