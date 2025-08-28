import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {DocStatus, UserMessage} from '../workflow-api';
import {DocStatusService} from '../doc-status.service';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {UserMessageService} from '../user-message.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent, UserLookup } from '@ss/common/ui-auto-complete';
import {UserListService} from '@ss/common/api-users';

import { MaterialModule } from '@ss/common/api-common';





import { OrgChartModule } from 'angular13-organization-chart';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-user-message-detail',
    templateUrl: './user-message-detail.component.html',
    styleUrls: ['./user-message-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    OrgChartModule,
    UiAutoCompleteComponent
]
})
export class UserMessageDetailComponent extends BaseEntityDetailComponent<UserMessage> {
    private messageSrv =  inject(DocStatusService);
    private usersSrv = inject(UserListService);

    userLookup = new UserLookup(this.usersSrv);
    messageLookup = new DefaultAutoCompleteModel<DocStatus>(this.messageSrv);

    constructor(
        public override entitySrv: UserMessageService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_USER_MESSAGES');
    }

    override setupForm(b: UserMessage): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            messageId: [b.messageId, Validators.required],
            userId: [ { value: b.userId, disabled: b.id > 0}, Validators.required],
            amount: [b.amount || 0, Validators.required],
        });
    }

    override readForm(): UserMessage {
        const value = this.form.getRawValue();
        this.entitySrv.setParentId(value.userId);
        return value;
    }
}
