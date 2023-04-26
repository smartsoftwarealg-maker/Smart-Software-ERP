import {Component, inject} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {HolidayRequest} from '@ss/payroll/api-employee';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {HolidayRequestService} from '../holiday-request.service';
import {LoginService} from '@ss/common/api-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {HolidayTypeService} from '../holiday-type.service';

@Component({
    selector: 'ss-holiday-request-dist',
    templateUrl: './holiday-request-detail.component.html',
    styleUrls: ['./holiday-request-detail.component.scss'],
})
export class HolidayRequestDetailComponent extends BaseEntityDetailComponent<HolidayRequest>{
    private loginSrv = inject(LoginService);
    private holidayTypeSrv = inject(HolidayTypeService);

    holidayLookup = new DefaultAutoCompleteModel(this.holidayTypeSrv);

    constructor(
        public override entitySrv: HolidayRequestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ATT_HOLIDAY_REQUEST');
    }


    public override setupForm(b: HolidayRequest) {
        // Make sure to update the template if you edit the configuration here
        super.isEditable = !!this.loginSrv.appCtx.personId;
        return this.formBuilder.group({
            id: [b.id],
            centerId: [b.centerId || this.loginSrv.appCtx.center, Validators.required],
            personId: [b.personId || this.loginSrv.appCtx.personId, Validators.required],
            from:     [b.from, Validators.required],
            to:       [b.to, Validators.required],
            hType:    [b.hType, Validators.required],
        });
    }

    override readForm(): HolidayRequest {
        return this.form.getRawValue();
    }
}
