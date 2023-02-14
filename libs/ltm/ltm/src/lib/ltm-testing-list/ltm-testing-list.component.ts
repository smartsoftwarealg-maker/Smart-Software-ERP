import { Component, OnInit } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {LTMLine, LTMLineMatter, LTMMatter, LTMTest, LTMTesting} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
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

@Component({
    selector: 'ss-ltm-testing-list',
    templateUrl: './ltm-testing-list.component.html',
    styleUrls: ['./ltm-testing-list.component.scss'],
})
export class LtmTestingListComponent extends BaseEntityListComponent<LTMTesting> implements OnInit {
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
        private lineSrv: LtmLineService,
        private matterSrv: LtmLineMatterService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LTM_TESTINGS');
        this.lines$ = this.lineSrv
            .getList(0, 50)
            .pipe(map(_ => _.body));
    }

    override ngOnInit() {
        super.ngOnInit();
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
                        this.refresh();
                }));
    }
}
