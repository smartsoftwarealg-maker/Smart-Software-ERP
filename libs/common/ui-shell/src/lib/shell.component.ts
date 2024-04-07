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
import { NestedTreeControl } from '@angular/cdk/tree';
import { CENTER_SELECT_URL, LanguageService, LoginService, SideNavNode } from '@ss/common/api-common';
import {UserRightsService} from '@ss/common/api-common';
import { Router } from '@angular/router';

@Component({
    selector: 'ss-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
    private router = inject(Router);

    // todo: disable all buttons on toolbar when loading

    @ViewChild('routerContainer') routerContainer: ElementRef;
    @ViewChild('shellDiv') shellDiv: ElementRef;

    public showSideNav = false;
    public lastScroll = 0;
    // side nav
    treeControl = new NestedTreeControl<SideNavNode>(node => node.children);

    constructor(
        public loginSrv: LoginService,
        public langSrv: LanguageService,
        public shellSrv: ShellService,
        protected cdRef: ChangeDetectorRef,
        private rightsSrv: UserRightsService) { }

    ngOnInit() {
        this.shellSrv.setUpdateShellFn(null);
        this.shellSrv.setShowToolbarFn(this.showToolbar);
        this.check();
        this.rightsSrv
            .load()
            .subscribe(() => {
                // this.shellSrv.setSideNavDataSource(navBar);
                this.shellSrv.filterSideNav();
            });
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


    @HostListener('window:resize', ['$event'])
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
        this.router.navigate(['/' + CENTER_SELECT_URL]).then();
    }
}
