import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LogModule } from '../log/log.module';
import { LogDashboardComponent } from './components/log-dashboard/log-dashboard.component';
import { FormsModule } from '@angular/forms';
import { CustomFormElementsModule } from 'src/app/custom-form-elements/custom-form-elements.module';

@NgModule({
  declarations: [
      LogDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CustomFormElementsModule,
    LogModule
  ]
})
export class DashboardModule { }
