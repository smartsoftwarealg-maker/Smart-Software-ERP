import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {LookupsService, PayMethod, PayMode, PayModeService} from '@ss/common/api-lookup';
import {Observable, of} from 'rxjs';
import {Account, AccountService} from '@ss/logistics/api-account';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ACCOUNT_TYPES} from '@ss/logistics/api-account';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {tap} from 'rxjs/operators';
import {DefaultReportService} from '@ss/common/ui-default-report-component';

@Component({
    selector: 'ss-account-list',
    styleUrls: ['./pay-method-list.component.scss'],
    templateUrl: './pay-method-list.component.html'
})
export class PayMethodListComponent extends BaseEntityListComponent<PayMethod> {


    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMode>(this.payModeSrv)


    displayedColumns = [
        'description',
        'mode',
    ];

    constructor(
        public payMethodSrv: PayMethodService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public defReportSrv: DefaultReportService,
        private payModeSrv: PayModeService) {
        super(payMethodSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'LOGISTICS_PAY_METHOD');
    }

    // processLoadedData(data: PayMethod[]): Observable<PayMethod[]> {
    //     return super.processLoadedData(data)
    //         .pipe(tap(res => res.filter(e => e.modeDescription == undefined || e.modeDescription == null)
    //             .forEach(e => e.modeDescription = this.payMethodSrv.getModeDescription(e.id))));
    // }

    getModeDescription(id: number): string {
        return this.payMethodSrv.getModeDescription(id);
    }
}
