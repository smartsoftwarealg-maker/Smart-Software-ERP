import { Component, inject, OnInit } from '@angular/core';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { CATEGORY, EmailTemplate, STATUS } from '../crm-email-templates.api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent, UserLookup } from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import { CRMEmailTemplatesService } from '../crm-email-templates.service';
import { CrmTeamsService } from '@ss/crm/crm-teams';
import { Editor, NgxEditorModule, toDoc, toHTML, Toolbar } from 'ngx-editor';

@Component({
    selector: 'ss-crm-email-templates-detail-component',
    imports: [
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        DatePickerComponent,
        UiAutoCompleteComponent,
        NgxEditorModule,
    ],
    templateUrl: './crm-email-templates-detail-component.html',
    styleUrl: './crm-email-templates-detail-component.scss',
    standalone: true,
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline' },
        },
    ],
})
export class CrmEmailTemplatesDetailComponent implements OnInit {
    #loginSrv = inject(LoginService);
    #userSrv = inject(UserListService);
    #teamSrv = inject(CrmTeamsService);
    #entitySrv = inject(CRMEmailTemplatesService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #confirmationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);
    #NOW = new Date();
    #jsonDoc = {
        type: 'doc',
        content: [
            {
                type: 'paragraph',
                content: [
                    {
                        type: 'text',
                        text: '',
                    },
                ],
            },
        ],
    };


    formBuilder = inject(FormBuilder);
    userLookup = new UserLookup(this.#userSrv);
    teamLookup = new DefaultAutoCompleteModel(this.#teamSrv);

    public form: UntypedFormGroup | null = null;

    ngOnInit(): void {
        const id = +this.#route.snapshot.paramMap.get('id');
        this.#shellSrv.setTitle('CRM_EMAIL_TEMPLATE');
        if (id > 0) {
            this.#entitySrv.get(id).subscribe({
                next: (template) => {
                    this.form = this.setupForm(template);
                },
            });
        } else {
            this.form = this.setupForm({ id: 0 } as EmailTemplate);
        }
    }

    list() {
        this.#router.navigate(['..'], { relativeTo: this.#route }).then();
    }

    getEditorContentAsHTML(): string {
        // Convert to HTML string
        return toHTML(this.#jsonDoc);
    }

    // To load HTML into the editor manually (optional, input binding handles this too)
    loadHtmlIntoEditor(htmlString: string): void {
        const jsonDoc = toDoc(htmlString); // Convert HTML string to JSON doc
        this.editor.setContent(jsonDoc);
    }

    save() {
        const value = this.form.getRawValue();
        value.createdAt = null;
        value.updatedAt = null;
        value.createdBy = null;
        value.updatedBy = null;
        const content = toHTML(value.htmlContent);
        console.log( value.htmlContent, content );
        value.htmlContent = content;
        this.#entitySrv
            .save(value)
            .subscribe({
                next: () => {
                    this.form.markAsUntouched();
                    this.#snackBarSrv.showSuccessMessage();
                    this.list();
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

    private setupForm(b: EmailTemplate) {
        this.editor.setContent(toDoc(b.htmlContent as string));
        const content = b?.htmlContent? toDoc(b?.htmlContent) : null;
        return this.formBuilder.group({
            id: [b?.id || 0, Validators.required],
            name: [b?.name, Validators.required],
            subject: [b?.subject, Validators.required],
            thumbnail: [b?.thumbnail],
            htmlContent: [content, Validators.required],
            textContent: [b?.textContent],
            category: [b?.category],
            tags: [b?.tags],
            mergeFields: [b?.mergeFields],
            status: [b?.status || 'NEW'],
            ownerId: [b?.ownerId, Validators.required],
            teamId: [b?.teamId],
            createdAt: [{ value: b?.createdAt || this.#NOW, disabled: true }],
            createdBy: [b?.createdBy || this.#loginSrv.appCtx.id],
            updatedAt: [b?.updatedAt || this.#NOW],
            updatedBy: [b?.updatedBy || this.#loginSrv.appCtx.id],
        });
    }

    editor: Editor = new Editor();
    toolbar: Toolbar = [
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right'],
    ];

    protected readonly STATUS = STATUS;
    protected readonly CATEGORY = CATEGORY;
}
