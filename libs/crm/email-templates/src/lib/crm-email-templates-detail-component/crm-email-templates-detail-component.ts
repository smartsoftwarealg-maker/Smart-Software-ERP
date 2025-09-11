import { Component, inject, OnInit } from '@angular/core';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { EmailTemplate } from '../crm-email-templates.api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
    UserLookup,
} from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import { CRMEmailTemplatesService } from '../crm-email-templates.service';
import { STATUS } from '@ss/crm/campaign';
import { CrmTeamsService } from '@ss/crm/crm-teams';

@Component({
    selector: 'crm-email-templates-detail-component',
    imports: [
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        DatePickerComponent,
        UiAutoCompleteComponent,
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

    formBuilder = inject(FormBuilder);
    userLookup = new UserLookup(this.#userSrv);
    teamLookup = new DefaultAutoCompleteModel(this.#teamSrv);

    public form: UntypedFormGroup | null = null;

    ngOnInit(): void {
        const id = +this.#route.snapshot.paramMap.get('id');
        this.#shellSrv.setTitle('CRM_EMAIL_TEMPLATE');
        if (id > 0) {
            this.#entitySrv.get(id).subscribe({
                next: (crmLead) => {
                    this.form = this.setupForm(crmLead);
                },
            });
        } else {
            this.form = this.setupForm({ id: 0 } as EmailTemplate);
        }
    }

    list() {
        this.#router.navigate(['..'], { relativeTo: this.#route }).then();
    }

    save() {
        this.#entitySrv
            .save(this.form.getRawValue() as EmailTemplate)
            .subscribe({
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

    canDeactivate(): Observable<boolean> {
        if (this.form?.touched && this.form?.dirty) {
            return this.#confirmationSrv.confirmDontSave();
        }
        return of(true);
    }

    private setupForm(b: EmailTemplate) {
        return this.formBuilder.group({
            id: [b?.id || 0, Validators.required],
            name: [b?.name, Validators.required],
            subject: [b?.subject, Validators.required],
            thumbnail: [b?.thumbnail],
            htmlContent: [b?.htmlContent, Validators.required],
            textContent: [b?.textContent],
            category: [b?.category],
            tags: [b?.tags],
            mergeFields: [b?.mergeFields],
            status: [b?.status || 'NEW'],
            ownerId: [b?.ownerId, Validators.required],
            teamId: [b?.teamId],
            createdAt: [b?.createdAt || this.#NOW, Validators.required],
            createdBy: [b?.createdBy || this.#loginSrv.appCtx.id],
            updatedAt: [b?.updatedAt || this.#NOW],
            updatedBy: [b?.updatedBy || this.#loginSrv.appCtx.id],
        });
    }

    protected readonly STATUS = STATUS;
}
