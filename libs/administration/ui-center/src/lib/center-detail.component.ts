import { Component } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { AbstractControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Bank, Fund, LookupsService } from '@ss/common/api-lookup';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { Center, CenterService } from '@ss/administration/api-center';
import { MatExpansionPanel } from '@angular/material/expansion';
import { catchError, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { UserListService } from '@ss/common/api-users';
import { LoginService } from '@ss/common/api-common';


@Component({
    selector: 'ss-center-detail',
    styleUrls: ['./center-detail.component.scss'],
    templateUrl: './center-detail.component.html'
})
export class CenterDetailComponent extends BaseEntityDetailComponent<Center> {

    public funds: Fund[];
    public banks: Bank[];

    constructor(
        private loginSrv: LoginService,
        public centerService: CenterService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public usersSrv: UserListService,
        public lookupsSrv: LookupsService) {
        super(centerService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_CENTER');
    }


    override preload(): Observable<any> {
        this.centerService.setParentId(this.loginSrv.appCtx?.company);
        return this.lookupsSrv.getFunds()
            .pipe(
                catchError(() => of([])),
                tap(x => this.funds = x),
                switchMap(() => this.lookupsSrv.getBanks()),
                tap(x => this.banks = x));
    }

    public override setupForm(b: Center) {
        // Make sure to update the template if you edit the configuration here
        const urlRegExp = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

        return this.formBuilder.group({
            id: [b.id],
            description: [b.description, Validators.required],
            address: [b.address, Validators.required],
            isPublic: [!!b.isPublic],
            severe: [!!b.severe],
            ssNumber: [b.ssNumber],
            phone: [b.phone],
            email: [b.email, Validators.email],
            fax: [b.fax],
            articleNo: [b.articleNo],
            bank: [b.bank],
            descriptionAr: [b.descriptionAr],
            nis: [b.nis],
            nif: [b.nif],
            bankAccount: [b.bankAccount],
            logo: [b.logo],
            company: [b.company | this.loginSrv.appCtx.company],
            activity: [b.activity],
            activityCode: [b.activityCode],
            payMonth: [b.payMonth],
            bankRib: [b.bankRib],
            abbreviation: [b.abbreviation, Validators.maxLength(1)],
            fiscalId: [b.fiscalId],
            commReg: [b.commReg],
            addressAr: [b.addressAr],
            fundId: [b.fundId],
            monthValidated: [b.monthValidated]
        });
    }


    public isTouchedAndInvalid(control: AbstractControl): boolean {
        return control.invalid && control.touched;
    }

    public isMainSectionInvalid(): boolean {
        return this.isTouchedAndInvalid(this.form.controls['description']) ||
            this.isTouchedAndInvalid(this.form.controls['address']);
    }

    public isContactSectionInvalid(): boolean {
        return this.isTouchedAndInvalid(this.form.controls['email']);
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

    readForm(): Center {
        return this.form.getRawValue();
    }
}
