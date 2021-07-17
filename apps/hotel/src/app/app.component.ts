import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { LoadingState } from './common/util';
import { LanguageService } from '@ss/common/api-common';
import { HttpService } from './smart-lib/common/http.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    loadingState: LoadingState = LoadingState.LOADING;

    constructor(public httpSrv: HttpService,
        private langSrv: LanguageService) {
        // http & l10n
        httpSrv.init()
            .pipe(
                switchMap(() => this.langSrv.init())
            )
            .subscribe(() => {
                this.loadingState = LoadingState.COMPLETE;
            }, err => {
                this.loadingState = LoadingState.ERROR;
                throw err;
            });
    }

    // todo: enable in final release.
    // @HostListener('window:beforeunload', ['$event'])
    // unloadNotification($event: any) {
    //     // if (this.hasUnsavedData()) {
    //     $event.returnValue = true;
    //     // }
    // }
}
