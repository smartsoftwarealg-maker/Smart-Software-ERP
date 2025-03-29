import { Component, inject, Inject, OnInit } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatButton } from "@angular/material/button";
import { AccJournalsService, AccTransactionLineService } from '@ss/accounting/accounting-api';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-doc-import',
    templateUrl: './piece-duplication.component.html',
    styleUrls: ['./piece-duplication.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        FormsModule,
        ReactiveFormsModule,
        MatButton,
        UiAutoCompleteComponent
    ]
})
export class PieceDuplicationComponent {
    #transactionLineSrv = inject(AccTransactionLineService);
    #fb = inject(FormBuilder);
    #dialogRef = inject(MatDialogRef<PieceDuplicationComponent>);
    #journalSrv = inject(AccJournalsService);

    form = this.#fb.group({
        journal: [0],
        pieceNo: [0]
    });
    journalLookup = new DefaultAutoCompleteModel(this.#journalSrv);

    constructor(@Inject(MAT_DIALOG_DATA) private data: { destinationId: number }) {}

    public close() {
        this.#transactionLineSrv
            .duplicate(this.form.value.journal, this.form.value.pieceNo, this.data.destinationId)
            .subscribe(res => this.#dialogRef.close({ count: res.count }));
    }

    public cancel() {
        this.#dialogRef.close({ count: 0 });
    }

}
