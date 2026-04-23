import {
    Component,
    OnInit,
    OnDestroy,
    HostListener,
    ViewChild,
    ElementRef,
    AfterViewInit,
    ChangeDetectorRef,
    AfterViewChecked,
    inject
} from '@angular/core';
import { ShellService } from './shell.service';
import { CdkTree } from '@angular/cdk/tree';
import {
    CENTER_SELECT_URL,
    HttpService,
    LanguageService,
    LoginService, LoginType,
    MaterialModule,
    SideNavNode
} from '@ss/common/api-common';
import {UserRightsService} from '@ss/common/api-common';
import { Router, RouterModule } from '@angular/router';

import { LogoutComponent } from '@ss/common/ui-logout';

import { catchError, of, switchMap, tap } from 'rxjs';
import { LanguageSelectComponent } from '@ss/common/ui-lang';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ThemeSelectComponent } from '@ss/common/ui-theme';

@Component({
    selector: 'ss-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss'],
    standalone: true,
    imports: [
    RouterModule,
    MaterialModule,
    LogoutComponent,
    ThemeSelectComponent,
    LanguageSelectComponent,
    TranslatePipe,
    TranslateDirective
]
})
export class ShellComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
    #httpSrv = inject(HttpService);
    #rightsSrv = inject(UserRightsService);
    #router = inject(Router);

    protected shellSrv = inject(ShellService);
    protected loginSrv = inject(LoginService);
    protected cdRef = inject(ChangeDetectorRef);
    protected langSrv = inject(LanguageService);

    @ViewChild(CdkTree)
    tree!: CdkTree<SideNavNode>;

    // todo: disable all buttons on toolbar when loading

    @ViewChild('routerContainer') routerContainer: ElementRef;
    @ViewChild('shellDiv') shellDiv: ElementRef;

    public showSideNav = false;
    public lastScroll = 0;
    // side nav
    childrenAccessor = (dataNode: SideNavNode) => dataNode.children;

    ngOnInit() {
        this.#rightsSrv
            .load()
            .pipe(
                tap(() => this.shellSrv.filterSideNav()),
                switchMap(() => this.loginSrv.loadContext()),
                switchMap(() => this.shellSrv.companyName? of({ description: this.shellSrv.companyName }) : this.#httpSrv.get<any>('/ccenter')),
                catchError(() =>  of({ description: '' }))
            ).subscribe(res => {
                this.shellSrv.setCompanyName(res['description'] || '');
                this.shellSrv.filterSideNav();
        });
        this.shellSrv.setUpdateShellFn(null);
        this.shellSrv.setShowToolbarFn(this.showToolbar);
        this.check();
    }

    ngOnDestroy() {
        this.shellSrv.reset();
        this.shellSrv.setShowToolbarFn(null);
    }

    ngAfterViewInit() {
        this.routerContainer.nativeElement.onscroll = this.scrolled;
        this.lastScroll = this.routerContainer.nativeElement.scrollTop;
    }

    ngAfterViewChecked() {
        this.shellSrv.setUpdateShellFn(() => this.cdRef.detectChanges());
        if (this.shellSrv.focusSearchField) {
            const field = document.getElementById('shellSearchField');
            if (field) {
                field.focus();
                this.shellSrv.focusSearchField = false;
            }
        }
    }


    @HostListener('window:resize')
    onResize() {
        this.check();
    }

    check(): void {
        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const open = vw >= 2800;
        if (open !== this.showSideNav) {
            this.showSideNav = open;
        }
    }

    scrolled = () => {
        /*
                const s = this.routerContainer.nativeElement.scrollTop;
                if (s > 0 && s >= this.lastScroll) {
                    if (!this.showSideNav) {
                        this.hideToolbar();
                    }
                } else {
                    if (s + 10 < this.lastScroll) {
                        this.showToolbar();
                    }
                }
                this.lastScroll = s;
        */
    };

    showToolbar = () => {
        this.shellDiv.nativeElement.classList.remove('hidden-toolbar');
    };

    hideToolbar = () => {
        this.shellDiv.nativeElement.classList.add('hidden-toolbar');
    };

    hasChild = (_: number, node: SideNavNode) => !!node.children && node.children.length > 0;

    scrollTo(x: any): void {
        x.currentTarget.scrollIntoView({
            inline: 'center',
            behavior: 'smooth'
        });
    }

    centerSelect() {
        this.#router.navigate(['/' + CENTER_SELECT_URL]).then();
    }

    get isFetching () {
        return this.shellSrv.isFetching();
    }

    protected readonly LoginType = LoginType;
}
