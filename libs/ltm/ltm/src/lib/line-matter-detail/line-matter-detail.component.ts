import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from "@angular/forms";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { LTMLineMatter } from '../ltm-api';
import {LtmLineMatterService} from '../services/ltm-line-matter.service';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { LoginService, MaterialModule } from "@ss/common/api-common";
import { LtmMatterService } from '../services/ltm-matter.service';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CommonUiHourPickerModule } from '@ss/common/ui-hour-picker';

@Component({
    selector: 'ss-line-matter-detail',
    templateUrl: './line-matter-detail.component.html',
    styleUrls: ['./line-matter-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        LogisticsUiDocInfoModule,
        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LineMatterDetailComponent extends BaseEntityDetailComponent<LTMLineMatter> {
    private loginSrv = inject(LoginService);
    private matterSrv = inject(LtmMatterService);

    matterLookup = new DefaultAutoCompleteModel(this.matterSrv);
    constructor(
        public override entitySrv: LtmLineMatterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_LINE_MATTERS');
    }


    public override setupForm(b: LTMLineMatter) {
        return this.formBuilder.group({
            id:            [b.id],
            centerId:      [b.centerId || this.loginSrv.appCtx.center],
            matterId:      [b.matterId],
        });
    }
}
