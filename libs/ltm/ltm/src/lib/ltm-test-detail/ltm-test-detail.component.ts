import { Component, inject, Inject } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LTMTest} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {LtmTestService} from '../services/ltm-test.service';
import { LtmTestTypeService } from "../services/ltm-test-type.service";
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import { Lookup, UnitService } from '@ss/common/api-lookup';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { AppArchiveModule } from "@ss/common/app-archive";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";

@Component({
    selector: 'ss-ltm-test-detail',
    templateUrl: './ltm-test-detail.component.html',
    styleUrls: ['../ltm-periodicities-detail/ltm-periodicities-detail.component.scss'],
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
export class LtmTestDetailComponent extends BaseEntityDetailComponent<LTMTest> {
    private typeSrv = inject(LtmTestTypeService);
    private unitSrv = inject(UnitService);

    typeLookup = new DefaultAutoCompleteModel<Lookup>(this.typeSrv);
    unitLookup = new DefaultAutoCompleteModel<Lookup>(this.unitSrv);


    constructor(
        public override entitySrv: LtmTestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_TEST_TYPES');
    }

    public override setupForm(b: LTMTest) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:            [b.id],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
            variable:      [b.variable, [Validators.required, Validators.min(3), Validators.max(4)]],
            formula:       [b.formula],
            showGraph:     [b.showGraph],
            showKPI:       [b.showKPI],
            unit:          [b.unit],
            min:           [b.min],
            max:           [b.max],
            testType:      [b.testType]
        });
    }
}
