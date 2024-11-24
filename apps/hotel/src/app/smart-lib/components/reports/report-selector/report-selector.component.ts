import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { ReportCatalog } from '../report-catalog';
import { HttpService } from '../../../common/http.service';
import { PaginationModel, PaginationComponent } from '../../../../common/pagination/pagination.component';
import { TranslateDirective } from '../../../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor, NgClass } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'ss-report-selector',
    styleUrls: ['./report-selector.component.css'],
    templateUrl: './report-selector.component.html',
    standalone: true,
    imports: [TranslateDirective, CdkScrollable, MatDialogContent, MatList, NgFor, MatListItem, NgClass, MatDivider, PaginationComponent, MatDialogActions, MatButton]
})
export class ReportSelectorComponent {

    public selectedRecord: any;
    public filter = 'HOTEL_VIEW';
    public url = '/reports/catalog';
    public records: ReportCatalog[] = [];
    public pModel: PaginationModel = PaginationModel.newInstance({ page: 1, pageSize: 5, elementCount: 0 });

    constructor(public dialogRef: MatDialogRef<ReportSelectorComponent>, private http: HttpService) {
        this.pModel.onChange = () => this.pageChanged(this.pModel.page);
    }

    selectReport() {
        this
            .http
            .put('/reports/userInfo?id=' + this.selectedRecord.id + '&filter=' + this.filter)
            .subscribe(res => this.dialogRef.close(this.selectedRecord));
    }

    onSelect(item: any) {
        this.selectedRecord = item;
    }

    pageChanged(page: number) {
        this.pModel.page = page ? page : 1;
        this.load();
    }

    load() {
        this
            .http
            //.get<ReportCatalog[]>(this.url + `?page=${this.pModel.page - 1}-${this.pModel.pageSize}`)
            .getData(this.url, this.pModel.page - 1, this.pModel.pageSize)
            .subscribe((res: any) => {
                this.records = res.body;
                this.pModel.elementCount = res['itemCount'] || 0;
            });
    }
}
