import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LTMLine, LTMLineMatter, LTMMatter, LTMTest, LTMTesting} from '../ltm-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {PaginatorPersistenceService} from '@ss/common/api-common';
import {LtmTestingService} from '../ltm-testing.service';
import {FormControl} from '@angular/forms';
import {map, Observable} from 'rxjs';
import {LtmLineService} from '../ltm-line.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {MatDialog} from '@angular/material/dialog';
import {LtmInjectionComponent} from '../ltm-injection/ltm-injection.component';

@Component({
    selector: 'ss-ltm-testing-list',
    templateUrl: './ltm-testing-list.component.html',
    styleUrls: ['./ltm-testing-list.component.scss'],
})
export class LtmTestingListComponent extends BaseEntityListComponent<LTMTesting> implements OnInit {
    private injectBtn: ToolbarButton = {
        icon: 'fa-regular fa-syringe',
        label: 'COMMON_EXCEL_INJECTION',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.inject()
    };
    lines$: Observable<LTMLine[]> = null;
    lineCtrl = new FormControl<number>(0);

    displayedColumns = ['matter', 'test', 'timeStamp', 'value'];

    constructor(
        public override entitySrv: LtmTestingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService,
        private lineSrv: LtmLineService,
        private matterSrv: LtmLineMatterService,
        private dialog: MatDialog) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_TESTINGS');
        this.lines$ = this.lineSrv
            .getList(0, 50)
            .pipe(map(_ => _.body));
        this.pagination.pageSize = 10;
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.injectBtn);
        this.subscriptions
            .push(
                this.lineCtrl
                    .valueChanges
                    .pipe(
                        debounceTime(300),
                        distinctUntilChanged()
                    ).subscribe(v => {
                        this.entitySrv.setParentId(v || 0);
                        this.matterSrv.setParentId(v || 0);
                        this.injectBtn.disabled = (v || 0) < 0;
                        this.refresh();
                }));
    }

    private inject() {
        const dialogRef = this.dialog.open(LtmInjectionComponent, {
            width: '500px',
            height: '290px',
            disableClose: true
        });

        dialogRef
            .afterClosed()
            .subscribe(result => {
                if (result && result['count']) {
                    this.snackBarSrv.showMessage('COMMON_SUCCESS');
                    this.refresh(() => this.shellSrv.setLoading(false));
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
    }
}
