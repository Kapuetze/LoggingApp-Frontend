import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerListComponent } from './container-list/container-list.component';
import { ContainerManageComponent } from './container-manage/container-manage.component';

@NgModule({
    declarations: [
        ContainerListComponent, 
        ContainerManageComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ContainerModule { }
