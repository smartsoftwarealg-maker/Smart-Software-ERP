import {inject, Injectable} from '@angular/core';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {Observable} from 'rxjs';
import {LanguageService} from '@ss/common/api-common';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';


@Injectable({
    providedIn: 'root'
})
export class ConfirmationDialogService {
    private langSrv  = inject( LanguageService);
    private matDialog  = inject( MatDialog);

    public confirmDelete(): Observable<boolean> {
        return this.confirm(null, 'COMMON_CONFIRM_DELETE_RECORD');
    }

    public confirmDontSave(): Observable<boolean> {
        return this.confirm(null, 'COMMON_CONFIRM_DONT_SAVE');
    }

    public confirm(title: string, message: string, translateTitle: boolean = true, translateMessage: boolean = true): Observable<boolean> {
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.width = '400px';
        config.maxWidth = '100%';
        config.data = {
            subject: translateTitle ? this.langSrv.translate(title) : title,
            message: translateMessage ? this.langSrv.translate(message) + '?' : message,
        };
        return this.matDialog.open(ConfirmationDialogComponent, config).afterClosed();
    }
}
