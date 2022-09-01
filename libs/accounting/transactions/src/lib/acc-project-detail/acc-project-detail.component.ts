import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Lookup, Mark, MarkService} from '@ss/common/api-lookup';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AccProjectService} from '@ss/accounting/accounting-api';

@Component({
  selector: 'ss-acc-project-detail',
  templateUrl: './acc-project-detail.component.html',
  styleUrls: ['./acc-project-detail.component.scss']
})
export class AccProjectDetailComponent extends BaseEntityDetailComponent<Lookup> {

    constructor(
        public markSrv: AccProjectService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder) {
        super(markSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ACC_PROJECTS');
    }

    public setupForm(e: Mark): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
