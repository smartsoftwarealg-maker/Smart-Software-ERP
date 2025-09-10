import { Component, inject, OnInit } from '@angular/core';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import {
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
} from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CRMOpportunityActivity } from '../api';
import { CrmOpportunityActiveService } from '../crm-opportunity-active.service';
import {ACTIVITY_TYPE, PRIORITY, STATUS} from '../../crm-opportunity-api';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MaterialModule, UserService } from '@ss/common/api-common';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import {UserListService} from "@ss/common/api-users";
import {CrmTeamsService} from "@ss/crm/crm-teams";

@Component({
    selector: 'ss-crm-contact-line-detail',
    templateUrl: './crm-opportunity-activities-detail.component.html',
    styleUrl: './crm-opportunity-activities-detail.component.scss',
    imports: [
        TranslatePipe,
        MatFormField,
        MatSelect,
        ReactiveFormsModule,
        MatLabel,
        MatInput,
        MatOption,
        TranslateDirective,
        MatButton,
        MatError,
        DatePickerComponent,
        MaterialModule,
        UiAutoCompleteComponent,
    ],
    standalone: true,
})
export class CrmOpportunityActivitiesDetailComponent
    extends BaseChildEntityDetailComponent<CRMOpportunityActivity>
    implements OnInit
{
    private formBuilder = inject(UntypedFormBuilder);
    private userSrv = inject(UserListService);
    private teamSrv = inject(CrmTeamsService);
    userLookup = new DefaultAutoCompleteModel(this.userSrv);

    teamLookup = new DefaultAutoCompleteModel(this.teamSrv);


    constructor(protected detailSrv: CrmOpportunityActiveService) {
        super(detailSrv, 'CRMOpportunityActiveLineDetail');
    }

    override setupForm(a: CRMOpportunityActivity) {
        return this.formBuilder.group({
            id: [a?.id || 0],
            parentId: [a?.parentId || this.detailSrv.getParentId],
            activityType: [a?.activityType || '', Validators.required],
            subject: [a?.subject || '', Validators.required],
            detail: [a?.detail],
            dueDate: [a?.dueDate],
            priority: [a?.priority, Validators.required],
            duration: [a?.duration || '', Validators.required],
            status: [a?.status, Validators.required],
            completionDate: [a?.completionDate || new Date()],
            feedback: [a?.feedback],
            ownerId: [a?.ownerId, Validators.required],
            teamId: [a?.teamId],
            createdAt: [a?.createdAt || new Date()],
            createdBy: [a?.createdBy || this.loginSrv.appCtx.id],
        });
    }

    protected readonly ACTIVITY_TYPE = ACTIVITY_TYPE;
    protected readonly STATUS = STATUS;
    protected readonly PRIORITY = PRIORITY;
}
