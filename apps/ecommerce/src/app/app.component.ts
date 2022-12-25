import {RouterModule} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {HeaderPageComponent} from '@ss/sales/ecommerce';
import {HttpService, LanguageService, LoginService} from '@ss/common/api-common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppConfigService, DecService} from '@ss/common/api-common';
import {switchMap, tap} from 'rxjs/operators';
import {UiThemeModule} from '@ss/common/ui-theme';
import {UiErrorHandlerModule} from '@ss/common/ui-error-handler';
import {CustomErrorHandlerService} from '@ss/common/ui-error-handler';
import {langAssets} from '../environments/environment';
import {CommonModule} from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule,
              RouterModule,
              HttpClientModule,
              HeaderPageComponent,
              HttpClientModule,
              UiThemeModule,
              UiErrorHandlerModule],
    providers: [AppConfigService,
                LanguageService,
                LoginService,
                HttpService,
                HttpService,
                AppConfigService,
                CustomErrorHandlerService,
                DecService,
                HttpClient],
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    loaded = false;

    constructor(private httpSrv: HttpService,
                public langSrv: LanguageService,
                private loginSrv: LoginService) {
        langAssets.forEach(e => langSrv.addSource(e[0], e[1]));
    }

    ngOnInit() {
        this.loginSrv.anonymous(null);
            this.httpSrv
                .init()
                .pipe(switchMap(() => this.langSrv.init()))
                .subscribe({
                    next: () => this.loaded = true
                })
    }
}
