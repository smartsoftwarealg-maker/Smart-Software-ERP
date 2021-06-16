import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar} from '@angular/material';
import {LanguageService} from 'smart-shared';
import {Observable} from 'rxjs';


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
        this.config.panelClass = ['theme-background-primary'];
        this.errorConfig.panelClass = ['theme-background-warn'];
    }

    public showMessage(msg: string, skipTranslation: boolean = false, isError = false): MatSnackBarRef<SimpleSnackBar> {
        const finalMsg = skipTranslation ? msg : this.langSrv.translate(msg);
        return this.snackBar.open(finalMsg, '', isError ? this.errorConfig : this.config);
    }

    public showSuccessMessage() {
        return this.showMessage('SUCCESS', false, false);
    }

    public showFailureMessage(error?: Error | string) {
        // todo: use the error this parameter
        console.log(error);
        return this.showMessage('FAILURE', false, true);
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
