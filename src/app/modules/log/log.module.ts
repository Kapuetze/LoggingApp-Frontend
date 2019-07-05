import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogRoutingModule } from './log-routing.module';
import { LogDetailsComponent } from './components/log-details/log-details.component';

@NgModule({
    declarations: [
        LogDetailsComponent
    ],
    imports: [
        CommonModule,
        LogRoutingModule
    ],
    exports: [
        LogDetailsComponent
    ]
})
export class LogModule { }
