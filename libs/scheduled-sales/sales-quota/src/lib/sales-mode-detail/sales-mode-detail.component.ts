import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {SalesMode, SalesModeService} from '@ss/scheduled-sales/api-scheduled-sales';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';

@Component({
    selector: 'ss-sales-mode-detail',
    templateUrl: './sales-mode-detail.component.html',
    styleUrls: ['./sales-mode-detail.component.scss'],
})
export class SalesModeDetailComponent extends BaseEntityDetailComponent<SalesMode> {
    constructor(
        public override entitySrv: SalesModeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'SCH_SALES_MODES');
    }


    public setupForm(b: SalesMode) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            daysAhead: [b.daysAhead || 0, Validators.required],
            description: [{ value: b.description, disabled: true }],
        });
    }

    override readForm(): SalesMode {
        return this.form.getRawValue();
    }
}
