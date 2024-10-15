import { Component, inject, Inject } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonModule } from "@angular/common";
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";


import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LtmAnomalyService } from "../services/ltm-anomaly.service";
import { LTMAnomaly } from '../ltm-api';

@Component({
    selector: 'ss-ltm-anomaly-detail',
    templateUrl: './ltm-anomaly-detail.component.html',
    styleUrls: ['./ltm-anomaly-detail.component.scss'],
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
    ],
})
export class LtmAnomalyDetailComponent extends BaseEntityDetailComponent<LTMAnomaly> {
    #loginSrv = inject(LoginService);


    constructor(
        public override entitySrv: LtmAnomalyService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_ANOMALIES');
    }

    public override setupForm(b: LTMAnomaly) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:            [b.id],
            centerId:      [b.centerId || this.#loginSrv.appCtx.center],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }
}
