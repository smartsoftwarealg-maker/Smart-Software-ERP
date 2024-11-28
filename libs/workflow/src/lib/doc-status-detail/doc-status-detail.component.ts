import { Component } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {DocStatusService} from '../doc-status.service';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {DocStatus} from '../workflow-api';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';


import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RemunerationPaymonthEditorModule } from '@ss/remuneration/paymonth-editor';


import { OrgChartModule } from 'angular13-organization-chart';

@Component({
    selector: 'ss-user-message-detail',
    templateUrl: './doc-status-detail.component.html',
    styleUrls: ['./doc-status-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,


        OrgChartModule,
    ],
})
export class DocStatusDetailComponent extends BaseEntityDetailComponent<DocStatus> {
    constructor(
        private statusSrv: DocStatusService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(statusSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_USERS');
    }

    override setupForm(b: DocStatus): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            description: [b.description, Validators.required],
            msgLevel: [b.msgLevel, Validators.required],
            isFinal: [b.isFinal || false, Validators.required],
            isPostFinal: [b.isPostFinal || false, Validators.required],
        });
    }
}
