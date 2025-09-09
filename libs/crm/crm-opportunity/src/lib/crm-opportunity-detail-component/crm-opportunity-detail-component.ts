import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { CRMOpportunityService } from '../crm-opportunity.service';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {
    ACTIVITY_TYPE,
    CRMContactLookup,
    CRMOpportunity,
    CRMOpportunityProgress,
    PRIORITY,
    STAGE,
    STATUS,
} from '../crm-opportunity-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CRMCampaignService } from '../crm-comaign.service';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import { CityService } from '@ss/common/api-lookup';
import { AgentService } from '@ss/logistics/api-agent';
import { CrmContactService } from '@ss/crm/crm-customer';
import { CompanyService } from '@ss/administration/api-company';
import { CrmTeamsService } from '@ss/crm/crm-teams';
import { CRMLeadsService } from '@ss/crm/leads';
import {CrmOpportunityActiveService} from "../crm-opportunity-activities/crm-opportunity-active.service";

enum Panels {
    GENERAL = 0,
    DETAIL = 1,
    STATUS = 2,
    ACTIVITY = 3,
    PROGRESS = 4,
}

@Component({
    selector: 'ss-crm-opportunity-component',
    imports: [
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        DatePickerComponent,
        UiAutoCompleteComponent,
        RouterOutlet,
    ],
    templateUrl: './crm-opportunity-detail-component.html',
    styleUrl: './crm-opportunity-detail-component.scss',
    standalone: true,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
})
export class CrmOpportunityDetailComponent implements OnInit {
    #userSrv = inject(UserListService);
    #campaignSrv = inject(CRMCampaignService);
    #citySrv = inject(CityService);
    #entitySrv = inject(CRMOpportunityService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #confirmationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);
    #agentSrv = inject(AgentService);
    #contactSrv = inject(CrmContactService);
    #companySrv = inject(CompanyService);
    #teamSrv = inject(CrmTeamsService);
    #leadSrv = inject(CRMLeadsService);
    #loginSrv = inject(LoginService);
    #opportunityActiveSrv = inject(CrmOpportunityActiveService);

    campaignLookup = new DefaultAutoCompleteModel(this.#campaignSrv);
    userLookup = new DefaultAutoCompleteModel(this.#userSrv);
    teamLookup = new DefaultAutoCompleteModel(this.#teamSrv);
    cityLookup = new DefaultAutoCompleteModel(this.#citySrv);
    agentLookup = new DefaultAutoCompleteModel(this.#agentSrv);
    contactLookup = new CRMContactLookup(this.#contactSrv);
    companyLookup = new DefaultAutoCompleteModel(this.#companySrv);
    leadLookup = new DefaultAutoCompleteModel(this.#leadSrv);

    public id = 0;

    formBuilder = inject(FormBuilder);

    selectedPanel = signal<Panels>(Panels.DETAIL);

    // Add these computed signals to your CrmLeadsDetailComponent class

    // isGeneral = computed(() => this.selectedPanel() === Panels.GENERAL);
    isDetail = computed(() => this.selectedPanel() === Panels.DETAIL);
    isStatus = computed(() => this.selectedPanel() === Panels.STATUS);
    isProgress = computed(() => this.selectedPanel() === Panels.PROGRESS);
    isActivity = computed(() => this.selectedPanel() === Panels.ACTIVITY);

    public form: UntypedFormGroup | null = null;

    ngOnInit(): void {
        const id = +this.#route.snapshot.paramMap.get('id');
        this.#shellSrv.setTitle('CRM_OPPORTUNITY');
        this.#entitySrv.get(id).subscribe({
            next: (crmOpportunity) => {
                this.form = this.setupForm(crmOpportunity);
            },
        });
    }

    list() {
        this.#router.navigate(['..'], { relativeTo: this.#route }).then();
    }

    save() {
        let opportunity: CRMOpportunity = this.form?.getRawValue();
        delete opportunity.status;
        delete opportunity.stage;
        delete opportunity.probability;
        delete opportunity.priority;
        delete opportunity.ownerId;
        delete opportunity.teamId;
        delete opportunity.createdDate;
        delete opportunity.createdBy;
        delete opportunity.memo;
        this.#entitySrv
            .save(this.form.getRawValue() as CRMOpportunity)
            .subscribe({
                next: () => {
                    this.form.markAsUntouched();
                    this.#snackBarSrv.showSuccessMessage();
                },
                error: () => {
                    this.#snackBarSrv.showFailureMessage();
                },
            });
    }

    canDeactivate(): Observable<boolean> {
        if (this.form?.touched && this.form?.dirty) {
            return this.#confirmationSrv.confirmDontSave();
        }
        return of(true);
    }

    private setupForm(b: CRMOpportunity) {
        this.#opportunityActiveSrv.setParentId(b?.id);
        this.id = b?.id;
        this.#contactSrv.setParentId(b?.id || 0);
        return this.formBuilder.group({
            id: [b?.id || 0, Validators.required],
            name: [b?.name, Validators.required],
            ownerId: [b?.ownerId || this.#loginSrv.appCtx.id],
            companyId: [b?.companyId || this.#loginSrv.appCtx.company],
            contactEmail: [b?.contactEmail || ''],
            contactPhone: [b?.contactPhone || ''],
            teamId: [b?.teamId],
            partnerId: [b?.partnerId],
            primaryContactId: [b?.primaryContactId],
            amount: [b?.amount, Validators.required],
            currency: [b?.currency || 0, Validators.required],
            expectedRevenue: [b?.expectedRevenue],
            budgetAllocated: [b?.budgetAllocated],
            discountAmount: [b?.discountAmount || 0],
            discountPercentage: [b?.discountPercentage || 0],
            stage: [b?.stage || 'PROPOSAL_SENT', Validators.required],
            status: [b?.status || 'OPEN', Validators.required],
            priority: [b?.priority || 'MEDIUM', Validators.required],
            probability: [b?.probability],
            closeDate: [b?.closeDate || new Date(), Validators.required],
            actualCloseDate: [b?.actualCloseDate],
            lastStageChangeDate: [b?.lastStageChangeDate],
            createdDate: [b?.createdDate || new Date()],
            lastModifiedDate: [b?.lastModifiedDate || new Date()],
            campaignId: [b?.campaignId],
            leadSource: [b?.leadSource],
            //competitors: [b?.competitors],
            competitiveThreatLevel: [b?.competitiveThreatLevel],
            description: [b?.description],
            tags: [b?.tags],
            memo: [b?.memo],
            createdBy: [b?.createdBy || this.#loginSrv.appCtx.id],
            lastModifiedBy: [b?.lastModifiedBy || this.#loginSrv.appCtx.id],
            closedBy: [{ value: b?.closedBy, disabled: true }],
        });
    }

    select(idx: number) {
        this.selectedPanel.set(idx);
    }

    saveStatus() {
        this.saveProgress();
    }

    saveProgress() {
        const form: CRMOpportunity = this.form?.getRawValue();
        const val: CRMOpportunityProgress = {
            id: form.id,
            status: form.status,
            stage: form.stage,
            probability: form.probability,
            priority: form.priority,
            ownerId: form.ownerId,
            teamId: form.teamId,
            createdAt: form.createdDate,
            amount: form.amount,
            closedBy: form.closedBy,
            createdBy: form.createdBy,
            memo: form.memo,
        };
        this.#entitySrv.saveProgress(val).subscribe({
            next: () => {
                this.#snackBarSrv.showSuccessMessage();
            },
            error: (e) => {
                this.#snackBarSrv.showFailureMessage();
                throw e;
            },
        });
    }

    protected readonly Panels = Panels;
    protected readonly STAGE = STAGE;
    protected readonly STATUS = STATUS;
    protected readonly PRIORITY = PRIORITY;
    protected readonly ACTIVITY_TYPE = ACTIVITY_TYPE;
}
