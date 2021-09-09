import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ReportViewerComponent } from './report-viewer.component';
import { Observable } from 'rxjs';

@Injectable()
export class ReportViewerService {

    constructor(public matDialog: MatDialog) {
    }

    public print(url, app, selectedId): Observable<any> {
        let dialogRef: MatDialogRef<ReportViewerComponent>;
        const config = new MatDialogConfig();
        config.width = '80%';
        config.height = '95%';
        config.disableClose = true;
        dialogRef = this.matDialog.open(ReportViewerComponent, config);
        if (url) {
            dialogRef.componentInstance.url = url;
        }
        dialogRef.componentInstance.filter = app;
        dialogRef.componentInstance.selectedId = selectedId;
        dialogRef.componentInstance.getReport();
        return dialogRef.afterClosed();
    }
}
