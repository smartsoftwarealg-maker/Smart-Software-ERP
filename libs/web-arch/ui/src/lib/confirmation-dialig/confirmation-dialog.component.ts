import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LanguageService, MaterialModule } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { RouterModule } from '@angular/router';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { LogisticsUiStockInfoModule } from '@ss/logistics/ui-stock-info';

@Component({
    selector: 'ss-confirmation-dialig',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiStockInfoModule]

})

export class ConfirmationDialogComponent {
    public title: string;
    public message: string;
    public yes = 'Yes';
    public noo = 'No';

    constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        private trans: LanguageService) {
        this.yes = trans.translate('YES');
        this.noo = trans.translate('NO');
    }
}
