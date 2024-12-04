import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from "@angular/router";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule } from '@ss/common/api-common';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent, UserLookup } from '@ss/common/ui-auto-complete';
import { LTMAbnormalTest } from '@ltm/ltm-api';
import { LtmAbnormalTestService } from '@ltm/ltm-api';
import { LtmCorrectionActionService } from '@ltm/ltm-api';
import { UserListService } from '@ss/common/api-users';
import { LtmNormService } from '@ltm/ltm-api';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

@Component({
    selector: 'ss-ltm-alerts-detail',
    templateUrl: './ltm-alerts-detail.component.html',
    styleUrls: ['./ltm-alerts-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
        DatePickerComponent,
        UiAutoCompleteComponent
    ]
})
export class LtmAlertsDetailComponent extends BaseEntityDetailComponent<LTMAbnormalTest> {
    #actionSrv = inject(LtmCorrectionActionService);
    #userSrv  = inject(UserListService);
    #normSrv = inject(LtmNormService);

    actionLookup = new DefaultAutoCompleteModel(this.#actionSrv);
    userLookup   = new UserLookup(this.#userSrv);
    normLookup = new DefaultAutoCompleteModel(this.#normSrv);
    responsibleLookup = new UserLookup(this.#userSrv);

    constructor(
        public override entitySrv: LtmAbnormalTestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_ALERTS');
    }

    public override setupForm(e: LTMAbnormalTest): UntypedFormGroup {
        return this.formBuilder.group({
            id:               [e.id],
            matter:           [{ value: e.matter,  disabled: true }],
            test:             [{ value: e.test,    disabled: true }],
            time:             [{ value: e.time,    disabled: true }],
            value:            [{ value: e.value,   disabled: true }],
            min:              [{ value: e.min,     disabled: true }],
            max:              [{ value: e.max,     disabled: true }],
            memo:             [{ value: e.memo,    disabled: false }],
            correctionAction: [{ value: e.correctionAction, disabled: false }],
            actionNo:         [{ value: e.actionNo, disabled: false }],
            reportedBy:       [{ value: e.reportedBy, disabled: false }],
            normId:           [{ value: e.normId,  disabled: false }],
            responsibleId:    [{ value: e.responsibleId, disabled: false }],
            actionDate:       [{ value: e.actionDate, disabled: false }],
            validationDate:   [{ value: e.validationDate, disabled: false }],
            reportDate:       [{ value: e.reportDate, disabled: false }],
        })
    }

}
