import { inject, Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {LanguageService} from '@ss/common/api-common';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar} from '@angular/material/snack-bar';
import { isString } from '@ss/common/api-common';


@Injectable({providedIn: 'root'})
export class SnackBarService {
    private snackBar  = inject( MatSnackBar);
    private langSrv  = inject( LanguageService);
    private readonly config: MatSnackBarConfig;
    private readonly errorConfig: MatSnackBarConfig;

    constructor() {
        this.config = new MatSnackBarConfig();
        this.errorConfig = new MatSnackBarConfig();

        this.config.duration = 2500;
        this.errorConfig.duration = 3500;

        this.config.direction = this.langSrv.rtl ? 'rtl' : 'ltr';
        this.errorConfig.direction = this.langSrv.rtl ? 'rtl' : 'ltr';

        this.config.panelClass = ['b-primary', 'snackbar-no-ad'];
        this.errorConfig.panelClass = ['b-warn', 'snackbar-no-ad'];

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
        const s = obsrv.subscribe({
            next: () => {
                this.showSuccessMessage();
                if (s != null) {
                    s.unsubscribe();
                }
            }, error: e => {
                this.showFailureMessage(e);
                if (s != null) {
                    s.unsubscribe();
                }
            }
        });
    }

    set hasAd(value: boolean) {
        this.config.panelClass = value? ['b-primary', 'snackbar-with-ad']: ['b-primary', 'snackbar-no-ad'];
        this.errorConfig.panelClass = value? ['b-warn', 'snackbar-with-ad'] : ['b-warn', 'snackbar-no-ad'];
    }
}
