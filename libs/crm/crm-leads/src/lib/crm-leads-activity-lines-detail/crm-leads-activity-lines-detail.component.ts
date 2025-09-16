import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {
    UntypedFormGroup,
    Validators,
    FormsModule,
    ReactiveFormsModule, FormBuilder, FormGroup, FormControl
} from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import { CRMLeadActivity, EMessage } from '../lead-activity-api';
import { CrmLeadActivityService } from '../crm-lead-activity.service';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { of } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { FurnitureStatusService } from '@ss/common/api-lookup';
import { ACTIVITY_TYPE } from '../../../../crm-opportunity/src/lib/crm-opportunity-api';
import { Editor, NgxEditorComponent, NgxEditorMenuComponent, Toolbar } from 'ngx-editor';
import { NgIf } from '@angular/common';


@Component({
    selector: 'ss-crm-leads-activity-lines-detail',
    templateUrl: 'crm-leads-activity-lines-detail.component.html',
    styleUrl: 'crm-leads-activity-lines-detail.component.scss',
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        TranslatePipe,
        UiAutoCompleteComponent,
        DatePickerComponent,
        NgxEditorComponent,
        NgxEditorMenuComponent,
        NgIf
    ]
})
export class CrmLeadsActivityLinesDetailComponent implements OnInit {
    private formBuilder = inject(FormBuilder);
    #usersSrv = inject(UserListService);
    #entitySrv = inject(CrmLeadActivityService);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);
    private statusSrv = inject(FurnitureStatusService);
    #route = inject(ActivatedRoute);
     router = inject(Router);
    statusAutoCompleteModel = new DefaultAutoCompleteModel(this.statusSrv);
    private confirmationSrv = inject(ConfirmationDialogService);
    public form: UntypedFormGroup | null = null;
    protected readonly ACTIVITY_TYPE = ACTIVITY_TYPE;
    usersLookup = new DefaultAutoCompleteModel(this.#usersSrv);
    @Input() activityId!: number | null;
    @Input() parentId!: number;

    public entitySrv: CrmLeadActivityService;
    public shellSrv: ShellService;
    public route: ActivatedRoute;


    // this.route.parent?.params.subscribe(params => {
    //     if (params['id']) {
    //         this.entitySrv.setParentId(params['id']);
    //     }
    // });
    @Output() closed = new EventEmitter<void>();


    public setupForm(e: CRMLeadActivity): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            parentId: [e.parentId || this.#entitySrv.getParentId()],
            subject: [e.subject, Validators.required],
            activityType: [e.activityType, Validators.required],
            priority: [e.priority, Validators.required],
            status: [e.status, Validators.required],
            dueDate: [e.dueDate, Validators.required],
            completionDate: [e.completionDate, Validators.required],
            createdBy: [e.createdBy, Validators.required],
            ownerId: [e.ownerId, Validators.required]
        });
    }



    cancel() {
        const obs = this.form?.dirty
            ? this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL')
            : of(true);

        obs.subscribe(res => {
            if (res) {
                this.closed.emit();
            }
        });
    }


    ngOnInit() {
        if (this.activityId ) {
            this.#entitySrv.get(this.activityId).subscribe(activity => {
                this.form = this.setupForm(activity);
            });
        } else {
            this.form = this.setupForm({
                id: 0,
                parentId: this.parentId
            } as CRMLeadActivity);
        }
        this.editor = new Editor();
    }



    readForm(): CRMLeadActivity {
        return this.form.getRawValue();
    }


    save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.#snackBarSrv.showFailureMessage();
            return;
        }

        const val = this.readForm();
        const emailBody = this.htmlForm.value.editorContent;

        if (val.activityType === 'EMAIL') {
            const message: EMessage = {
                to: this.htmlForm.value.toEmail,
                subject: val.subject,
                body: emailBody,
                isHTML: true
            };

            this.#entitySrv.sendEmail(message).subscribe({
                next: () => {
                    this.#snackBarSrv.showSuccessMessage();
                    this.closed.emit();
                },
                error: () => {
                    this.#snackBarSrv.showFailureMessage();
                }
            });
            return;
        }
        this.#entitySrv.update(val).subscribe({
            next: (id) => {
                if (val.id === 0) {
                    val.id = id;
                }
                this.form?.markAsUntouched();
                this.#snackBarSrv.showSuccessMessage();
                this.closed.emit();
            },
            error: () => {
                this.#snackBarSrv.showFailureMessage();
                this.form?.reset(val);
            }
        });
    }

    editor: Editor|null = null;
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

    html = '';
    htmlForm = new FormGroup({
        toEmail: new FormControl('', [Validators.required, Validators.email]),
        editorContent: new FormControl(
            { value: '', disabled: false },
            Validators.required
        ),
    });

}
