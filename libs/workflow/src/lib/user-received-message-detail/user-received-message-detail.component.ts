import { Component, inject } from "@angular/core";
import { BaseEntityDetailComponent } from "@ss/common/ui-base-entity";
import { DocStatus, UserMessage } from "../workflow-api";
import { DocStatusService } from "../doc-status.service";
import { UserListService } from "@ss/common/api-users";
import { DefaultAutoCompleteModel, UserLookup } from "@ss/common/ui-auto-complete";
import { UserMessageService } from "../user-message.service";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LookupsService } from "@ss/common/api-lookup";
import { UserReceivedMessageService } from "../user-received-message.service";

@Component({
    selector: 'ss-user-received-message-detail',
    templateUrl: '../user-message-detail/user-message-detail.component.html',
    styleUrls: ['../user-message-detail/user-message-detail.component.scss'],
})
export class UserReceivedMessageDetailComponent  extends BaseEntityDetailComponent<UserMessage> {
    private messageSrv =  inject(DocStatusService);
    private usersSrv = inject(UserListService);

    userLookup = new UserLookup(this.usersSrv);
    messageLookup = new DefaultAutoCompleteModel<DocStatus>(this.messageSrv);

    constructor(
        public override entitySrv: UserReceivedMessageService,
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

