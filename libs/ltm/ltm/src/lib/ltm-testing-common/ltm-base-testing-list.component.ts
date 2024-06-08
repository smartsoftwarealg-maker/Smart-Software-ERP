import { Directive, inject, OnInit, signal } from '@angular/core';
import { BaseEntityListComponent } from "@ss/common/ui-base-entity";
import { LTMLine, LTMTesting } from "../ltm-api";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultReportService } from "@ss/common/ui-default-report-component";
import { dateToStr, PaginatorPersistenceService, ymdToDmy } from '@ss/common/api-common';
import { map, Observable, of, switchMap } from 'rxjs';
import { LtmLineService } from '../services/ltm-line.service';
import { FormControl } from '@angular/forms';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { MatCheckboxChange } from "@angular/material/checkbox";
import { LtmMatterService } from '../services/ltm-matter.service';
import { LtmBaseTestingClass } from '../services/ltm-base-testing.class';

@Directive()
export class LtmBaseTestingListComponent extends BaseEntityListComponent<LTMTesting> implements OnInit {
    private lineSrv =  inject(LtmLineService);
    private matterSrv = inject(LtmMatterService);
    lines$: Observable<LTMLine[]> = null;
    matterCtrl = new FormControl<number>(0);
    fromCtrl = new FormControl<Date>(new Date());
    toCtrl = new FormControl<Date>(new Date());
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv);

    selection = signal<number[]>([]);

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
            this.refresh();
        }
    }

    private lastMonth(): Date {
        const now = new Date();
        now.setMonth(now.getMonth() - 1);
        return now;
    }

    addId(id: number) {
        if (this.selection().indexOf(id) < 1) {
            this.selection.update(values => [...values, id]);
        } else {
            this.selection.update(values => [...values.filter(_ => _ !== id)]);
        }
    }

    addAll(event: MatCheckboxChange) {
        this.selection.set(event.checked ? this.data.map(d => d.id) : []);
    }

    isSelected(id: number) {
        return this.selection().indexOf(id) > -1;
    }

    override deleteSelected() {
        if (this.selection().length > 0) {
            this.confirmationSrv
                .confirmDelete()
                .pipe(switchMap(ans => {
                    if (ans) {
                        this.shellSrv.setLoading(true);
                        return this.entitySrv.deleteAll(this.selection());
                    } else {
                        return of({ count: 0 });
                    }
                }))
                .subscribe({
                    next: res => {
                        this.shellSrv.setLoading(false);
                        if (res.count > 0) {
                            this.snackBarSrv.showSuccessMessage();
                            this.refresh();
                        }
                    },
                    error: err => {
                        this.snackBarSrv.showFailureMessage();
                        this.shellSrv.setLoading(false);
                        throw err;
                    }
                });
        }
    }

    override getPage(): Observable<LTMTesting[]> {
        const filter = this.filter || `${dateToStr(this.fromCtrl.value)}~${dateToStr(this.toCtrl.value)}`;
        return this.entitySrv.getPage(this.pagination, filter, this.sortBy);
    }
}
