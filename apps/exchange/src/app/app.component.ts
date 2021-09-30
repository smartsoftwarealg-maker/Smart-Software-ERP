import {Component, OnInit} from '@angular/core';
import {HttpService, LanguageService, LoginService} from '@ss/common/api-common';
import {switchMap} from 'rxjs/operators';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {administrationNavTree} from './administration/side-nav-tree';
import {exchangeNavTree, fileNavTree} from './exchange/side-nav-tree';

@Component({
    selector: 'ss-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    loaded = false;
    private optionsButton: ToolbarButton = null;
    private TITLES = new Map([
        ['1', 'COMMON_ALL'],
        ['2', 'EXCHANGE_WITHDRAWN'],
        ['3', 'EXCHANGE_NOT_WITHDRAWN']
    ]);

    constructor(private httpSrv: HttpService,
                private shellSrv: ShellService,
                private langSrv: LanguageService,
                private loginSrv: LoginService,
                private snackBarSrv: SnackBarService) {
    }

    ngOnInit() {
        this.shellSrv.setApplicationTitle('Currency Exchange, Ver. 0.1.0');
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

        const optionsButton: ToolbarButton = {
            icon: 'fas fa-tools',
            label: 'COMMON_OPTIONS',
            disabled: false,
            visible: true,
            keepOnToolbar: KeepOnToolbar.DYNAMIC,
            menuItems: [
                {
                    icon: 'fas fa-list-alt',
                    label: 'COMMON_ALL',
                    click: () => this.selectType(1),
                    disabled: false,
                    visible: true
                },
                {
                    icon: 'fas fa-minus-circle',
                    label: 'EXCHANGE_WITHDRAWN',
                    click: () => this.selectType(2),
                    disabled: false,
                    visible: true
                },
                {
                    icon: 'fas fa-plus-circle',
                    label: 'EXCHANGE_NOT_WITHDRAWN',
                    click: () => this.selectType(3),
                    disabled: false,
                    visible: true
                }]
        };
        this.shellSrv.setAppButtons([optionsButton]);
        this.optionsButton = optionsButton;
    }


    private selectType(aType: number) {
        this.httpSrv
            .put('/params', { param: 'type', value: aType })
            .subscribe(res => {
                if (res['ctx']) {
                    this.loginSrv.appCtx = res['ctx'];
                    this.loginSrv.updateAuthToken(res['jwt']);
                    this.snackBarSrv.showSuccessMessage();
                    this.optionsButton.label = this.TITLES.get(this.loginSrv.getAppParam('type') || '1') || 'COMMON_ALL';
                }
            });
    }
}
