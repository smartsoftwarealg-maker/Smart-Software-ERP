import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Punishment} from '../punishment-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpService, LoginService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {
    ProfessionalFaultService,
    PunishmentTypeService
} from '@ss/payroll/api-employee';
import {PunishmentService} from '../punishment.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'ss-punishment-detail',
    templateUrl: './punishment-detail.component.html',
    styleUrls: ['./punishment-detail.component.scss']
})
export class PunishmentDetailComponent extends BaseEntityDetailComponent<Punishment> implements OnInit {
    private faultSrv =  inject(ProfessionalFaultService);
    private punishTypeSrv =  inject(PunishmentTypeService);

    faultAutoCompleteModel = new DefaultAutoCompleteModel(this.faultSrv);
    punishmentTypeAutoCompleteModel = new DefaultAutoCompleteModel(this.punishTypeSrv);

    constructor(
        public detailSrv: PunishmentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService) {
        super(detailSrv,
            shellSrv,
            snackBarSrv, route,
            formBuilder,
            confirmationSrv,
            'PAYROLL_PUNISHMENTS');
    }
    protected override getRouteParam(): Observable<any> {
        return this.route.parent.parent.params
            .pipe(
                switchMap(p => {
                    const parentId = +p['id'];
                    this.detailSrv.setParentId(parentId);
                    return super.getRouteParam();
                })
            );
    }

    override setupForm(a: Punishment): UntypedFormGroup {
        return this.form = this.formBuilder.group({
            id: a.id,
            employee: a.employee || this.detailSrv.getParentId(),
            centerId: [this.loginSrv.appCtx.center],
            number: [a.number],
            date: [a.date],
            punishmentType: [a.punishmentType, Validators.required],
            fault: [a.fault, Validators.required],
            faultType: [a.faultType, Validators.required],
            sanction: [a.sanction, Validators.required],
            memo: a.memo,
        });
    }
}
