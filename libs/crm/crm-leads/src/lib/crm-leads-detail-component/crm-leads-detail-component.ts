import {
  Component,
  computed,
  inject,
  Input,
  OnInit,
  signal,
  input
} from '@angular/core';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { CRMLeadsService } from '../crm-lead.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {CRMLead, CRMLeadProgress} from '../lead-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CRMCampaignService } from '../crm-comaign.service';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import { CityService } from '@ss/common/api-lookup';
import { CrmLeadsActivityListComponent } from '../crm-leads-activity-list/crm-leads-activity-list.component';
import { CrmLeadsActivityLinesDetailComponent } from '../crm-leads-activity-lines-detail/crm-leads-activity-lines-detail.component';
import { CrmLeadActivityService } from '../crm-lead-activity.service';
import { MatDialog } from '@angular/material/dialog';
import { LeadConverterDialogComponent } from '../lead-converter-dialog/lead-converter-dialog.component';
import { CrmTeamsService } from '@ss/crm/crm-teams';
import {DeviceDetectorService} from "ngx-device-detector";
import {BreakpointObserver} from "@angular/cdk/layout";
import {toSignal} from "@angular/core/rxjs-interop";
import { CrmLeadsTrackingListComponent } from '../crm-leads-tracking/crm-leads-tracking-list.component';

enum Panels {
    GENERAL = 0,
    DETAIL = 1,
    CONTACT = 2,
    PROGRESS = 3,
    ACTIVITY = 4,
    ACTIVITY_LINE_DETAIL = 5,
    TRACKING = 6,
}

@Component({
    selector: 'ss-crm-leads-component',
    imports: [
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        DatePickerComponent,
        UiAutoCompleteComponent,
        CrmLeadsActivityListComponent,
        CrmLeadsActivityLinesDetailComponent,
        CrmLeadsTrackingListComponent
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
    #breakPointObs =  inject(BreakpointObserver);
    #teamSrv = inject(CrmTeamsService);
    #loginSrv = inject(LoginService);
    #userSrv = inject(UserListService);
    #campaignSrv = inject(CRMCampaignService);
    #citySrv = inject(CityService);
    #entitySrv = inject(CRMLeadsService);
    #activitySrv = inject(CrmLeadActivityService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #confirmationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);
    #NOW = new Date();
    #isHandset = toSignal(this.#breakPointObs.observe(['(max-width: 400px)']));

    campaignLookup = new DefaultAutoCompleteModel(this.#campaignSrv);
    userLookup = new DefaultAutoCompleteModel(this.#userSrv);
    teamLookup = new DefaultAutoCompleteModel(this.#teamSrv);
    cityLookup = new DefaultAutoCompleteModel(this.#citySrv);
    isMobile = computed(() => this.#isHandset()?.matches);

    formBuilder = inject(FormBuilder);
    dialog = inject(MatDialog);
    readonly industries = [
        'TECHNOLOGY',
        'HEALTHCARE',
        'FINANCE',
        'MANUFACTURING',
        'SERVICES',
        'RETAIL',
        'EDUCATION',
        'NON-PROFIT',
        'GOVERNMENT',
        'OTHER',
    ];

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

    public PRIORITIES = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

    selectedPanel = signal<Panels>(Panels.DETAIL);

    // Add these computed signals to your CrmLeadsDetailComponent class

    isGeneral = computed(() => this.selectedPanel() === Panels.GENERAL);
    isDetail = computed(() => this.selectedPanel() === Panels.DETAIL);
    isContact = computed(() => this.selectedPanel() === Panels.CONTACT);
    isTracking = computed(() => this.selectedPanel() === Panels.TRACKING);
    isProgress = computed(() => this.selectedPanel() === Panels.PROGRESS);
    isActivity = computed(() => this.selectedPanel() === Panels.ACTIVITY);
    isActivityDetail = computed(
        () => this.selectedPanel() === Panels.ACTIVITY_LINE_DETAIL,
    );

    public form: UntypedFormGroup | null = null;


    ngOnInit(): void {
        const id = +this.#route.snapshot.paramMap.get('id');
        this.#shellSrv.setTitle('CRM_LEADS');
        if (id > 0) {
            this.#entitySrv.get(id).subscribe({
                next: (crmLead) => {
                    this.form = this.setupForm(crmLead);
                },
            });
        } else {
            this.form = this.setupForm({ id: 0 } as CRMLead);
        }
    }

    list() {
        this.#router.navigate(['..'], { relativeTo: this.#route }).then();
    }

    save() {
        this.#entitySrv.save(this.form.getRawValue() as CRMLead).subscribe({
            next: (r) => {
                if (+this.form?.controls['id'].value == 0) {
                    this.form?.controls['id'].patchValue(r);
                    this.#router
                        .navigate([r], { relativeTo: this.#route.parent })
                        .then();
                }
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
        this.#entitySrv.setParentId(this.#loginSrv.appCtx.id);
        this.#activitySrv.setParentId(b.id);
        this.leadId = b.id;
        return this.formBuilder.group({
            id:                 [b?.id || 0, Validators.required],
            description:        [b?.description, Validators.required],
            detail:             [b?.detail, Validators.required],
            email:              [b?.email],
            phone:              [b?.phone],
            state:              [b?.state],
            status:             [b?.status || 'NEW'],
            source:             [b?.source || 'WEB'],
            createdAt:          [b?.createdAt || this.#NOW, Validators.required],
            createdBy:          [ b?.createdBy || this.#loginSrv.appCtx.id, Validators.required, ],
            updatedAt:          [b?.updatedAt || this.#NOW],
            expectedCloseDate:  [b?.expectedCloseDate],
            campaignId:         [b?.campaignId],
            ownerId:            [b?.ownerId || this.#loginSrv.appCtx.id, Validators.required],
            teamId:             [b?.teamId],
            priority:           [b?.priority || 'LOW'],
            score:              [b?.score || 0, [Validators.min(0), Validators.max(10)]],
            company:            [b?.company],
            companyDescription: [b?.companyDescription],
            companySite:        [b?.companySite],
            companyIndustry:    [b?.companyIndustry],
            annualRevenue:      [b?.annualRevenue, Validators.min(0)],
            numberOfEmployees:  [b?.numberOfEmployees, Validators.min(0)],
            lastName:           [b?.lastName],
            firstName:          [b?.firstName],
            jobTitle:           [b?.jobTitle],
            addressLine1:       [b?.addressLine1],
            addressLine2:       [b?.addressLine2],
            city:               [b?.city],
            postalCode:         [b?.postalCode],
            probability:        [b?.probability || 0],
            isDeleted:          [false],
            memo:               [b.memo]
        });
    }

    select(idx: number) {
        this.selectedPanel.set(idx);
    }

    readonly isEditable = input(false);
    protected readonly Panels = Panels;

    leadId: number;
    activityId = input<number | null> (null);

    onEditActivity(id: number) {
        // this.activityId = id;
        this.select(Panels.ACTIVITY_LINE_DETAIL);
    }

    saveProgress() {
        const form: CRMLead = this.form?.getRawValue();
        const val: CRMLeadProgress = {
            id:       form.id,
            status:   form.status,
            score:    form.score,
            priority: form.priority,
            ownerId:  form.ownerId,
            teamId:   form.teamId,
            memo:     form.memo,
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

    openDialog() {
        const dialogRef = this.dialog.open(LeadConverterDialogComponent, {
            width: '500px',
            height: '21em',
            data: {
                leadId: +this.form?.controls['id'].value,
                companyId: 0,
                contactId: 0,
            },
            disableClose: true,
        });

        dialogRef.afterClosed().subscribe((result) => {
            result
                ? this.#snackBarSrv.showSuccessMessage()
                : null ;
        });
    }
}
