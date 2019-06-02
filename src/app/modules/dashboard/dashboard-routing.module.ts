import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogDashboardComponent } from './components/log-dashboard/log-dashboard.component';

const routes: Routes = [
    { path: '', component: LogDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
