import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocImportComponent } from './doc-import/doc-import.component';
import { MaterialModule } from "@ss/common/api-common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    imports: [CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
    ],
    declarations: [DocImportComponent],
    exports: [DocImportComponent]
})
export class LogisticsUiDocImportModule { }
