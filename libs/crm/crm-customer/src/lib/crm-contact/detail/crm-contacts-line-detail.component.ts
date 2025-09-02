import { Component, inject, OnInit } from '@angular/core';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Contact } from '../api';
import { CrmContactLineService } from '../crm-contact-line-detail.service';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'ss-crm-contact-line-detail',
    templateUrl: './crm-contacts-line-detail.component.html',
    styleUrl: './crm-contacts-line-detail.component.scss',
    imports: [
        TranslatePipe,
        MatFormField,
        MatSelect,
        ReactiveFormsModule,
        MatLabel,
        MatInput,
        MatCheckbox,
        MatOption,
        MatTabGroup,
        MatTab,
        TranslateDirective,
        MatToolbar,
        MatButton,
    ],
    standalone: true,
})
export class CrmContactsLineDetailComponent
    extends BaseChildEntityDetailComponent<Contact>
    implements OnInit
{
    private formBuilder = inject(UntypedFormBuilder);

    constructor(protected detailSrv: CrmContactLineService) {
        super(detailSrv, 'CRMContactDetail');
    }

    states: number[] = Array.from({ length: 58 }, (_, i) => i + 1);
    protected phoneTypes = ['MOBILE','WORK','HOME','FAX']


    override setupForm(b: Contact) {
        if (b) {
            return this.formBuilder.group({
                id: [b.id || 0],
                parentId: [b.parentId || this.detailSrv.getParentId],
                salutation: [b.salutation, Validators.required],
                firstName: [b.firstName, Validators.required],
                middleName: [b.middleName],
                lastName: [b.lastName, Validators.required],
                primaryEmail: [b.primaryEmail, Validators.required],
                primaryEmailVerified: [b.primaryEmailVerified],
                secondaryEmail: [b.secondaryEmail,Validators.email],
                primaryPhone: [b.primaryPhone, Validators.required],
                primaryPhoneType: [b.primaryPhoneType, Validators.required],
                secondaryPhone: [b.secondaryPhone],
                secondaryPhoneType: [b.secondaryPhoneType],
                isDecisionMaker: [b.isDecisionMaker],
                linkedInUrl: [b.linkedInUrl],
                twitterHandle: [b.twitterHandle],
                facebookUrl: [b.facebookUrl],
                preferredContactMethod: [b.preferredContactMethod],
                preferredLanguage: [b.preferredLanguage],
                marketingOptIn: [b.marketingOptIn],
                createdAt: [new Date()],
                createdBy: [this.loginSrv.appCtx.id || 0],
                updatedAt: [new Date()],
                updatedBy: [this.loginSrv.appCtx.id || 0],
                doNotContact: [b.doNotContact],
            });
        } else {
            return this.formBuilder.group({
                id: [0],
                parentId: [this.detailSrv.getParentId],
                salutation: ['', Validators.required],
                firstName: ['', Validators.required],
                middleName: [''],
                lastName: ['', Validators.required],
                primaryEmail: ['', [Validators.required, Validators.email]],
                primaryEmailVerified: [false],
                secondaryEmail: ['', Validators.email],
                primaryPhone: ['', Validators.required],
                primaryPhoneType: ['MOBILE', Validators.required],
                secondaryPhone: [''],
                secondaryPhoneType: [''],
                isDecisionMaker: [false],
                linkedInUrl: [''],
                twitterHandle: [''],
                facebookUrl: [''],
                preferredContactMethod: [''],
                preferredLanguage: [''],
                doNotContact: [false],
                marketingOptIn: [false],
                optInDate: [null],
                createdAt: [new Date()],
            });
        }
    }
}
