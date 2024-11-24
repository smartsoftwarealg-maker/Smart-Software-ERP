import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportCatalogService } from './report-catalog.service';
import { ReportCatalogDataSource } from './report-catalog-data-source';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationModel, PaginationComponent } from '../../../../common/pagination/pagination.component';
import { SnackBarService } from '../../../../common/snack-bar.service'
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { TranslateDirective } from '../../../../../../../../libs/common/ui-lang/src/lib/translate.directive';

@Component({
    selector: 'ss-report-catalog',
    templateUrl: './report-catalog.component.html',
    styleUrls: ['./report-catalog.component.css'],
    standalone: true,
    imports: [MatTable, MatSort, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatSortHeader, TranslateDirective, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, PaginationComponent]
})
export class ReportCatalogComponent implements OnInit {

    displayedColumns = ['description', 'filename'];
    selectedId: number = null;
    dataSource: ReportCatalogDataSource;
    appName = 'hotel';
    pModel: PaginationModel = PaginationModel.newInstance({ page: 1, pageSize: 5, elementCount: 0 });

    constructor(private service: ReportCatalogService,
        private route: Router,
        private parent: ActivatedRoute,
        private snackbarSrv: SnackBarService) {
        this.dataSource = new ReportCatalogDataSource(this.service);
    }

    ngOnInit(): void {
        this.dataSource.loadReportCatalog();
    }

    select(id: number): void {
        this.selectedId = id;
    }

    public pageChange(model: PaginationModel) {
        this.dataSource.pagingModel.page = model.page;
        this.dataSource.loadReportCatalog();
    }

    onFilter(str: string): void {
        if (typeof str === 'string') {
            this.service.filter = str && str.length > 0 ? str : null;
            this.dataSource.loadReportCatalog();
        }
        this.selectedId = null;
    }

    sortData(event: any) {
        const sign = event && event.direction === 'asc' ? '' : '-';
        this.service.sortDirection = event ? sign + event.active : null;
        this.dataSource.loadReportCatalog();
    }

    onEdit(): void {
        this.route.navigate(['.', this.selectedId], { relativeTo: this.parent, queryParams: { appName: this.appName } });
    }

    onAdd(): void {
        this.route.navigate(['.', 0], { relativeTo: this.parent, queryParams: { appName: this.appName } });
    }

    onDelete() {
        if (this.selectedId) {
            this.service.deleteById(this.selectedId).subscribe(res => {
                this.dataSource.delete(this.selectedId);
                this.snackbarSrv.showSuccessMessage();
            });
        }
    }
}
