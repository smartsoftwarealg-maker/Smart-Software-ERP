import { Component, OnInit } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { switchMap } from 'rxjs/operators';
import { LanguageService } from '@ss/common/ui-lang';
import { ShellService } from '@ss/common/ui-shell';
import { administrationNavTree } from './administration/side-nav-tree';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    loaded = false;

    constructor(private httpSrv: HttpService, public shellSrv: ShellService, public langSrv: LanguageService) {
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Currency Exchange (pre-Alpha)');
        this.shellSrv.setSideNavDataSource([
            administrationNavTree
        ]);
        this.httpSrv.init()
            .pipe(switchMap(() => this.langSrv.init()))
            .subscribe(() => this.loaded = true)
    }

}
