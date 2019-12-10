import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerListComponent } from './container-list/container-list.component';
import { ContainerManageComponent } from './container-manage/container-manage.component';
import { ContainerRoutingModule } from './container-routing.module';
import { CustomFormElementsModule } from 'src/app/custom-form-elements/custom-form-elements.module';
import { ContainerAddComponent } from './container-add/container-add.component';

@NgModule({
    declarations: [
        ContainerListComponent, 
        ContainerManageComponent, ContainerAddComponent
    ],
    imports: [
        CommonModule,
        ContainerRoutingModule,
        CustomFormElementsModule
    ]
})
export class ContainerModule { }
