import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {VacationPlanning, VacationPlanningDetail} from '../vacation-planning-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {FixedElementsEntryService} from '@ss/remuneration/elements-entry';
import {VacationPlanningDetailService} from '../vacation-planning-detail.service';
import {Lookup} from '@ss/logistics/ui-doc-import';
import {query} from '@angular/animations';
import {Observable, zip} from 'rxjs';
import {tap} from 'rxjs/operators';
import { MatCard } from '@angular/material/card';
import { NgIf, NgFor } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-vacation-planning-detail-detail',
    templateUrl: './vacation-planning-detail-detail.component.html',
    styleUrls: ['./vacation-planning-detail-detail.component.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, NgIf, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatSelect, NgFor, MatOption, MatInput, DatePickerComponent, MatError]
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
            id:          [e.id | 0],
            fromDate:    [e.fromDate, Validators.required],
            toDate:      [e.toDate, Validators.required],
            address:     [e.address],
            reference:   [e.reference],
            planning_id: [e.planning_id || this.planningSrv.getParentId()],
            vac_type:    [e.vac_type, Validators.required]
        })
    }

    override preload(): Observable<any> {
        return zip(this.route.parent.params,
            this.lookupsSrv.getTable('/lookups/vacation_types', 'vacation-types'))
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
