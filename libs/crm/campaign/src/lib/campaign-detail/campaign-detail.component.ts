import { Component, inject } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CompaignService } from '../compaign.service';
import { Campaign, CHANNELS, CTYPES, STATUS } from '../campaign.api';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { AgentLookupModel, AgentService } from '@ss/logistics/api-agent';
import {
    UiAutoCompleteComponent,
    UserLookup,
} from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';

@Component({
    selector: 'ss-campaign-detail',
    templateUrl: 'campaign-detail.html',
    styleUrl: 'campaign-detail.scss',
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        DatePickerComponent,
        UiAutoCompleteComponent,
    ],
})
export class CampaignDetailComponent extends BaseEntityDetailComponent<Campaign> {
    constructor(
        public override entitySrv: CompaignService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'CRM_CAMPAIGN',
        );
    }

    private userSrv = inject(UserListService);
    userLookup = new UserLookup(this.userSrv);

    public override setupForm(e: Campaign): UntypedFormGroup {
        return this.formBuilder.group({
            id: e.id,
            name: [e.name, Validators.required],
            cType: [e.cType, Validators.required],
            status: [e.status, Validators.required],
            description: [e.description],
            audienceQuery: [e.audienceQuery],
            audienceSize: [e.audienceSize],
            tag: [e.tag],
            startDate: [e.startDate, Validators.required],
            endDate: [e.endDate],
            budget: [e.budget],
            actualCost: [e.actualCost, Validators.required],
            expectedRevenue: [e.expectedRevenue],
            channels: [e.channels, Validators.required],
            emailTemplateId: [e.emailTemplateId],
            smsTemplateId: [e.smsTemplateId],
            landingPageUrl: [e.landingPageUrl],
            callScript: [e.callScript],
            ownerId: [{ value: e.ownerId || 1, disabled: true }],
            createdAt: [e.createdAt || new Date(), Validators.required],
            // createdAt: [{value:e.createdAt || new Date(), disabled:true}],
            createdBy: [{ value: e.createdBy || 1, disabled: true }],
            updatedAt: [e.updatedAt || new Date(), Validators.required],
            //updatedAt: [{value:e.updatedAt || new Date(), disabled:true}],
            updatedBy: [{ value: e.updatedBy || 1, disabled: true }],
        });
    }

    protected readonly CTYPES = CTYPES;
    protected readonly STATUS = STATUS;
    protected readonly CHANNELS = CHANNELS;
}
