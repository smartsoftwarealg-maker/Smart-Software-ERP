import {Component, OnInit} from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ASSAppointment} from '../assets-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService, OfficeService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {AssetAppointmentService} from '../asset-appointment.service';

@Component({
    selector: 'ss-asset-appointment-detail',
    templateUrl: './asset-appointment-detail.component.html',
    styleUrls: ['./asset-appointment-detail.component.scss']
})
export class AssetAppointmentDetailComponent extends BaseEntityDetailComponent<ASSAppointment> implements OnInit {
    private parentId = 0;
    officeLookup = new DefaultAutoCompleteModel(this.officeSrv);

    constructor(
        public assetAppointmentSrv: AssetAppointmentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private officeSrv: OfficeService) {
        super(assetAppointmentSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'ASSET_APPOINTMENTS');
    }

    public setupForm(a: ASSAppointment): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id:            [a.id],
            invest_id:     [a.invest_id || this.parentId],
            decision_date: [a.decision_date, Validators.required],
            decision_ref:  [a.decision_ref],
            office_id:     [a.office_id, Validators.required]
        });
    }

    protected override getRouteParam(): Observable<any> {
        return this.route
            .parent
            .parent.params
            .pipe(
                switchMap(p => {
                    this.parentId = +p['id'] || 0;
                    this.assetAppointmentSrv.setParentId(this.parentId);
                    return super.getRouteParam();
                })
            );
    }


    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../..', this.route);
    }
}
