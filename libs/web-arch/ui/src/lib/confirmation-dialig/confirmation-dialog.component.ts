import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LanguageService, MaterialModule } from '@ss/common/api-common';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-confirmation-dialig',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.css'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    RouterModule
]

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
