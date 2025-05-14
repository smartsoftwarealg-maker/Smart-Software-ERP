import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent, DOC_RECEPTION, Transaction, TransactionLine
} from '@ss/logistics/api-transaction';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ReceptionLinesService } from '../reception-lines.service';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatDialog } from '@angular/material/dialog';
import { LotInputDialogComponent } from '@ss/production/lot-input-dialog';
import { of, switchMap } from 'rxjs';
import { Lot } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-reception-lines-detail',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
    templateUrl: './reception-lines-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        TranslatePipe
    ]
})
export class ReceptionLinesDetailComponent extends BaseTransactionLinesDetailComponent implements OnInit, OnDestroy {
    constructor(public receptionLinesSrv: ReceptionLinesService,
        private dialog :MatDialog) {
        super(receptionLinesSrv,  DOC_RECEPTION);
    }

    readForm(): TransactionLine {
        const value =  super.readForm();
        value.qtyInvoiced = value.qtySatisfied;
        return value;
    }

    setupForm(b: TransactionLine): UntypedFormGroup {
        const fg = super.setupForm(b);
        fg.controls['charge']?.setValue(Math.abs(fg.controls['charge']?.value||0));
        return fg;
    }

    showLotInputDialog() {
            const dialogRef = this.dialog.open(LotInputDialogComponent, {
                width: '1000px!important',
                height: '400px',
                maxWidth: '1000px',
                disableClose: true
            });
        dialogRef
            .afterClosed()
            .pipe(switchMap(res => res? this.lotSrv.save(res as Lot): of(0)))
            .subscribe((result: number) => {
                if (result > 0) {
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }
}
