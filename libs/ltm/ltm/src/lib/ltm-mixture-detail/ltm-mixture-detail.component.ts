import { Component, inject, OnInit } from "@angular/core";
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
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LtmMixtureService } from "../services/ltm-mixture.service";
import { LtmMixtureDetailService } from "../services/ltm-mixture-detail.service";

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
        LogisticsUiDocInfoModule,
        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LtmMixtureDetailComponent extends BaseEntityDetailComponent<LTMMixture> implements OnInit {
    private loginSrv = inject(LoginService);
    private detailSrv = inject(LtmMixtureDetailService);

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

        return this.formBuilder.group({
            id:            [b.id],
            lineId:        [b.lineId || this.loginSrv.appCtx.center],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }

    override loadEntity(id: number): Observable<LTMMixture> {
        this.detailSrv.setParentId(id);
        return super.loadEntity(id);
    }

    // override ngOnInit() {
    //     super.ngOnInit();
    //     const sub = this.router.events.pipe(
    //         filter((e: any): e is RouterEvent => e instanceof RouterEvent)
    //     ).subscribe((e: RouterEvent) => {
    //         if (e instanceof NavigationEnd) {
    //             this.disableControls(e.url);
    //         }
    //     });
    //     this.subscriptions.push(sub);
    //     this.disableControls(this.router.url);
    // }

    private disableControls(url: string) {
        const enabled = url.indexOf('/detail') < 0;
        this.saveButton.visible = enabled;
        this.shellSrv.setGoBackEnabled(enabled);
    }
}
