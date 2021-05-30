import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultReportComponent } from './ui-default-report/default-report.component';
import {MaterialModule} from '@ss/common/api-common';

@NgModule({
    imports: [CommonModule,
              MaterialModule],
  declarations: [
    DefaultReportComponent
  ],
})
export class CommonUiDefaultReportModule {}
