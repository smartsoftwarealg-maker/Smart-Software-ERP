import { Component } from '@angular/core';
import {HttpService, LanguageService, LoginService} from '@ss/common/api-common';
import {catchError, switchMap, tap} from 'rxjs/operators';
import {langAssets} from '../environments/environment';
import { NgIf } from '@angular/common';
import { ThemeDirective } from '../../../../libs/common/ui-theme/src/lib/theme.directive';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../../../../libs/common/ui-error-handler/src/lib/error-message.component';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        ThemeDirective,
        RouterOutlet,
        MessageComponent,
    ],
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
