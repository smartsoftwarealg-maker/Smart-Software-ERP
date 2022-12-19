import { RouterModule } from '@angular/router';
import {Component, inject, OnInit} from '@angular/core';
import {HeaderPageComponent} from '@ss/sales/ecommerce';
import {HttpService, LanguageService, LoginService} from '@ss/common/api-common';
import {HttpClientModule} from '@angular/common/http';
import {AppConfigService, DecService} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import {UiThemeModule} from '@ss/common/ui-theme';
import {UiErrorHandlerModule} from '@ss/common/ui-error-handler';
import {CustomErrorHandlerService} from '../../../../libs/common/ui-error-handler/src/lib/custom-error-handler.service';

@Component({
    standalone: true,
    imports: [RouterModule, HeaderPageComponent, HttpClientModule, UiThemeModule, UiErrorHandlerModule],
    providers: [AppConfigService,
                LanguageService,
                LoginService,
                HttpService,
                AppConfigService,
                CustomErrorHandlerService,
                DecService],
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    private httpSrv = inject(HttpService);
    title = 'ecommerce';
    constructor(public langSrv: LanguageService, private loginSrv: LoginService) {
        langSrv.addSource('assets/locale/', '');
        langSrv.addSource('assets/locale/administration_', 'ADMINISTRATION_');
        langSrv.addSource('assets/locale/logistics_', 'LOGISTICS_');
        langSrv.addSource('assets/locale/common_', 'COMMON_')
    }

    ngOnInit(): void {
        console.log('**********************main component');
        this.loginSrv.anonymous();
        this.httpSrv
            .init()
            .pipe(switchMap(() => this.langSrv.init()))
            .subscribe(() => {  });
    }
}
