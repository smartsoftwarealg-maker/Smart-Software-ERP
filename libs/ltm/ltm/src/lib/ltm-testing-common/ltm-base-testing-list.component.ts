import { Directive, inject, OnInit } from '@angular/core';
import { BaseEntityListComponent } from "@ss/common/ui-base-entity";
import { LTMLine, LTMTesting } from '@ltm/ltm-api';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService } from "@ss/common/ui-default-report-component";
import { dateToStr, PaginatorPersistenceService } from '@ss/common/api-common';
import { filter, map, Observable } from 'rxjs';
import { LtmLineService } from '@ltm/ltm-api';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { LtmBaseTestingClass } from '@ltm/ltm-api';
import { LtmMatterTestService } from '@ltm/ltm-api';
import { LtmCenterMatterService } from '@ltm/ltm-api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Directive()
export class LtmBaseTestingListComponent extends BaseEntityListComponent<LTMTesting> implements OnInit {
    private lineSrv =  inject(LtmLineService);
    private matterSrv = inject(LtmCenterMatterService);
    private matterTestSrv = inject(LtmMatterTestService);

    lines$: Observable<LTMLine[]> = null;
    matterCtrl   = new FormControl<number>(0);
    fromCtrl     = new FormControl<Date>(new Date());
    toCtrl       = new FormControl<Date>(new Date());
    openOnly     = new FormControl<boolean>(false);
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
        const TODAY = new Date();
        const filter = this.filter || `${dateToStr(this.fromCtrl.value||TODAY)}~${dateToStr(this.toCtrl.value||TODAY)}`;
        return this.entitySrv.getPage(this.pagination, filter, this.sortBy);
    }

    override selectRow(row: LTMTesting) {
        super.selectRow(row);
        this.matterTestSrv.setParentId(row?.parentId || 0);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.fromCtrl.setValue(this.entitySrv.from);
        this.toCtrl.setValue(this.entitySrv.to);
        this.subscriptions.push(
            this.fromCtrl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    filter(() => this.fromCtrl.value !== null)
                ).subscribe(() => this.refresh())
        );
        this.subscriptions
            .push(
            this.toCtrl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    filter(() => this.toCtrl.value !== null)
                ).subscribe(() => this.refresh())
        );
    }

    override refresh(callback?: () => void) {
        this.entitySrv.from = this.fromCtrl.value;
        this.entitySrv.to   = this.toCtrl.value;
        super.refresh(callback);
    }
}
