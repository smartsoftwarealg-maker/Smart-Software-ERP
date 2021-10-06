import { Component } from '@angular/core';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from "@ss/common/ui-shell";
import {HttpService, LanguageService, LoginService} from "@ss/common/api-common";
import {switchMap} from "rxjs/operators";
import {adminNavTree} from "./admin/side-nav-tree";
import {patientNavTree} from "./patients/side-nav-tree";

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    loaded = false;

    constructor(private httpSrv: HttpService,
                private shellSrv: ShellService,
                public langSrv: LanguageService) {
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Currency Exchange, Ver. 0.1.0');
        this.httpSrv.init()
            .pipe(switchMap(() => this.langSrv.init()))
            .subscribe(() => {
                this.shellSrv.setSideNavDataSource([
                    adminNavTree,
                    // fileNavTree,
                    patientNavTree
                ]);
                this.loaded = true;
            });
    }

}
