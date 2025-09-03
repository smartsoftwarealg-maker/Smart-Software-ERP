import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MaterialModule } from '@ss/common/api-common';
import { CRMOpportunityService } from '../crm-opportunity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { CRMOpportunity } from '../crm-opportunity-api';
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
import {ContactMethodsService} from "../../../../contact-methods/src/lib/contact-methods/contact-methods.service";

enum Panels {
    GENERAL = 0,
    DETAIL = 1,
    ACTIVITY = 2,
    PROGRESS = 3,
}

@Component({
    selector: 'ss-crm-opportunity-component',
    imports: [
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        DatePickerComponent,
        UiAutoCompleteComponent,
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
    #contactSrv = inject(ContactMethodsService);

    campaignLookup = new DefaultAutoCompleteModel(this.#campaignSrv);
    userLookup = new DefaultAutoCompleteModel(this.#userSrv);
    cityLookup = new DefaultAutoCompleteModel(this.#citySrv);
    agentLookup = new DefaultAutoCompleteModel(this.#agentSrv);
    contactLookup = new DefaultAutoCompleteModel(this.#contactSrv);

    formBuilder = inject(FormBuilder);

    selectedPanel = signal<Panels>(Panels.DETAIL);

    // Add these computed signals to your CrmLeadsDetailComponent class

    isGeneral = computed(() => this.selectedPanel() === Panels.GENERAL);
    isDetail = computed(() => this.selectedPanel() === Panels.DETAIL);
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
        return this.formBuilder.group({
            id: [b?.id || 0, Validators.required],
            name: [b?.name, Validators.required],
            ownerId: [b?.ownerId , Validators.required],
            partnerId: [b?.partnerId || 0],
            primaryContactId: [b?.primaryContactId, Validators.required],
            description: [b?.description],
            amount: [b?.amount],
            currency: [b?.currency],
            expectedRevenue: [b?.expectedRevenue],
            budgetAllocated: [b?.budgetAllocated],
            discountAmount: [b?.discountAmount],
            discountPercentage: [b?.discountPercentage],
            closeDate: [b?.closeDate],
            actualCloseDate: [b?.actualCloseDate],
            lastStageChangeDate: [b?.lastStageChangeDate],
            createdDate: [b?.createdDate || new Date()],
            lastModifiedDate: [b?.lastModifiedDate || new Date()],
            campaignId: [b?.campaignId],
            leadSource: [b?.leadSource],
            competitiveThreatLevel: [b?.competitiveThreatLevel],
            tags: [b?.tags],
            createdBy: [b?.createdBy],
            lastModifiedBy: [b?.lastModifiedBy],
            stage: [b?.stage],
            probability: [b?.probability || 0],
        });
    }

    select(idx: number) {
        this.selectedPanel.set(idx);
    }

    protected readonly Panels = Panels;
}
