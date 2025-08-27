import { Component, inject, OnInit } from '@angular/core';
import {MaterialModule} from '@ss/common/api-common';
import { CRMLeadsService } from '../crm-lead.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { CRMLead } from '../lead-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {CRMCampaignService} from '../crm-comaign.service';
import {DefaultAutoCompleteModel, UiAutoCompleteComponent} from '@ss/common/ui-auto-complete';
import {UserListService} from '@ss/common/api-users';

@Component({
    selector: 'ss-crm-leads-component',
    imports: [
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        DatePickerComponent,
        UiAutoCompleteComponent,
    ],
    templateUrl: './crm-leads-detail-component.html',
    styleUrl: './crm-leads-detail-component.scss',
    standalone: true,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
})
export class CrmLeadsDetailComponent implements OnInit {
    #userSrv  = inject(UserListService);
    #campaignSrv = inject(CRMCampaignService);
    #entitySrv = inject(CRMLeadsService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #confirmationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);

    campaignLookup = new DefaultAutoCompleteModel(this.#campaignSrv);
    userLookup = new DefaultAutoCompleteModel(this.#userSrv);

    formBuilder = inject(FormBuilder);

    public STATES = [
        'NEW',
        'CONTACTED',
        'QUALIFIED',
        'PROPOSAL_SENT',
        'IN_PROGRESS',
        'PROPOSAL_SENT',
        'NEGOTIATION',
        'CLOSED_WON',
        'CLOSED_LOST',
        'UNQUALIFIED',
    ];

    public STATUS = [
        'WEB',
        'CONTACTED',
        'QUALIFIED',
        'PROPOSAL_SENT',
        'NEGOTIATION',
        'CLOSED_WON',
        'CLOSED_LOST',
    ];

    public SOURCE = [
        'NEW',
        'REFERRAL',
        'EVENT',
        'CAMPAIGN',
        'SOCIAL',
        'PARTNER',
    ];

    public PRIORITIES = [
        'LOW',
        'MEDIUM',
        'HIGH',
        'CRITICAL',
    ];

    public form: UntypedFormGroup | null = null;

    // form = this.formBuilder.group({
    //     id: [0],
    //     firstName: [''],
    //     lastName: [''],
    //     email: [''],
    //     phone: [''],
    //     status: [''],
    //     createdAt: [new Date()],
    //     createdBy: [this.#loginSrv.appCtx.agentId || 0],
    //     username: ['s'],
    // });

    ngOnInit(): void {
        const id = +this.#route.snapshot.paramMap.get('id');
        this.#shellSrv.setTitle('CRM_LEADS');
        this.#entitySrv.get(id).subscribe({
            next: (crmLead) => {
                this.form = this.setupForm(crmLead);
            },
        });
    }

    list() {
        this.#router.navigate(['..'], { relativeTo: this.#route }).then();
    }

    save() {
        this.#entitySrv.save(this.form.getRawValue() as CRMLead).subscribe({
            next: () => {
                this.form.markAsUntouched();
                // this.#router
                //     .navigate(['../'], { relativeTo: this.#route })
                //     .then();
                this.#snackBarSrv.showSuccessMessage();
            },
            error: () => {
                this.#snackBarSrv.showFailureMessage();
            },
        });
    }

    // cancel() {
    //     this.#router.navigate(['../'], { relativeTo: this.#route }).then();
    // }

    canDeactivate(): Observable<boolean> {
        if (this.form?.touched && this.form?.dirty) {
            return this.#confirmationSrv.confirmDontSave();
        }
        return of(true);
    }

    private setupForm(b: CRMLead) {
        return this.formBuilder.group({
            id:                [b?.id || 0, Validators.required],
            description:       [b?.description, Validators.required],
            detail:            [b?.detail, Validators.required],
            email:             [b?.email],
            phone:             [b?.phone, Validators.required],
            state:             [b?.state],
            status:            [b?.status, Validators.required],
            source:            [b?.source],
            createdAt:         [b?.createdAt, Validators.required],
            createdBy:         [b?.createdBy, Validators.required],
            expectedCloseDate: [b?.expectedCloseDate],
            campaignId:        [b?.campaignId],
            ownerId:           [b?.ownerId],
            priority:          [b?.priority],
            score:             [b?.score, [Validators.min(0), Validators.max(10)]],
            company:           [b?.company],
            companySite:       [b?.companySite],
            companyIndustry:   [b?.companyIndustry],
            annualRevenue:     [b?.annualRevenue, Validators.min(0)],
            numberOfEmployees: [b?.numberOfEmployees, Validators.min(0)],
            lastName:          [b?.lastName],
            firstName:         [b?.firstName],
            jobTitle:          [b?.jobTitle],
            addressLine1:      [b?.addressLine1],
            addressLine2:      [b?.addressLine2],
            city:              [b?.city],
            postalCode:        [b?.postalCode],
        });
    }
}
