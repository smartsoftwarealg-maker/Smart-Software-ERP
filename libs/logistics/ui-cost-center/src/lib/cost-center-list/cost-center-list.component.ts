import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {CostCenter, CostCenterService} from '@ss/logistics/api-cost-center';
import {Observable} from 'rxjs';
import {CCGroup, LookupsService} from '@ss/common/api-lookup';
import {tap} from 'rxjs/operators';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cost-center-list',
    styleUrls: ['./cost-center-list.component.scss'],
    templateUrl: './cost-center-list.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
       
        ReactiveFormsModule,
        PaginationComponent

    ]
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
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public lookupSrv: LookupsService,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(costCenterSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv,'COMMON_COST_CENTER');
        this.pagination.pageSize = 10;
    }



    override preload(): Observable<any> {
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
