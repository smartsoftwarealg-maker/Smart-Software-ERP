import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {UserDocument} from '../workflow-api';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel, UserLookup } from '@ss/common/ui-auto-complete';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {UserListService} from '@ss/common/api-users';
import {UserDocumentService} from '../user-document.service';
import {DefinitionLookupService} from '@ss/logistics/document-numbering';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { RemunerationPaymonthEditorModule } from '@ss/remuneration/paymonth-editor';
import { CommonPayrollModule } from '@ss/payroll-common';

import { OrgChartModule } from 'angular13-organization-chart';

@Component({
    selector: 'ss-user-document-detail',
    templateUrl: './user-document-detail.component.html',
    styleUrls: ['./user-document-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        UiPaginationModule,
        CommonUiLangModule,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,
        CommonPayrollModule,

        OrgChartModule,
    ],
})
export class UserDocumentDetailComponent extends BaseEntityDetailComponent<UserDocument> {
    private usersSrv =  inject(UserListService);
    private definitionSrv =  inject(DefinitionLookupService);

    userLookup = new UserLookup(this.usersSrv);
    documentLookup = new DefaultAutoCompleteModel(this.definitionSrv);

    constructor(
        public override entitySrv: UserDocumentService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_USER_DOCUMENTS');
    }

    override setupForm(b: UserDocument): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            documentId: [b.documentId, Validators.required],
            userId: [{value: b.userId, disabled: b.id > 0}, Validators.required],
        });
    }

    override readForm(): UserDocument {
        const value = this.form.getRawValue();
        this.entitySrv.setParentId(value.userId);
        return value;
    }
}
