import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/api-base-entity';
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {CostCenter, CostCenterService} from "@ss/logistics/api-cost-center";
import {Observable} from "rxjs";
import {CCGroup, LookupsService} from "@ss/common/api-lookup";
import {tap} from "rxjs/operators";

@Component({
    selector: 'ss-cost-center-list',
    styleUrls: ['./cost-center-list.component.scss'],
    templateUrl: './cost-center-list.component.html'
})
export class CostCenterListComponent extends BaseEntityListComponent<CostCenter> {


    public ccGroups: { [id: number]: string; };

    displayedColumns = [
        'code',
        'description',
        'groupId'
    ];


    constructor(
        public costCenterSrv: CostCenterService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public router: Router,
        public lookupSrv: LookupsService,
        public confirmationSrv: ConfirmationDialogService) {
        super(costCenterSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, 'LOGISTICS_COST_CENTER');
    }



    preload(): Observable<any> {
        return this.lookupSrv.getCCGroups()
            .pipe(
                tap(x => this.onCCGroupsLoaded(x)),
            );
    }

    onCCGroupsLoaded(data: CCGroup[]): void {
        this.ccGroups = {};
        data.forEach(m => this.ccGroups[m.id] = m.description);
    }
}
