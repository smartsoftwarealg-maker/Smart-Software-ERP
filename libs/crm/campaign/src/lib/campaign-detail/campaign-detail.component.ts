import {
    Component,
    computed,
    inject,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule,
    FormControl,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CompaignService } from '../compaign.service';
import { Campaign, CHANNELS, CTYPES, STATUS, TMessage } from '../campaign.api';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
    UserLookup,
} from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import { MailingListService } from '@ss/crm/mailing-list';
import {
    NgxEditorComponent,
    NgxEditorMenuComponent,
    Editor,
    Toolbar,
} from 'ngx-editor';
import { Observable, of } from 'rxjs';
import { CRMEmailTemplatesService } from '../../../../email-templates/src/lib/crm-email-templates.service';

enum Panels {
    GENERAL = 0,
    DETAIL = 1,
    EMAIL = 2,
    TRACEABILITY = 3,
}

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
        NgxEditorMenuComponent,
        NgxEditorComponent,
        TranslatePipe,
    ],
})
export class CampaignDetailComponent implements OnInit, OnDestroy {
    #userSrv = inject(UserListService);
    #loginSrv = inject(LoginService);
    #mailingListSrv = inject(MailingListService);
    #emailTemplateSrv = inject(CRMEmailTemplatesService);
    #entitySrv = inject(CompaignService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #confirmationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);

    formBuilder = inject(FormBuilder);
    userLookup = new UserLookup(this.#userSrv);

    public form: UntypedFormGroup | null = null;
    isResponsible = signal(this.#loginSrv.appCtx.responsible);

    mailingListLookup = new DefaultAutoCompleteModel(this.#mailingListSrv);
    emailTemplateLookup = new DefaultAutoCompleteModel(
        this.#emailTemplateSrv,
        'id',
        'name',
    );
    mailingList = new FormControl<number | null>(null);
    template = new FormControl<number | null>(null);

    html = '';
    htmlForm = new FormGroup({
        editorContent: new FormControl(
            { value: '', disabled: false },
            Validators.required,
        ),
    });

    editor: Editor | null = null;
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    ngOnInit(): void {
        const id = +this.#route.snapshot.paramMap.get('id');
        this.#shellSrv.setTitle('CRM_CAMPAIGN');
        if (id > 0) {
            this.#entitySrv.get(id).subscribe({
                next: (campaign) => {
                    this.form = this.setupForm(campaign);
                },
            });
        } else {
            this.form = this.setupForm({ id: 0 } as Campaign);
        }
        this.editor = new Editor();
        this.template.valueChanges.subscribe(() => {
            if (this.template.value) {
                this.#emailTemplateSrv.get(+this.template.value).subscribe({
                    next: (res) => {
                        this.htmlForm.controls.editorContent.setValue(
                            res?.htmlContent
                        );
                    },
                });
            }
        });
    }

    list() {
        this.#router.navigate(['..'], { relativeTo: this.#route }).then();
    }

    save() {
        this.#entitySrv.save(this.form?.getRawValue() as Campaign).subscribe({
            next: () => {
                this.form?.markAsUntouched();
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

    private setupForm(e: Campaign): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
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
            ownerId: [
                {
                    value: e.ownerId || this.#loginSrv.appCtx.id,
                    disabled: !this.isResponsible(),
                },
            ],
            createdAt: [{ value: e.createdAt || new Date(), disabled: true }, Validators.required],
            // createdAt: [{value:e.createdAt || new Date(), disabled:true}],
            createdBy: [
                {
                    value: e.createdBy || this.#loginSrv.appCtx.id,
                    disabled: true,
                },
            ],
            updatedAt: [e.updatedAt || new Date(), Validators.required],
            //updatedAt: [{value:e.updatedAt || new Date(), disabled:true}],
            updatedBy: [
                {
                    value: e.updatedBy || this.#loginSrv.appCtx.id,
                    disabled: true,
                },
            ],
        });
    }

    protected readonly Panels = Panels;
    selectedPanel = signal<Panels>(Panels.DETAIL);
    isDetail = computed(() => this.selectedPanel() === Panels.DETAIL);
    isEmail = computed(() => this.selectedPanel() === Panels.EMAIL);
    isTraceability = computed(() => this.selectedPanel() === Panels.TRACEABILITY);

    select(idx: number) {
        this.selectedPanel.set(idx);
    }

    send() {
        const tMessage: TMessage = {
            mailingListId: +this.mailingList.getRawValue(),
            templateId: +this.template.getRawValue()
        };
        this.#entitySrv.send(tMessage).subscribe({
            next: () => {
                this.#snackBarSrv.showSuccessMessage();
            },
            error: () => {
                this.#snackBarSrv.showFailureMessage();
            },
        });
    }

    ngOnDestroy() {
        this.editor?.destroy();
    }

    protected readonly STATUS = STATUS;
    protected readonly CTYPES = CTYPES;
    protected readonly CHANNELS = CHANNELS;
}
