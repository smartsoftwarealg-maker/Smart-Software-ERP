import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { CRMLeadsService } from '../crm-lead.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { CRMLead } from '../lead-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

@Component({
    selector: 'ss-crm-leads-component',
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        DatePickerComponent,

    ],
    templateUrl: './crm-leads-detail-component.html',
    styleUrl: './crm-leads-detail-component.scss',
    standalone: true,
    providers: [
        {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
    ]
})
export class CrmLeadsDetailComponent implements OnInit {
    #entitySrv = inject(CRMLeadsService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #confirmationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);
    #loginSrv = inject(LoginService);
    #shellSrv = inject(ShellService);

    formBuilder = inject(FormBuilder);


    public STATUS = [
        'NEW',
        'CONTACTED',
        'QUALIFIED',
        'PROPOSAL_SENT',
        'NEGOTIATION',
        'CLOSED_WON',
        'CLOSED_LOST',
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
                this.#router
                    .navigate(['../'], { relativeTo: this.#route })
                    .then();
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
        if (this.form.touched && this.form.dirty) {
            return this.#confirmationSrv.confirmDontSave();
        }
        return of(true);
    }

    private setupForm(b: CRMLead) {
        return this.formBuilder.group({
            id:          [b.id || 0, Validators.required],
            description: [b.description, Validators.required],
            detail:      [b.detail, Validators.required],
            email:       [b.email, Validators.required],
            phone:       [b.phone, Validators.required],
            status:      [b.status, Validators.required],
            createdAt:   [b.createdAt, Validators.required],
            createdBy:   [b.createdBy, Validators.required],
        });
    }
}
