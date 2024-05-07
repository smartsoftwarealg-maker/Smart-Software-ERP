import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder } from "@angular/forms";
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { LTMLineMatter, LTMMatter } from '../ltm-api';
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
import { LtmProductService } from '../services/ltm-product.service';
import { LtmEquipmentService } from '../services/ltm-equipment.service';
import { LtmMatterTestService } from '../services/ltm-matter-test.service';
import { filter, Observable } from 'rxjs';

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
    private testSrv =  inject(LtmMatterTestService);
    private router = inject(Router);

    private loginSrv = inject(LoginService);
    private matterSrv = inject(LtmMatterService);
    private productSrv = inject(LtmProductService);
    private equipmentSrv = inject(LtmEquipmentService);

    equipmentLookup = new DefaultAutoCompleteModel(this.equipmentSrv);
    productLookup = new DefaultAutoCompleteModel(this.productSrv);

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
        this.testSrv.setParentId(b.matterId||0);
        return this.formBuilder.group({
            id:            [b.id],
            centerId:      [b.centerId || this.loginSrv.appCtx.center],
            matterId:      [b.matterId],
            product:       [b.product],
            equipment:     [b.equipment]
        });
    }


    override ngOnInit() {
        super.ngOnInit();
        const sub = this.router.events.pipe(
            filter((e: any): e is RouterEvent => e instanceof RouterEvent)
        ).subscribe((e: RouterEvent) => {
            if (e instanceof NavigationEnd) {
                this.disableControls(e.url);
            }
        });
        this.subscriptions.push(sub);
        this.disableControls(this.router.url);
        this.entitySrv.editable = this.isEditable;
    }

    private disableControls(url: string) {
        const enabled = url.indexOf('/detail') < 0;
        this.saveButton.visible = enabled;
        this.shellSrv.setGoBackEnabled(enabled);
    }
}
