import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LanguageService} from '@ss/common/ui-lang';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar} from '@angular/material/snack-bar';
import { isString } from '@ss/common/api-common';


@Injectable({providedIn: 'root'})
export class SnackBarService {

    private readonly config: MatSnackBarConfig;
    private readonly errorConfig: MatSnackBarConfig;

    constructor(public snackBar: MatSnackBar, private langSrv: LanguageService) {
        this.config = new MatSnackBarConfig();
        this.errorConfig = new MatSnackBarConfig();

        this.config.duration = 2500;
        this.errorConfig.duration = 3500;

        this.config.direction = langSrv.rtl ? 'rtl' : 'ltr';
        this.errorConfig.direction = langSrv.rtl ? 'rtl' : 'ltr';

        this.config.panelClass = ['b-primary'];
        this.errorConfig.panelClass = ['b-warn'];

        this.config.horizontalPosition = 'center';
        this.errorConfig.horizontalPosition = 'center';
    }

    public showMessage(msg: string, skipTranslation: boolean = false, isError = false): MatSnackBarRef<SimpleSnackBar> {
        const finalMsg = skipTranslation ? msg : this.langSrv.translate(msg);
        return this.snackBar.open(finalMsg, '', isError ? this.errorConfig : this.config);
    }

    public showSuccessMessage() {
        return this.showMessage('COMMON_SUCCESS', false, false);
    }

    public showFailureMessage(error?: Error | string) {
        let msg;
        if (error) {
            if (isString(error)) {
                msg = this.langSrv.translate(error as string);
            } else {
                const e = error as Error;
                msg = e.message;
            }
        } else {
            msg = this.langSrv.translate('COMMON_FAILURE');
        }
        return this.showMessage(msg, true, true);
    }

    public showResult(obsrv: Observable<any>): void {
        const s = obsrv.subscribe(() => {
            this.showSuccessMessage();
            if (s != null) {
                s.unsubscribe();
            }
        }, e => {
            this.showFailureMessage(e);
            if (s != null) {
                s.unsubscribe();
            }
        });
    }

}
