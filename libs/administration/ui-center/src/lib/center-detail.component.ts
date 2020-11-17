import {Component} from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {Bank, Fund, LookupsService} from "@ss/common/api-lookup";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {UserService} from "@ss/common/api-common";
import {Center, CenterService} from "@ss/administration/api-center";
import {MatExpansionPanel} from "@angular/material/expansion";
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";


@Component({
    selector: 'ss-center-detail',
    styleUrls: ['./center-detail.component.scss'],
    templateUrl: './center-detail.component.html'
})
export class CenterDetailComponent extends BaseEntityDetailComponent<Center> {

    public funds: Fund[];
    public banks: Bank[];

    constructor(
        public centerService: CenterService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public usersService: UserService,
        public lookupsSrv: LookupsService) {
        super(centerService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ADMINISTRATION_EDIT_CENTER');
    }


    preload(): Observable<any> {
        this.centerService.setParentId(this.usersService.context.company)
        return this.lookupsSrv.getFunds()
            .pipe(tap(x => this.funds = x))
            .pipe(switchMap(() => this.lookupsSrv.getBanks()))
            .pipe(tap(x => {
                this.banks = x
            }));

    }

    public setupForm(b: Center) {
        // Make sure to update the template if you edit the configuration here
        const urlRegExp: RegExp = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);

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
            company: [b.company],
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


    public isSectionInvalid(section): boolean {
        switch (section) {
            case "main":
                return this.isMainSectionInvalid();
            case "contact":
                return this.isContactSectionInvalid();
            default:
                return false;
        }
    }

    public getPanelHeaderClass(section, panel: MatExpansionPanel): string {
        // if invalid return warning class
        if (this.isSectionInvalid(section)) {
            return "b-warn-expansion-panel";
        }

        // if expanded return primary background class
        if (panel.expanded)
            return "b-primary-expansion-panel"
        else
            return "";
    }


}
