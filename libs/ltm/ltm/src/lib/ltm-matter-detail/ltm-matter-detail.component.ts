import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LTMMatter} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {LtmMatterService} from '../services/ltm-matter.service';
import {LtmMatterTestService} from '../services/ltm-matter-test.service';
import {filter, Observable} from 'rxjs';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LtmProductService } from '../services/ltm-product.service';
import { LtmEquipmentService } from '../services/ltm-equipment.service';

@Component({
    selector: 'ss-ltm-matter-detail',
    templateUrl: './ltm-matter-detail.component.html',
    styleUrls: ['./ltm-matter-detail.component.scss'],
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
export class LtmMatterDetailComponent extends BaseEntityDetailComponent<LTMMatter> implements OnInit {
    constructor(
        public override entitySrv: LtmMatterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private router: Router,
        private testSrv: LtmMatterTestService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_MATTERS');
    }

    public override setupForm(b: LTMMatter) {

        return this.formBuilder.group({
            id:            [b.id],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }

    override loadEntity(id: number): Observable<LTMMatter> {
        this.testSrv.setParentId(id);
        return super.loadEntity(id);
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
