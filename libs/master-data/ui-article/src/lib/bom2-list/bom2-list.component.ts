import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { BomService } from '../bom.service';
import { BOM, BOMTree } from '@ss/master-data/api-article';
import { MatTree, MatTreeNestedDataSource } from '@angular/material/tree';
import { MatButtonModule } from '@angular/material/button';
import { LanguageService, MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { BomDialogComponent } from '../bom-dialog/bom-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { map, of, switchMap } from 'rxjs';
import { TranslateDirective } from '@ss/common/ui-lang';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ClassService } from '@ss/common/api-lookup';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { Bom2Service } from '../bom2.service';

@Component({
    selector: 'ss-bom-list',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MaterialModule,
        TranslateDirective,
        PaginationComponent
    ],
    templateUrl: './bom2-list.component.html',
    styleUrl: './bom2-list.component.css',
})
export class Bom2ListComponent extends BaseEntityListComponent<BOM> {
    displayedColumns = ['productDescription', 'description', 'from', 'to', 'version'];

    constructor(
        public entitySrv: Bom2Service,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public override router: Router,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(entitySrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'LOGISTICS_BOM');
        this.pagination.pageSize = 10;
    }

}
