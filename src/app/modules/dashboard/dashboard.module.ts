import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LogModule } from '../log/log.module';
import { LogDashboardComponent } from './components/log-dashboard/log-dashboard.component';

@NgModule({
  declarations: [
      LogDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LogModule
  ]
})
export class DashboardModule { }
