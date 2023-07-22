import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { HttpService } from '../../../common/http.service';

@Component({
    selector: 'ss-report-viewer',
    templateUrl: './report-viewer.component.html',
    styleUrls: ['./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnDestroy {
    public url = '/reports/view';
    public filter;
    public selectedId;
    public pdfSrc;

    constructor(public dialogRef: MatDialogRef<ReportViewerComponent>, private http: HttpService) {}

    getReport() {
        this.release();
        this.http
            .getBlob(this.url + '?id=' + this.selectedId + '&entity=' + this.filter)
            .pipe(map((res: any) => new Blob([res.body], { type: 'application/pdf' })))
            .subscribe(res => {
                this.pdfSrc = window.URL.createObjectURL(res);
                // this.pdfSrc = res;
            });
    }

    release(): void {
        if (this.pdfSrc) {
            window.URL.revokeObjectURL(this.pdfSrc);
            this.pdfSrc = null;
        }
    }

    ngOnDestroy(): void {
        this.release();
    }
}
