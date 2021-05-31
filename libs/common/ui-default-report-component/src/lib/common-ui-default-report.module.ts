import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultReportComponent } from './ui-default-report/default-report.component';
import {MaterialModule} from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';

@NgModule({
    imports: [CommonModule,
              MaterialModule,
              CommonUiLangModule
            ],
  declarations: [
    DefaultReportComponent
  ],
})
export class CommonUiDefaultReportModule {}
