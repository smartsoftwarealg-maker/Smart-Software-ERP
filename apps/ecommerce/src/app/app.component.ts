import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import {HeaderPageComponent} from '@ss/sales/ecommerce';
import {HttpService, LanguageService, LoginService} from '@ss/common/api-common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {AppConfigService, DecService} from '@ss/common/api-common';

@Component({
    standalone: true,
    imports: [RouterModule, HeaderPageComponent, HttpClientModule],
    providers: [AppConfigService, LanguageService, LoginService, HttpService, DecService],
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ecommerce';
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('assets/locale/', '');
        langSrv.addSource('assets/locale/administration_', 'ADMINISTRATION_');
        langSrv.addSource('assets/locale/logistics_', 'LOGISTICS_');
        langSrv.addSource('assets/locale/common_', 'COMMON_')
    }

}
