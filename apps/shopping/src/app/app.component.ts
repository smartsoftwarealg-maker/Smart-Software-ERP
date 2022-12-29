import { Component } from '@angular/core';
import {HttpService, LanguageService, LoginService} from '@ss/common/api-common';
import {langAssets} from '../../../ecommerce/src/environments/environment';
import {catchError, switchMap, tap} from 'rxjs/operators';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    loaded = false;

    constructor(private httpSrv: HttpService,
                public langSrv: LanguageService,
                private loginSrv: LoginService) {
        //langAssets.forEach(e => langSrv.addSource(e[0], e[1]));
    }

    ngOnInit() {
        this.loginSrv
            .anonymous()
            .pipe(switchMap(_ => this.langSrv.init()),
                  switchMap(_ => this.langSrv.addSources(langAssets)),
                  catchError(err => {
                      console.error('eroorrrrrrrrrrrrrrrrr', err);
                      throw err;
                  }),
                  tap(_ => this.loaded = true))
            .subscribe({
                next: () => {
                    this.loaded = true;
                },
                error: err => {
                    throw err;
                },
                complete: () => {
                    this.loaded = true;
                }
            })

    }
}
