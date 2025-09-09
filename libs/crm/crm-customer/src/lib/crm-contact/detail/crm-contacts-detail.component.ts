import { Component, inject, OnInit } from '@angular/core';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CRMContact } from '../api';
import { CrmContactService } from '../crm-contact.service';

@Component({
    selector: 'ss-crm-contact-line-detail',
    templateUrl: './crm-contacts-detail.component.html',
    styleUrl: './crm-contacts-detail.component.scss',
    imports: [
        TranslatePipe,
        MatFormField,
        MatSelect,
        ReactiveFormsModule,
        MatLabel,
        MatInput,
        MatCheckbox,
        MatOption,
        TranslateDirective,
        MatButton,
        MatError,
    ],
    standalone: true,
})
export class CrmContactsDetailComponent
    extends BaseChildEntityDetailComponent<CRMContact>
    implements OnInit
{
    private formBuilder = inject(UntypedFormBuilder);

    constructor(protected detailSrv: CrmContactService) {
        super(detailSrv, 'CRMContactDetail');
    }

    protected salutations = [
        'Mr',
        'Mrs',
        'Miss',
        'Ms',
        'Dr',
        'Prof',
        'Sir',
        'Madam',
    ];

    protected phoneTypes = ['MOBILE', 'WORK', 'HOME', 'FAX'];

    override setupForm(b: CRMContact) {
            return this.formBuilder.group({
                id: [b?.id || 0],
                parentId: [b?.parentId || this.detailSrv.getParentId],
                salutation: [b?.salutation || '', Validators.required],
                firstName: [b?.firstName || '', Validators.required],
                middleName: [b?.middleName || ''],
                lastName: [b?.lastName || '', Validators.required],
                primaryEmail: [b?.primaryEmail || '', Validators.required],
                primaryEmailVerified: [b?.primaryEmailVerified],
                secondaryEmail: [b?.secondaryEmail || '', Validators.email],
                primaryPhone: [b?.primaryPhone || '', Validators.required],
                primaryPhoneType: [b?.primaryPhoneType || '', Validators.required],
                secondaryPhone: [b?.secondaryPhone || ''],
                secondaryPhoneType: [b?.secondaryPhoneType || ''],
                isDecisionMaker: [b?.isDecisionMaker],
                linkedInUrl: [b?.linkedInUrl || ''],
                twitterHandle: [b?.twitterHandle || ''],
                facebookUrl: [b?.facebookUrl || ''],
                preferredContactMethod: [b?.preferredContactMethod || ''],
                preferredLanguage: [b?.preferredLanguage || ''],
                marketingOptIn: [b?.marketingOptIn],
                createdAt: [new Date()],
                createdBy: [this.loginSrv.appCtx.id || 0],
                updatedAt: [new Date()],
                updatedBy: [this.loginSrv.appCtx.id || 0],
                doNotContact: [b?.doNotContact],
                optInDate: [b?.optInDate],
            });
    }
}
