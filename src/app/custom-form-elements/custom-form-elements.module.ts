import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    TextInputComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TextInputComponent,
    SelectComponent,
    ReactiveFormsModule
  ]
})
export class CustomFormElementsModule { }
