import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {VacationPlanning, VacationPlanningDetail} from '../vacation-planning-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpService} from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {FixedElementsEntryService} from '@ss/remuneration/elements-entry';
import {VacationPlanningDetailService} from '../vacation-planning-detail.service';
import {Lookup} from '@ss/logistics/ui-doc-import';
import {query} from '@angular/animations';
import {Observable, zip} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'ss-vacation-planning-detail-detail',
  templateUrl: './vacation-planning-detail-detail.component.html',
  styleUrls: ['./vacation-planning-detail-detail.component.scss']
})
export class VacationPlanningDetailDetailComponent extends BaseEntityDetailComponent<VacationPlanningDetail> implements OnInit {
    vacationTypes: Array<Lookup> = [];

    constructor(
        public planningSrv: VacationPlanningDetailService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public httpSrv: HttpService,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public infoSrv: FixedElementsEntryService) {
        super(planningSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'REMUN_VACATION_PLANNING');
    }

    setupForm(e: VacationPlanningDetail): UntypedFormGroup {
        return this.formBuilder.group({
            from_date: [e.from_date, Validators.required],
            to_date:   [e.to_date, Validators.required],
            address:   [e.address],
            reference: [e.reference],
            planning_id: [e.planning_id || this.planningSrv.getParentId()],
            vac_type:  [e.vac_type, Validators.required]
        })
    }

    override preload(): Observable<any> {
        return zip(this.route.parent.params,
            this.lookupsSrv.getTable('/lookups/vacation_types', 'vacation_types'))
            .pipe(tap(res => {
                this.planningSrv.setParentId(+res[0]['id']);
                this.vacationTypes = res[1];
            }));
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.setGoBackPath('../../', this.route);
    }
}
