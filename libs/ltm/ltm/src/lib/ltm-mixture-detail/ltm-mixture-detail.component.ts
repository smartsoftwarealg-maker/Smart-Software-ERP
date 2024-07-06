import { Component, inject, OnInit, signal } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LTMMixture} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {filter, Observable} from 'rxjs';
import { CommonModule } from "@angular/common";
import { LoginService, MaterialModule } from "@ss/common/api-common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";

import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LtmMixtureService } from "../services/ltm-mixture.service";
import { LtmMixtureDetailService } from "../services/ltm-mixture-detail.service";
import { LtmMixturePickupPointService } from '../services/ltm-mixture-pickup-point.service';

@Component({
    selector: 'ss-ltm-mixture-detail',
    templateUrl: './ltm-mixture-detail.component.html',
    styleUrls: ['./ltm-mixture-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,

        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LtmMixtureDetailComponent extends BaseEntityDetailComponent<LTMMixture> implements OnInit {
    private urls = ['m-matters', 'm-pickups'];
    private router = inject(Router);
    private loginSrv = inject(LoginService);
    private detailSrv = inject(LtmMixtureDetailService);
    private pickupPointSrv = inject(LtmMixturePickupPointService);

    selectedIndex = signal(0);

    constructor(
        public override entitySrv: LtmMixtureService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_MIXTURES');
    }

    public override setupForm(b: LTMMixture) {
        this.router.navigate([this.urls[0]], { relativeTo: this.route }).then();
        return this.formBuilder.group({
            id:            [b.id],
            centerId:      [b.centerId || this.loginSrv.appCtx.center],
            orderNo:       [b.orderNo || 1, Validators.required],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }

    override loadEntity(id: number): Observable<LTMMixture> {
        this.detailSrv.setParentId(id);
        this.pickupPointSrv.setParentId(id);
        return super.loadEntity(id);
    }


    private disableControls(url: string) {
        const enabled = url.indexOf('/detail') < 0;
        this.saveButton.visible = enabled;
        this.shellSrv.setGoBackEnabled(enabled);
    }

    onTab(idx: number) {
        if (idx !== this.selectedIndex()) {
            this.selectedIndex.set(idx);
            this.router.navigate([this.urls[idx]], { relativeTo: this.route }).then();
        }
    }
}
