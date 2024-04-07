import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";
import { LTMSiloService } from '../services/ltm-silo.service';
import { Lookup } from '@ss/common/api-lookup';

@Component({
    selector: 'ss-ltm-silos-detail',
    templateUrl: './ltm-silo-detail.component.html',
    styleUrls: ['./ltm-silo-detail.component.scss'],
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
export class LtmSiloDetailComponent extends BaseEntityDetailComponent<Lookup> implements OnInit {
    constructor(
        public override entitySrv: LTMSiloService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private router: Router) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_SILOS');
    }

    public override setupForm(b: Lookup) {

        return this.formBuilder.group({
            id:            [b.id],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }

}
