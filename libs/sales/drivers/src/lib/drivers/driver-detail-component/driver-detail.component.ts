import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { SalesDriver, DriverService } from '@ss/sales/drivers';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-sales-driver-detail',
    standalone: true,
    imports: [
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
    ],
    styleUrls: ['./driver-detail.component.scss'],
    templateUrl: './driver-detail.component.html',
})
export class DriverDetailComponent extends BaseEntityDetailComponent<SalesDriver> {
    constructor(
        public override entitySrv: DriverService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_DRIVERS');
    }

    public override setupForm(b: SalesDriver) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            // id is primary key and managed by the base component, not editable here
            id:            [b.id],
            description:   [b.description, Validators.required],
            licenceNumber: [b.licenceNumber, Validators.pattern('\\d*')],
            licenceDate:   [b.licenceDate],
            issuedBy:      [b.issuedBy, Validators.maxLength(50)],
        });
    }
}

