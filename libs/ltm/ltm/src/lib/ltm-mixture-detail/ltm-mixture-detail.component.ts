import { Component, inject, OnInit, signal } from '@angular/core';
import { BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { LTMMixture} from '@ltm/ltm-api';
import { ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { Observable} from 'rxjs';
import { CommonModule } from "@angular/common";
import { LoginService, MaterialModule } from "@ss/common/api-common";




import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LtmMixtureService } from '@ltm/ltm-api';
import { LtmMixtureDetailService } from '@ltm/ltm-api';
import { LtmMixturePickupPointService } from '@ltm/ltm-api';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-mixture-detail',
    templateUrl: './ltm-mixture-detail.component.html',
    styleUrls: ['./ltm-mixture-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule,
        TranslateDirective
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
