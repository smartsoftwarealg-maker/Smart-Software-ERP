import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { MaterialModule, UserService } from '@ss/common/api-common';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';


import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel, UserLookup } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiHourPickerModule } from '@ss/common/ui-hour-picker';
import { LTMAbnormalTest } from '../ltm-api';
import { LtmAbnormalTestService } from '@ss/ltm/ltm';
import { LtmCorrectionActionService } from '../services/ltm-correction-action.service';
import { UserListService } from '@ss/common/api-users';

@Component({
    selector: 'ss-ltm-alerts-detail',
    templateUrl: './ltm-alerts-detail.component.html',
    styleUrls: ['./ltm-alerts-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,


        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ]
})
export class LtmAlertsDetailComponent extends BaseEntityDetailComponent<LTMAbnormalTest> {
    #actionSrv = inject(LtmCorrectionActionService);
    #userSrv  = inject(UserListService);

    actionLookup = new DefaultAutoCompleteModel(this.#actionSrv);
    userLookup   = new UserLookup(this.#userSrv);

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
            reportedBy:       [{ value: e.reportedBy, disabled: false }]
        })
    }

}
