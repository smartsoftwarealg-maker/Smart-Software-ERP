import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SalesDiscount } from '../discounts-api.class';
import { SalesDiscountsService } from '../sales-discounts.service';

@Component({
    selector: 'ss-sales-discounts',
    templateUrl: 'discounts-detail.component.html',
    styleUrl: 'discounts-detail.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        RouterOutlet
    ]
})
export class DiscountsDetailComponent extends BaseEntityDetailComponent<SalesDiscount> {
    private salesDiscountsService = inject(SalesDiscountsService);
    constructor(
        public override entitySrv: SalesDiscountsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'SALES_DISCOUNTS_DETAIL',
        );
    }

    public override setupForm(e: SalesDiscount): UntypedFormGroup {
        this.salesDiscountsService.setParentId(e.id || 0);
        return this.formBuilder.group({
            id: e.id,
            threshold: [e.threshold, Validators.required],
            discount: [e.discount],
        });
    }
}
