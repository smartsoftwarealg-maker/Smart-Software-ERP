import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import {
    BaseEntityDetailComponent,
} from '@ss/common/ui-base-entity';
import {
    MaterialModule,
} from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TransactionTypesService } from '../transaction-types.service';
import { TransactionType } from '../transaction-types.api';


@Component({
    selector: 'ss-transaction-types-detail',
    templateUrl: './transaction-types-detail.component.html',
    styleUrls: ['./transaction-types-detail.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
    ],
})
export class TransactionTypesDetailComponent extends BaseEntityDetailComponent<TransactionType> {
    constructor(
        public transactionTypeSrv: TransactionTypesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            transactionTypeSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'LOGISTICS_TRANSACTION_TYPE',
        );
    }

    public override setupForm(t: TransactionType): UntypedFormGroup {
        return this.formBuilder.group({
            id: t.id,
            description: [t.description, Validators.required],
        });
    }
}

