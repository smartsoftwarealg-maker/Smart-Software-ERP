import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ReportSelectorComponent } from './report-selector.component';
import { Observable } from 'rxjs';

@Injectable()
export class ReportSelectorService {

    constructor(public matDialog: MatDialog) {
    }

    open(url, app, selectedReport): Observable<any> {
        let dialogRef: MatDialogRef<ReportSelectorComponent>;
        const config = new MatDialogConfig();
        config.width = '600px';
        config.disableClose = true;
        dialogRef = this.matDialog.open(ReportSelectorComponent, config);
        if (url) {
            dialogRef.componentInstance.url = url;
        }
        dialogRef.componentInstance.filter = app;
        dialogRef.componentInstance.selectedRecord = selectedReport;
        return dialogRef.afterClosed();
    }
}
