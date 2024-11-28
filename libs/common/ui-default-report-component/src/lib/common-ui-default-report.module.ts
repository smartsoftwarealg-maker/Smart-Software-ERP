import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultReportComponent } from './ui-default-report/default-report.component';
import {MaterialModule} from '@ss/common/api-common';

import {EmailSenderComponent} from "./ui-email-sender/email-sender.component";

@NgModule({
    imports: [CommonModule,
        MaterialModule,
         DefaultReportComponent,
        EmailSenderComponent],
})
export class CommonUiDefaultReportModule {}
