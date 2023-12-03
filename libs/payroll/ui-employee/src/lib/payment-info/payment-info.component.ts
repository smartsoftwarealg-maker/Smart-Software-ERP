import { Component, inject, Input } from '@angular/core';
import {FundService, PaymentInfoService} from '@ss/payroll/api-employee';
import {UntypedFormBuilder} from '@angular/forms';
import {Fund, LookupsService, MaritalStatus} from '@ss/common/api-lookup';
import {switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {BankService} from '@ss/administration/api-bank';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';

@Component({
    selector: 'ss-payment-info',
    templateUrl: './payment-info.component.html',
    styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent {
    private lookupsSrv =  inject(LookupsService);
    private fundSrv =  inject(FundService);
    private bankSrv =  inject(BankService);
    private shellSrv = inject(ShellService);

    isEditable = this.shellSrv.getCurrentNodeRights()?.edit || false;
    form = null;
    maritalStatus: MaritalStatus[];
    funds: Fund[] = [];
    fund1Lookup = new DefaultAutoCompleteModel(this.fundSrv);
    fund2Lookup = new DefaultAutoCompleteModel(this.fundSrv);
    bankLookup = new DefaultAutoCompleteModel(this.bankSrv);

    constructor(private infoSrv: PaymentInfoService,
                private formBuilder: UntypedFormBuilder,
                private snackBarSrv: SnackBarService) {
    }

    private _activePersonnel = true;

    get activePersonnel() {
        return this._activePersonnel;
    }

    @Input()
    set activePersonnel(active: boolean) {
        this._activePersonnel = active;
    }

    private _hrMode = true;

    get hrMode() {
        return this._hrMode;
    }

    @Input()
    set hrMode(mode: boolean) {
        this._hrMode = mode;
    }

    private _personId = 0;

    @Input()
    set personId(id: number) {
        this._personId = id;
        this.load();
    }
    save() {
        this.infoSrv
            .update(this.form.value)
            .subscribe(() => this.snackBarSrv.showSuccessMessage());
    }

    private load() {
        this.lookupsSrv
            .getMaritalStatuses()
            .pipe(tap(res => this.maritalStatus = res),
                switchMap(() => this.fundSrv.getFunds()),
                tap(res => this.funds = res),
                switchMap(() => this.infoSrv.load(this._personId))
            ).subscribe(res => {
                this.form = this.formBuilder.group({
                    id: [res.id],
                    employee: [res.employee],
                    maritalStatus: [res.maritalStatus],
                    fund1: [res.fund1],
                    fund2: [res.fund2],
                    bank: [res.bank],
                    paymode: [res.paymode],
                    accountno: [res.accountno]
                });
            });
    }
}
