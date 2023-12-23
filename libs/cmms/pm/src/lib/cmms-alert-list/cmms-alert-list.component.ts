import { Component, OnInit } from '@angular/core';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { PM } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { PaginatorPersistenceService } from '@ss/common/api-common';
import { CMMSAlertService } from '../services/cmms-alert.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Component({
    selector: 'ss-cmms-alert-list',
    templateUrl: './cmms-alert-list.component.html',
    styleUrls: [
        '../pm-list/pm-list.component.css',
        './cmms-alert-list.component.css'
    ],
})
export class CmmsAlertListComponent extends BaseEntityListComponent<PM> implements OnInit {
    dateControl = new FormControl<Date>(new Date());

    displayedColumns = [
        // 'reference',
        'description',
        'assetDescription',
        'planDescription',
        'lastReleased',
        'nextDue',
        'daysAhead'
    ];

    constructor(
        public override entitySrv: CMMSAlertService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override defReportSrv: DefaultReportService,
        public override confirmationSrv: ConfirmationDialogService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'CMMS_ALERTS');
        this.pagination.pageSize = 15;
    }

    override ngOnInit() {
        this.addButton.visible = false;
        this.editButton.visible = false;
        this.deleteButton.visible = false;
        super.ngOnInit();

        this.subscriptions.push(
            this.dateControl
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged()
                ).subscribe(date => {
                    const d = typeof date === 'string' ? new Date(date) : date;
                    if (d) {
                        this.entitySrv.date = d;
                        this.refresh();
                    }
                }));
    }

    generate() {
        this.shellSrv.setLoading(true);
        this.confirmationSrv
            .confirm('CMMS_WORK_GENERATION', 'COMMON_GENERATE')
            .pipe(switchMap(answer => answer? this.entitySrv
                .generate(this.dateControl.value, this.shellSrv.getSearchText()): of({count: 0}))
            ).subscribe({
                next: res => {
                    if (res?.count) {
                        this.snackBarSrv.showSuccessMessage();
                        this.data = [];
                    }
                    this.shellSrv.setLoading(false);
                },
                error: err => {
                    this.shellSrv.setLoading(false);
                    throw err;
                }
            });
    }
}
