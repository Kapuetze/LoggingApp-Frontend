import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerListComponent } from './container-list/container-list.component';
import { ContainerManageComponent } from './container-manage/container-manage.component';
import { ContainerAddComponent } from './container-add/container-add.component';

const routes: Routes = [
    { path: '', component: ContainerListComponent },
    { path: 'add', component: ContainerAddComponent },
    { path: 'edit/:id', component: ContainerManageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContainerRoutingModule { }
