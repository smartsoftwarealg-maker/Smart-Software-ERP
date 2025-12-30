import { Component, OnInit } from '@angular/core';
import {HttpService, LanguageService} from '@ss/common/api-common';
import { switchMap } from 'rxjs/operators';
import { ShellService } from '@ss/common/ui-shell';
import { exchangeNavTree } from './exchange/side-nav-tree';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AdService} from '@ss/common/api-admob';
import {RouterOutlet} from '@angular/router';
import {MessageComponent} from '@ss/common/ui-error-handler';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet, MessageComponent],
})
export class AppComponent implements OnInit {
    loaded = false;

    constructor(
        private httpSrv: HttpService,
        private shellSrv: ShellService,
        private deviceSrv: DeviceDetectorService,
        public langSrv: LanguageService,
        private adService: AdService
    ) {
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Currency Exchange, Ver. 0.0.2 Beta');
        this.httpSrv
            .init()
            .pipe(switchMap(() => this.langSrv.init()))
            .subscribe(() => {
                this.shellSrv.setSideNavDataSource(exchangeNavTree);
                this.loaded = true;
                if (this.deviceSrv.isMobile()) {
                    this.adService.showBanner();
                }
            });
    }
}
