import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LTMTest} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LtmTestService} from '../services/ltm-test.service';

@Component({
    selector: 'ss-ltm-test-detail',
    templateUrl: './ltm-test-detail.component.html',
    styleUrls: ['../ltm-periodicities-detail/ltm-periodicities-detail.component.scss'],
})
export class LtmTestDetailComponent extends BaseEntityDetailComponent<LTMTest> {
    constructor(
        public override entitySrv: LtmTestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_TESTS');
    }


    public override setupForm(b: LTMTest) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:            [b.id],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
            variable:      [b.variable, [Validators.required, Validators.min(3), Validators.max(4)]],
            formula:       [b.formula],
            showGraph:     [b.showGraph]
        });
    }
}
