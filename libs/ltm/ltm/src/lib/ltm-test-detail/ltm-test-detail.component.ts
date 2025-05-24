import { Component, inject, Inject } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LTMTest} from '@ltm/ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {LtmTestService} from '@ltm/ltm-api';
import { LtmTestTypeService } from '@ltm/ltm-api';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { Lookup, UnitService } from '@ss/common/api-lookup';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-test-detail',
    templateUrl: './ltm-test-detail.component.html',
    styleUrls: ['./ltm-test-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        TranslateDirective,
        UiAutoCompleteComponent
    ]
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
            id:                [b.id],
            description:       [b.description, Validators.required],
            descriptionAr:     [b.descriptionAr],
            variable:          [b.variable, [Validators.required, Validators.min(3), Validators.max(4)]],
            chemicalFormula:   [b.chemicalFormula],
            formula:           [b.formula],
            showGraph:         [b.showGraph],
            showKPI:           [b.showKPI],
            isSimulated:       [b.isSimulated],
            showInCertificate: [b.showInCertificate || false],
            unit:              [b.unit],
            min:               [b.min],
            max:               [b.max],
            testType:          [b.testType],
            varianceControl:   [b.varianceControl || false]
        });
    }
}
