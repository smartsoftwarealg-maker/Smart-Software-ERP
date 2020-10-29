import {Injectable} from '@angular/core';
import {ConfirmationDialogComponent} from './confirmation-dialog.component';
import {Observable} from 'rxjs';
import {LanguageService} from '@ss/common/ui-lang';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

export interface ConfirmationResult {
    result: boolean;
    reason: string;
    checkbox: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ConfirmationDialogService {

    constructor(private langSrv: LanguageService, private matDialog: MatDialog) {
    }

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
            title: translateTitle ? this.langSrv.translate(title) : title,
            message: translateMessage ? this.langSrv.translate(message) : message,
        };
        return this.matDialog.open(ConfirmationDialogComponent, config).afterClosed();
    }

}
