import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {LoginService, MaterialModule} from '@ss/common/api-common';
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
import { CityService } from '@ss/common/api-lookup';
import {sign} from 'chart.js/helpers';

enum Panels {
    GENERAL = 0,
    DETAIL = 1,
    CONTACT = 2,
    PROGRESS = 3,
    ACTIVITY = 4,
}

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
    #loginSrv = inject(LoginService);
    #userSrv  = inject(UserListService);
    #campaignSrv = inject(CRMCampaignService);
    #citySrv =inject(CityService);
    #entitySrv = inject(CRMLeadsService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #confirmationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);
    #NOW = new Date();

    campaignLookup = new DefaultAutoCompleteModel(this.#campaignSrv);
    userLookup = new DefaultAutoCompleteModel(this.#userSrv);
    cityLookup = new DefaultAutoCompleteModel(this.#citySrv);


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
        'WEB',
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

    selectedPanel = signal<Panels>(Panels.DETAIL);

    // Add these computed signals to your CrmLeadsDetailComponent class

    isGeneral = computed(() => this.selectedPanel() === Panels.GENERAL);
    isDetail = computed(() => this.selectedPanel() === Panels.DETAIL);
    isContact = computed(() => this.selectedPanel() === Panels.CONTACT);
    isProgress = computed(() => this.selectedPanel() === Panels.PROGRESS);
    isActivity = computed(() => this.selectedPanel() === Panels.ACTIVITY);

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
            phone:             [b?.phone],
            state:             [b?.state],
            status:            [b?.status||'NEW'],
            source:            [b?.source||'WEB'],
            createdAt:         [b?.createdAt||this.#NOW, Validators.required],
            createdBy:         [b?.createdBy||this.#loginSrv.appCtx.id, Validators.required],
            updatedAt:         [b?.updatedAt||this.#NOW],
            expectedCloseDate: [b?.expectedCloseDate],
            campaignId:        [b?.campaignId],
            ownerId:           [b?.ownerId],
            priority:          [b?.priority||'LOW'],
            score:             [b?.score||0, [Validators.min(0), Validators.max(10)]],
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
            probability:       [b?.probability||0],
            isDeleted:         [false]
        });
    }

    select(idx: number) {
        this.selectedPanel.set(idx);
    }

    protected readonly Panels = Panels;
}
