import {Component, OnInit} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import {LanguageService} from '@ss/common/api-common';
import {ShellService} from '@ss/common/ui-shell';
// import {logAdminNavTree} from './logistics-admin/side-nav-tree';

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
        this.shellSrv.setApplicationTitle('Customer Space (pre-Alpha)');
        this.shellSrv.setSideNavDataSource([
            //logAdminNavTree
        ]);
        this.httpSrv.init()
            .pipe(switchMap(() => this.langSrv.init()))
            .subscribe(() => this.loaded = true)
    }

}
