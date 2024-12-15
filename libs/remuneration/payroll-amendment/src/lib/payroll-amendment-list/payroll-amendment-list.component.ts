import {Component, OnInit} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Amendment, Comparison} from '../payroll-amendment.class';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {PayrollAmendmentService} from '../payroll-amendment.service';
import {of, switchMap, tap} from 'rxjs';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import { CommonModule } from '@angular/common';




import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
  selector: 'ss-payroll-amendment-list',
  templateUrl: './payroll-amendment-list.component.html',
  styleUrls: ['./payroll-amendment-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
       


        PaginationComponent
    ]
})
export class PayrollAmendmentListComponent extends BaseEntityListComponent<Amendment> implements OnInit {
    private deleteAllButton: ToolbarButton = {
        icon: 'fas fa-tally',
        label: 'COMMON_DELETE_ALL',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.deleteAll()
    };

    private comparisonButton: ToolbarButton = {
        icon: 'fas fa-not-equal',
        label: 'REMUN_COMPARISON',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.comparison()
    };

    private generateButton: ToolbarButton = {
        icon: 'fas fa-file-signature',
        label: 'COMMON_GENERATE',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.generate()
    };

    displayedColumns = [
        'employee',
        'lastName',
        'firstName',
        'applicationMonth',
        'element',
        'new_value',
        'percentage'
    ];
    comparisonData: Comparison[] = [];
    comparisonDisplayedColumns = [
        'paymonth',
        'description',
        'newValue',
        'oldValue',
        'difference',
        'destination'
    ];
    constructor(public amendSrv: PayrollAmendmentService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override confirmationSrv: ConfirmationDialogService,
                public override defReportSrv: DefaultReportService,
                public override pagPersistSrv: PaginatorPersistenceService,
                private monthSelectorSrv: PayrollMonthService) {
        super(amendSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'REMUN_AMENDMENTS');
    }


    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.deleteAllButton);
        this.shellSrv.addButton(this.generateButton);
        this.monthSelectorSrv
            .isUpdatableMonth()
            .subscribe(upd => {
                this.editButton.visible = upd;
                this.deleteButton.visible = upd;
                this.addButton.visible = upd;
            });
    }

    override refresh(callback?: () => void) {
        super.refresh(() => {
            this.deleteAllButton.disabled = this.data.length < 1;
            this.generateButton.disabled = this.deleteAllButton.disabled;
        });
    }

    override selectRow(row: Amendment) {
        super.selectRow(row);
        if (row) {
            this.comparison();
        }
        this.comparisonButton.disabled = row == null || !row.id;
    }

    deleteAll() {
        this.confirmationSrv
            .confirmDelete()
            .pipe(tap(res => this.shellSrv.setLoading(res)),
                switchMap(res => res ? this.amendSrv.deleteAll() : of(res)))
            .subscribe({
                next: res => {
                    this.shellSrv.setLoading(false);
                    if (typeof res !== 'boolean') {
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

    comparison() {
        this.amendSrv
            .comprison(this.selected)
            .subscribe(res => this.comparisonData = res);
    }
    generate() {
        this.confirmationSrv
            .confirm('REMUN_AMENDMENT', 'COMMON_GENERATE')
            .pipe(switchMap(yes => yes? this.amendSrv.generate(): of(null)))
            .subscribe(res => {
                if (res && res['count']) {
                    this.snackBarSrv.showSuccessMessage()
                }
            });
    }
}
