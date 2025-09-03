import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
} from '@angular/material/table';
import { MatMiniFabButton } from '@angular/material/button';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatTooltip } from '@angular/material/tooltip';
import { Contact } from '../api';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { CrmContactLineService } from '../crm-contact-line-detail.service';
import {Language} from "@ss/common/api-lookup";
import {LanguageService} from "@ss/common/api-common";

@Component({
    selector: 'ss-crm-contact-line-list',
    imports: [
        CommonModule,
        MatTooltip,
        TranslateDirective,
        TranslatePipe,
        MatMiniFabButton,
        MatTable,
        MatHeaderCell,
        MatCell,
        MatColumnDef,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRow,
        MatRow,
        MatRowDef,
        MatHeaderRowDef,
    ],
    templateUrl: './crm-contacts-line-list.component.html',
    styleUrl: './crm-contacts-line-list.component.scss',
    standalone: true,
})
export class CrmContactsLineListComponent extends BaseChildEntityListComponent<Contact> {
    override displayedColumns = [
        'lastName',
        'firstName',
        'primaryEmail',
        'primaryPhone',
        'preferredContactMethod',
        'preferredLanguage',
    ];

    private langSrv = inject(LanguageService)

    constructor(protected override detailSrv: CrmContactLineService) {
        super(detailSrv, 'CrmContactLine');
    }

    getLanguage(code:string){
        if(this.langSrv.lang == 'en'){
            return code == 'en' ? 'English' : code == 'fr' ? 'French' : 'Arabic'
        }
        if(this.langSrv.lang == 'fr'){
            return code == 'en' ? 'Anglaise' : code == 'fr' ? 'Français' : 'arabe'
        }
           return code == 'en' ? 'الإنجليزية' : code == 'fr' ? 'الفرنسية' : 'العربية'
    }
}
