import { Component, inject, OnInit } from "@angular/core";
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LookupsService, PayMethod, PayMode, PayModeService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {PayMethodService} from '@ss/logistics/api-logistics-common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {Observable, switchMap, tap} from 'rxjs';
import {PaginatorPersistenceService} from '@ss/common/api-common';

@Component({
    selector: 'ss-account-list',
    styleUrls: ['./pay-method-list.component.scss'],
    templateUrl: './pay-method-list.component.html'
})
export class PayMethodListComponent extends BaseEntityListComponent<PayMethod> {
    private payModeSrv = inject(PayModeService);
    public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMode>(this.payModeSrv);


    displayedColumns = [
        'description',
        'mode',
    ];

    constructor(
        public payMethodSrv: PayMethodService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        public override defReportSrv: DefaultReportService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(payMethodSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LOGISTICS_PAY_METHOD');
        this.pagination.pageSize = 10;
    }

    override processLoadedData(data: PayMethod[]): Observable<PayMethod[]> {
        return this.payMethodSrv
            .getModes()
            .pipe(tap(res => data.forEach(m => m.modeDescription = res.find(pm => pm.id === m.payMode)?.description)),
                switchMap(_ => super.processLoadedData(data)));
    }
}
