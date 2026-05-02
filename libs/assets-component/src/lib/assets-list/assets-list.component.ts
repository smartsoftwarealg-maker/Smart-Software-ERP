import { Component, signal } from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Asset} from '../assets-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { IsParamService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {AssetsService} from '../services/assets.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {DuplicateDialogComponent} from '../duplicate-dialog/duplicate-dialog.component';
import {Sort} from '@angular/material/sort';
import { CommonModule } from '@angular/common';



import { DatePickerComponent } from '@ss/common/ui-datepicker';



import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-assets-list',
    templateUrl: './assets-list.component.html',
    styleUrls: ['./assets-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        RouterModule,
        PaginationComponent
    ]
})
export class AssetsListComponent extends BaseEntityListComponent<Asset> {
    private DEF_COLS = [
        'reference',
        'description',
        'accountno',
        'acquisitionDate',
        'serviceDate',
        'acquisitionValue',
        'depreciationRate',
        'useful_life',
        'residualValue',
    ];

    private AQS_COLS = [
        'reference',
        'description',
        'accountno',
        'acquisitionDate',
        'serviceDate',
        'acquisitionValue',
        'officeDescription',
        'beneficiary',
        'serial_no',
        'receptionNumber',
        'appointmentNumber',
        'depreciationRate',
        // 'useful_life',
        // 'residualValue',
    ];

    private duplicateBtn: ToolbarButton = {
        disabled: true,
        icon: 'fa-solid fa-copy',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'ASSET_DUPLICATE_SELECTED',
        visible: true,
        click: () => this.duplicate(),
    }

    private activeOnlyBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-toggle-off',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'COMMON_SHOW_ALL',
        visible: true,
        click: () => this.toggleActivity(),
    }

    displayedColumns = signal(this.DEF_COLS);
    activeOnly = signal(false);


    constructor(public listSrv: AssetsService,
                public override shellSrv: ShellService,
                public override snackBarSrv: SnackBarService,
                public override route: ActivatedRoute,
                public override router: Router,
                public override defReportSrv: DefaultReportService,
                public override confirmationSrv: ConfirmationDialogService,
                public override pagPersistSrv: PaginatorPersistenceService,
                private dialog: MatDialog,
                private isParamSrv: IsParamService) {
        super(listSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            confirmationSrv,
            defReportSrv,
            pagPersistSrv,
            'ASSETS');
        this.pagination.pageSize = 10;
        this.listSrv.activeOnly = false;
    }

    override preload(): Observable<any> {
        return this.isParamSrv
            .is('AQS')
            .pipe(tap(res => this.displayedColumns.set(res?  this.AQS_COLS : this.DEF_COLS)));
    }

    protected override postInit():any{
        return  super.postInit().
            pipe(tap(() => {
            this.shellSrv.addButton(this.duplicateBtn);
            this.shellSrv.addButton(this.activeOnlyBtn);
        }));
    }


    private duplicate() {
        if (!!this.selected) {
            const dialogRef = this.dialog.open(DuplicateDialogComponent, {
                disableClose: true,
                width: '400px',
                height: '150px',
                data: { id: this.selected}
            });
            dialogRef
                .afterClosed()
                .subscribe(res => {
                    if (res['success'] === true) {
                        this.snackBarSrv.showSuccessMessage();
                    }
                });
        }
    }

    override selectRow(row: Asset) {
        super.selectRow(row);
        this.duplicateBtn.disabled = !row?.id;
        this.deleteButton.disabled = row.isFinal||false;
    }

    private toggleActivity() {
        this.listSrv.toggleActivity();
        this.activeOnly.set(this.listSrv.activeOnly);
        this.activeOnlyBtn.label = this.listSrv.activeOnly ? 'COMMON_SHOW_ALL' : 'COMMON_SHOW_ACTIVE_ONLY';
        this.activeOnlyBtn.icon = this.listSrv.activeOnly ? 'fa-solid fa-toggle-on' : 'fa-solid fa-toggle-off';
        this.refresh();
    }
}
