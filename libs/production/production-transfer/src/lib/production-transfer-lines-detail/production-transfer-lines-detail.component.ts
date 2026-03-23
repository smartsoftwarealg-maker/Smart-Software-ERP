import { Component, inject } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_PRODUCTION_TRANSFER,
} from '@ss/logistics/api-transaction';
import {TransactionLinesService} from '@ss/logistics/api-transaction';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError, MatHint } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MaterialModule } from '@ss/common/api-common';
import { ProductionTransferLinesService } from '../production-services/production-transfer-lines.service';

@Component({
    selector: 'ss-product-transfer-lines-detail',
    templateUrl: './production-transfer-lines-detail.component.html',
    styleUrls: [
        '../../../../../common/assets/src/assets/transac-lines-detail.scss',
    ],
    standalone: true,
    imports: [
        MaterialModule,
        MatMiniFabButton,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        UiAutoCompleteComponent,
        MatError,
        MatHint,
        CdkTextareaAutosize,
    ],
})
export class ProductionTransferLinesDetailComponent extends BaseTransactionLinesDetailComponent {
    #transferSrv = inject(ProductionTransferLinesService);

    constructor(public inventoryLinesService: TransactionLinesService) {
        super(inventoryLinesService, DOC_PRODUCTION_TRANSFER);
    }

    override save() {
        const value = this.readForm();
        this.#transferSrv.transfer(value.id, value.qtySatisfied).subscribe({
            next: () => {
                this.router
                    .navigate(['../../lines-list'], { relativeTo: this.route })
                    .then();
                this.form.markAsUntouched();
                this.snackBarSrv.showSuccessMessage();
            },
            error: (err) => {
                this.snackBarSrv.showFailureMessage();
                throw err;
            },
        });
    }
}
