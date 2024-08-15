import {Component} from '@angular/core';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Asset} from '../assets-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { IsParamService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import {AssetsService} from '../services/assets.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {DuplicateDialogComponent} from '../duplicate-dialog/duplicate-dialog.component';
import {Sort} from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { CommonUiImageInputModule } from '@ss/common/ui-image-input';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { AppArchiveModule } from '@ss/common/app-archive';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'ss-assets-list',
    templateUrl: './assets-list.component.html',
    styleUrls: ['./assets-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        CommonUiImageInputModule,
        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,
        AppArchiveModule,
        QRCodeModule
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

    displayedColumns = this.DEF_COLS;

    private duplicateBtn: ToolbarButton = {
        disabled: true,
        icon: 'fa-solid fa-copy',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'ASSET_DUPLICATE_SELECTED',
        visible: true,
        click: () => this.duplicate(),
    }

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
    }

    override preload(): Observable<any> {
        return this.isParamSrv
            .is('AQS')
            .pipe(tap(res => res? this.displayedColumns = this.AQS_COLS : this.DEF_COLS));
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.duplicateBtn);
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
        this.deleteButton.disabled = row.isFinal;
    }

}
