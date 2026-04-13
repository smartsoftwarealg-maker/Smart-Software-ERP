import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { AbstractControl, UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Company, CompanyService} from '@ss/administration/api-company';
import { MatExpansionPanel, MatAccordion, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';

import { TranslateDirective } from '@ss/common/ui-lang';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
    selector: 'ss-company-detail',
    styleUrls: ['./company-detail.component.scss'],
    templateUrl: './company-detail.component.html',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, TranslateDirective, MatFormField, MatLabel, MatInput, MatError, MatCheckbox]
})
export class CompanyDetailComponent extends BaseEntityDetailComponent<Company> {


    constructor(
        public companyService: CompanyService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(companyService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_COMPANY');
    }


    public override setupForm(b: Company) {
        // Make sure to update the template if you edit the configuration here
        const urlRegExp: RegExp = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

        return this.formBuilder.group({
            id: [b.id],
            description: [b.description, Validators.required],
            address1: [b.address1, Validators.required],
            company2: [b.company2],
            headquarters: [!!b.headquarters],
            isGroup: [b.isGroup],
            parentId: [b.parentId],
            address2: [b.address2],
            ssNumber: [b.ssNumber],
            phone: [b.phone],
            fax: [b.fax],
            fiscalID: [b.fiscalID],
            articleNo: [b.articleNo],
            bank: [b.bank],
            address1Ar: [b.address1Ar],
            website: [b.website, Validators.pattern(urlRegExp)],
            commRegister: [b.commRegister],
            capital: [b.capital],
            descriptionAr: [b.descriptionAr],
            company2Ar: [b.company2Ar],
            address2Ar: [b.address2Ar],
            nis: [b.nis],
            nif: [b.nif],
            email: [b.email, Validators.email],
            bankAccount: [b.bankAccount],
            consolidationCompany: [!!b.consolidationCompany],
            logo: [b.logo],
        });
    }


    public isTouchedAndInvalid(control: AbstractControl): boolean {
        return control.invalid && control.touched;
    }

    public isMainSectionInvalid(): boolean {
        return this.isTouchedAndInvalid(this.form.controls['description']) ||
            this.isTouchedAndInvalid(this.form.controls['address1']);
    }

    public isContactSectionInvalid(): boolean {
        return this.isTouchedAndInvalid(this.form.controls['email']) ||
            this.isTouchedAndInvalid(this.form.controls['website']);
    }


    public isSectionInvalid(section: string): boolean {
        switch (section) {
        case 'main':
            return this.isMainSectionInvalid();
        case 'contact':
            return this.isContactSectionInvalid();
        default:
            return false;
        }
    }

    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        // if invalid return warning class
        if (this.isSectionInvalid(section)) {
            return 'b-warn-expansion-panel';
        }

        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel';
        else
            return '';
    }


}
