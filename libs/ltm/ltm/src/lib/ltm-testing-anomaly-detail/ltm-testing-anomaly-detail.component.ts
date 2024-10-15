import { Component, inject, Inject } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { CommonModule } from "@angular/common";
import { dateTimeToYmdStr, LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";


import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LtmAnomalyService } from "../services/ltm-anomaly.service";
import { LTMTestingAnomaly } from "../ltm-api";
import { LtmTestingAnomalyService } from "../services/ltm-testing-anomaly.service";
import { LtmMatterService } from "../services/ltm-matter.service";
import { LtmPickupPointService } from '../services/ltm-pickup-point.service';

@Component({
    selector: 'ss-ltm-test-detail',
    templateUrl: './ltm-testing-anomaly-detail.component.html',
    styleUrls: ['./ltm-testing-anomaly-detail.component.scss'],
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
export class LtmTestingAnomalyDetailComponent extends BaseEntityDetailComponent<LTMTestingAnomaly> {
    #pickupPointSrv = inject(LtmPickupPointService);
    private loginSrv = inject(LoginService);
    private anomalySrv = inject(LtmAnomalyService);
    private matterSrv = inject(LtmMatterService);

    anomalyLookup = new DefaultAutoCompleteModel(this.anomalySrv);
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv);
    pickupPointLookup = new DefaultAutoCompleteModel(this.#pickupPointSrv)

    constructor(
        public override entitySrv: LtmTestingAnomalyService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_TESTING_ANOMALIES');
    }

    public override setupForm(b: LTMTestingAnomaly) {
        return this.formBuilder.group({
            id:          [b.id],
            centerId:    [b.centerId || this.loginSrv.appCtx.center],
            memo:        [b.memo],
            date:        [b.date || new Date(), Validators.required],
            userId:      [b.userId || this.loginSrv.appCtx.id],
            matterId:    [b.matterId],
            anomalyId:   [b.anomalyId],
            pickupPoint: [b.pickupPoint],
        });
    }

    override readForm(): LTMTestingAnomaly {
        const value = this.form.getRawValue();
        value.date = dateTimeToYmdStr(value.date);
        return value;
    }
}
