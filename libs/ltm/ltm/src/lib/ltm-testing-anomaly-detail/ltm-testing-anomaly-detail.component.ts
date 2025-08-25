import { Component, inject, Inject } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

import { dateTimeToYmdStr, LoginService, MaterialModule } from '@ss/common/api-common';
import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { LtmAnomalyService } from '@ltm/ltm-api';
import { LTMTestingAnomaly } from '@ltm/ltm-api';
import { LtmTestingAnomalyService } from '@ltm/ltm-api';
import { LtmMatterService } from '@ltm/ltm-api';
import { LtmPickupPointService } from '@ltm/ltm-api';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-test-detail',
    templateUrl: './ltm-testing-anomaly-detail.component.html',
    styleUrls: ['./ltm-testing-anomaly-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    ReactiveFormsModule,
    TranslateDirective,
    DatePickerComponent,
    UiAutoCompleteComponent
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
