import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { SnackBarService } from '@ss/common/ui-shell';
import { LoginService } from '@ss/common/api-common';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ContactService } from '../services/contact.service';
import { Contact } from '../services/api';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { NgForOf, NgIf } from '@angular/common';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatTab, MatTabGroup } from '@angular/material/tabs';


@Component({
    selector: 'ss-contacts',
    templateUrl: './contacts-detail.component.html',
    styleUrl: './contacts-detail.component.scss',
    imports: [
        TranslatePipe,
        MatFormField,
        MatSelect,
        ReactiveFormsModule,
        MatLabel,
        MatInput,
        MatButton,
        NgIf,
        MatCheckbox,
        MatOption,
        MatTabGroup,
        MatTab,
        TranslateDirective,
        NgForOf
    ],
    standalone: true

})
export class ContactsDetailComponent implements OnInit {
    #entitySrv = inject(ContactService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #confirmationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);
    #loginSrv = inject(LoginService);
    formBuilder = inject(FormBuilder);


    public form: UntypedFormGroup | null = null;
    states: number[] = Array.from({ length: 58 }, (_, i) => i + 1);

    ngOnInit(): void {
        const id = +this.#route.snapshot.paramMap.get('id');
        this.#entitySrv.get(id).subscribe({
            next: (contact) => {
                this.form = this.setupForm(contact);
            },
        });
    }

    list() {
        this.#router.navigate(['..'], { relativeTo: this.#route }).then();
    }

    save() {
        if (this.form) {
            this.#entitySrv.save(this.form.getRawValue() as Contact).subscribe({
                next: () => {
                    if (this.form) {
                        this.form.markAsUntouched();
                    }
                    this.#router
                        .navigate(['../'], { relativeTo: this.#route })
                        .then();
                    this.#snackBarSrv.showSuccessMessage();
                },
                error: () => {
                    this.#snackBarSrv.showFailureMessage();
                }
            });
        }
    }


    canDeactivate(): Observable<boolean> {
        if (this.form?.touched && this.form.dirty) {
            return this.#confirmationSrv.confirmDontSave();
        }
        return of(true);
    }

    private setupForm(b: Contact) {
        if (b) {
            return this.formBuilder.group({
                id: [b.id || 0, Validators.required],
                salutation: [b.salutation, Validators.required],
                firstName: [b.firstName, Validators.required],
                lastName: [b.lastName, Validators.required],
                primaryEmail: [b.primaryEmail, Validators.required],
                primaryEmailVerified: [b.primaryEmailVerified, Validators.required],
                secondaryEmail: [b.secondaryEmail, Validators.required],
                primaryPhone: [b.primaryPhone, Validators.required],
                primaryPhoneType: [b.primaryPhoneType, Validators.required],
                secondaryPhone: [b.secondaryPhone, Validators.required],
                secondaryPhoneType: [b.secondaryPhoneType, Validators.required],
                addressLine1: [b.addressLine1, Validators.required],
                addressLine2: [b.addressLine2, Validators.required],
                city: [b.city, Validators.required],
                stateProvince: [b.stateProvince, Validators.required],
                postalCode: [b.postalCode, Validators.required],
                country: [b.country, Validators.required],
                addressType: [b.addressType, Validators.required],
                companyId: [b.companyId, Validators.required],
                companyName: [b.companyName, Validators.required],
                department: [b.department, Validators.required],
                jobTitle: [b.jobTitle, Validators.required],
                isDecisionMaker: [b.isDecisionMaker, Validators.required],
                linkedInUrl: [b.linkedInUrl, Validators.required],
                twitterHandle: [b.twitterHandle, Validators.required],
                facebookUrl: [b.facebookUrl, Validators.required],
                preferredContactMethod: [b.preferredContactMethod, Validators.required],
                preferredLanguage: [b.preferredLanguage, Validators.required],
                timezone: [b.timezone, Validators.required],
                marketingOptIn: [b.marketingOptIn, Validators.required],
                optInDate: [b.optInDate, Validators.required],
                birthDate: [b.birthDate, Validators.required],
                gender: [b.gender, Validators.required],
                createdAt: [new Date(), Validators.required],
                createdBy: [this.#loginSrv.appCtx.id || 0, Validators.required],
                updatedAt: [new Date(), Validators.required],
                updatedBy: [this.#loginSrv.appCtx.id || 0, Validators.required],
                sourceSystem: [b.isDeleted, Validators.required],
                doNotContact: [b.doNotContact,Validators.required]
            });
        } else {
            return this.formBuilder.group({
                id: [0, Validators.required],
                salutation: ['', Validators.required],
                firstName: ['', Validators.required],
                middleName: [''],
                lastName: ['', Validators.required],
                primaryEmail: ['', [Validators.required, Validators.email]],
                primaryEmailVerified: [false, Validators.required],
                secondaryEmail: ['', Validators.email],
                primaryPhone: ['', Validators.required],
                primaryPhoneType: ['MOBILE', Validators.required],
                secondaryPhone: [''],
                secondaryPhoneType: [''],
                addressLine1: [''],
                addressLine2: [''],
                city: [null],
                stateProvince: [""],
                postalCode: [''],
                country: [''],
                addressType: [''],
                companyId: [null, Validators.required],
                companyName: [''],
                department: [''],
                jobTitle: [''],
                isDecisionMaker: [false, Validators.required],
                startDate: [null],
                linkedInUrl: [''],
                twitterHandle: [''],
                facebookUrl: [''],
                preferredContactMethod: [''],
                preferredLanguage: [''],
                timezone: [''],
                doNotContact: [false],
                marketingOptIn: [false, Validators.required],
                optInDate: [null],
                birthDate: [null],
                gender: [''],
                createdAt: [new Date()],
                createdBy: [null, Validators.required],
                updatedAt: [null],
                updatedBy: [null, Validators.required],
                sourceSystem: [''],
                isDeleted: [false, Validators.required]
            });
        }
    }
}
