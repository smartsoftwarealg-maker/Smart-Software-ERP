import {Component, Input} from '@angular/core';
import {FundService, PaymentInfoService} from '@ss/payroll/api-employee';
import {FormBuilder} from '@angular/forms';
import {Fund, LookupsService, MaritalStatus} from '@ss/common/api-lookup';
import {switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {BankService} from '@ss/administration/api-bank';
import {SnackBarService} from '@ss/common/ui-shell';

@Component({
    selector: 'ss-payment-info',
    templateUrl: './payment-info.component.html',
    styleUrls: ['./payment-info.component.scss']
})
export class PaymentInfoComponent {
    fund1
    form = null;
    maritalStatus: MaritalStatus[];
    funds: Fund[] = [];
    fund1Lookup = new DefaultAutoCompleteModel(this.fundSrv);
    fund2Lookup = new DefaultAutoCompleteModel(this.fundSrv);
    bankLookup = new DefaultAutoCompleteModel(this.bankSrv);

    constructor(private infoSrv: PaymentInfoService,
                private formBuilder: FormBuilder,
                private lookupsSrv: LookupsService,
                private fundSrv: FundService,
                private bankSrv: BankService,
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
            .subscribe(res => this.snackBarSrv.showSuccessMessage());
    }

    private load() {
        this.lookupsSrv
            .getMaritalStatuses()
            .pipe(tap(res => this.maritalStatus = res),
                switchMap(_ => this.fundSrv.getFunds()),
                tap(res => this.funds = res),
                switchMap(_ => this.infoSrv.load(this._personId))
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
