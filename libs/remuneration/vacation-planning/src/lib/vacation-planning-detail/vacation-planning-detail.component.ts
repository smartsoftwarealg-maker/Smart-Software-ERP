import { Component, inject, OnInit } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { VacationPlanning } from '../vacation-planning-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { LookupsService } from '@ss/common/api-lookup';
import {
    VacationPlanningDetailService,
    VacationPlanningService,
} from '@ss/remuneration/vacation-planning';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';

@Component({
    selector: 'ss-vacation-planning-detail',
    templateUrl: './vacation-planning-detail.component.html',
    styleUrls: ['./vacation-planning-detail.component.scss'],
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
        RouterOutlet,
    ],
})
export class VacationPlanningDetailComponent
    extends BaseEntityDetailComponent<VacationPlanning>
    implements OnInit
{
    private planningSrv = inject(VacationPlanningDetailService);

    constructor(
        private detailSrv: VacationPlanningService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
    ) {
        super(
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'REMUN_VACATION_PLANNING',
        );
    }

    setupForm(e: VacationPlanning): UntypedFormGroup {
        this.planningSrv.setParentId(e.id);
        return this.formBuilder.group({
            id: [e.id || 0],
            lastName: [{ value: e.lastName, disabled: true }],
            firstName: [{ value: e.firstName, disabled: true }],
            acquired: [{ value: e.acquired, disabled: true }],
            taken: [{ value: e.taken, disabled: true }],
            rest: [{ value: e.acquired - e.taken, disabled: true }],
        });
    }

    override ngOnInit() {
        this.shellSrv.setTitle(this.title); // set title save as list
        this.shellSrv.setGoBackPath('..', this.route);
        this.load();
    }
}
