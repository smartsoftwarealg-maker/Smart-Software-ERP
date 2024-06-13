import { Directive, inject, OnInit } from '@angular/core';
import { BaseEntityListComponent } from "@ss/common/ui-base-entity";
import { LTMLine, LTMTesting } from "../ltm-api";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService } from "@ss/common/ui-default-report-component";
import { dateToStr, PaginatorPersistenceService } from '@ss/common/api-common';
import { map, Observable } from 'rxjs';
import { LtmLineService } from '../services/ltm-line.service';
import { FormControl } from '@angular/forms';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { LtmBaseTestingClass } from '../services/ltm-base-testing.class';
import { LtmMatterTestService } from '../services/ltm-matter-test.service';
import { LtmCenterMatterService } from '../services/ltm-center-matter.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive()
export class LtmBaseTestingListComponent extends BaseEntityListComponent<LTMTesting> implements OnInit {
    private lineSrv =  inject(LtmLineService);
    private matterSrv = inject(LtmCenterMatterService);
    private matterTestSrv = inject(LtmMatterTestService);

    lines$: Observable<LTMLine[]> = null;
    matterCtrl = new FormControl<number>(0);
    fromCtrl = new FormControl<Date>(new Date());
    toCtrl = new FormControl<Date>(new Date());
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv);

    constructor(
        public override entitySrv: LtmBaseTestingClass,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
        public override title: string
        ) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            title);
        this.lines$ = this.lineSrv
            .getList(0, 50)
            .pipe(map(_ => _.body));
        this.pagination.pageSize = 10;
        this.fromCtrl.setValue(this.lastMonth());
        this.entitySrv.setParentId(this.entitySrv.getParentId() || 0);
        this.matterCtrl.setValue(this.entitySrv.getParentId());
        this.matterLookup.onObjectSelected = m => {
            this.entitySrv.setParentId(m?.id || 0);
            this.matterTestSrv.setParentId(m?.id || 0);
            this.refresh();
        }
    }

    private lastMonth(): Date {
        const now = new Date();
        now.setMonth(now.getMonth() - 1);
        return now;
    }

    override getPage(): Observable<LTMTesting[]> {
        const filter = this.filter || `${dateToStr(this.fromCtrl.value)}~${dateToStr(this.toCtrl.value)}`;
        return this.entitySrv.getPage(this.pagination, filter, this.sortBy);
    }

    override selectRow(row: LTMTesting) {
        super.selectRow(row);
        this.matterTestSrv.setParentId(row?.parentId || 0);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.subscriptions.push(
            this.fromCtrl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(() => this.refresh())
        );
        this.subscriptions.push(
            this.toCtrl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(() => this.refresh())
        );
    }
}
