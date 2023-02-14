import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LTMMatter} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LtmMatterService} from '../ltm-matter.service';
import {LtmPeriodicityService} from '../ltm-periodicity.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LtmMatterTestService} from '../ltm-matter-test.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'ss-ltm-matter-detail',
    templateUrl: './ltm-matter-detail.component.html',
    styleUrls: ['./ltm-matter-detail.component.scss'],
})
export class LtmMatterDetailComponent extends BaseEntityDetailComponent<LTMMatter> {
    constructor(
        public override entitySrv: LtmMatterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private testSrv: LtmMatterTestService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_MATTERS');
    }

    public override setupForm(b: LTMMatter) {
        // Make sure to update the template if you edit the configuration here
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
}
