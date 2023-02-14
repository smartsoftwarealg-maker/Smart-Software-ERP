import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Lookup, Mark, MarkService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {LtmPeriodicityService} from '../ltm-periodicity.service';

@Component({
    selector: 'ss-ltm-periodicities-detail',
    templateUrl: './ltm-periodicities-detail.component.html',
    styleUrls: ['./ltm-periodicities-detail.component.scss'],
})
export class LtmPeriodicitiesDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        public override entitySrv: LtmPeriodicityService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_PERIODICITIES');
    }

    public override setupForm(e: Mark): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required],
            descriptionAr: [e.descriptionAr]
        });
    }
}
