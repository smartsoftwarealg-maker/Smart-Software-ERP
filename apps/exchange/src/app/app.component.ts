import { Component, OnInit } from '@angular/core';
import {HttpService, LanguageService, UserRightsService} from '@ss/common/api-common';
import { switchMap } from 'rxjs/operators';
import { ShellService } from '@ss/common/ui-shell';
import { administrationNavTree } from './administration/side-nav-tree';
import { fileNavTree, exchangeNavTree } from './exchange/side-nav-tree';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    loaded = false;

    constructor(private httpSrv: HttpService,
        public shellSrv: ShellService,
        public langSrv: LanguageService) {
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Currency Exchange, Ver. 0.0.2 Beta');
        this.httpSrv.init()
            .pipe(switchMap(() => this.langSrv.init()))
            .subscribe(() => {
                this.shellSrv.setSideNavDataSource([
                    administrationNavTree,
                    fileNavTree,
                    exchangeNavTree
                ]);
                this.loaded = true;
            });
    }
}
