import { Component, inject, OnInit, Output, EventEmitter, input } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    UntypedFormGroup,
    Validators,
    ReactiveFormsModule,
    FormsModule
} from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MaterialModule, LoginService } from '@ss/common/api-common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {
    Editor,
    NgxEditorModule,
    Toolbar,
} from 'ngx-editor';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { FurnitureStatusService } from '@ss/common/api-lookup';
import { CrmLeadActivityService } from '../crm-lead-activity.service';
import { CRMLeadActivity, EMessage } from '../lead-activity-api';
import { ACTIVITY_TYPE } from '@ss/crm/opportunity';
import { of } from 'rxjs';
import { SnackBarService } from '@ss/common/ui-shell';
import { CRMLead } from '../lead-api';
import { CRMLeadsService } from '@ss/crm/leads';

@Component({
    selector: 'ss-crm-leads-activity-lines-detail',
    templateUrl: './crm-leads-activity-lines-detail.component.html',
    styleUrls: ['./crm-leads-activity-lines-detail.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        MatFormField,
        MatLabel,
        FormsModule,
        ReactiveFormsModule,
        TranslateDirective,
        TranslatePipe,
        UiAutoCompleteComponent,
        DatePickerComponent,
        NgxEditorModule,
    ],
})
export class CrmLeadsActivityLinesDetailComponent implements OnInit {
    // Dependencies
    private formBuilder = inject(FormBuilder);
    private usersSrv = inject(UserListService);
    private entitySrv = inject(CrmLeadActivityService);
    private snackBarSrv = inject(SnackBarService);
    private statusSrv = inject(FurnitureStatusService);
    private loginSrv = inject(LoginService);
    private confirmationSrv = inject(ConfirmationDialogService);

    readonly activityId = input.required<number | null>();
    readonly parentId = input.required<number>();
    @Output() closed = new EventEmitter<void>();

    public form: UntypedFormGroup | null = null;
    public usersLookup = new DefaultAutoCompleteModel(this.usersSrv);
    public statusAutoCompleteModel = new DefaultAutoCompleteModel(
        this.statusSrv,
    );

    public editor: Editor = new Editor();
    public editorContent!: FormControl;
    public toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];

    protected readonly ACTIVITY_TYPE = ACTIVITY_TYPE;
    public status = [
        'SCHEDULED',
        'IN_PROGRESS',
        'COMPLETED',
        'CANCELLED',
        'FAILED',
        'NO_SHOW',
        'PENDING',
    ];
    public priority = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

    public email: string = '';

    private leadSrv = inject(CRMLeadsService);

    ngOnInit() {
        const activityId = this.activityId();
        if (activityId) {
            this.entitySrv.get(activityId).subscribe((activity) => {
                this.form = this.setupForm(activity);
            });
        } else {
            this.form = this.setupForm({
                id: 0,
                parentId: this.parentId(),
            } as CRMLeadActivity);
        }
        this.leadSrv.get(this.entitySrv.getParentId()).subscribe({
            next: (crmLead: CRMLead) => {
                this.email = crmLead.email;
            },
        });
    }

    public setupForm(e: CRMLeadActivity): UntypedFormGroup {
        if (e.activityType == 'EMAIL') {
            // this.editorContent.setValue(toDoc(e.detail as string));
            //this.editor.setContent(toDoc(e.detail as string));
        }
        return this.formBuilder.group({
            id: [e.id],
            parentId: [e.parentId || this.entitySrv.getParentId()],
            subject: [e.subject, Validators.required],
            activityType: [e.activityType, Validators.required],
            priority: [e.priority, Validators.required],
            status: [e.status, Validators.required],
            dueDate: [e.dueDate, Validators.required],
            completionDate: [e.completionDate],
            createdBy: [
                {
                    value: e.createdBy || this.loginSrv.appCtx.id,
                    disabled: true,
                },
                Validators.required,
            ],
            ownerId: [
                e.ownerId || this.loginSrv.appCtx.id,
                Validators.required,
            ],
            detail: new FormControl(e.detail || '', Validators.required),
        });
    }

    public readForm(): CRMLeadActivity {
        return this.form!.getRawValue();
    }

    cancel() {
        const obs = this.form?.dirty
            ? this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL')
            : of(true);

        obs.subscribe((res) => {
            if (res) this.closed.emit();
        });
    }

    save() {
        this.form!.markAllAsTouched();
        if (!this.form!.valid) {
            this.snackBarSrv.showFailureMessage();
            return;
        }

        const val = this.readForm();

        this.entitySrv.save(val).subscribe({
            next: (id) => {
                if (val.id === 0) val.id = id;
                this.form?.markAsUntouched();
                this.snackBarSrv.showSuccessMessage();
                this.closed.emit();
            },
            error: () => {
                this.snackBarSrv.showFailureMessage();
                this.form?.reset(val);
            },
        });

        if (val.activityType === 'EMAIL') {
            const message: EMessage = {
                to: this.email,
                subject: val.subject,
                body: val.detail,
                isHTML: true,
            };
            this.entitySrv.sendEmail(message).subscribe({
                next: () => this.snackBarSrv.showSuccessMessage(),
                error: () => this.snackBarSrv.showFailureMessage(),
            });
        }
    }

    send() {
        const eMessage: EMessage = {
            to: this.email,
            body: this.form?.controls['detail'].value,
            isHTML: true,
            subject: this.form?.controls['subject']?.value,
        };
        this.entitySrv.sendEmail(eMessage).subscribe({
            next: () => this.snackBarSrv.showSuccessMessage(),
            error: () => this.snackBarSrv.showFailureMessage(),
        });
    }
}
