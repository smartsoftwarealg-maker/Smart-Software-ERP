import { Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { LanguageService } from '@ss/common/ui-lang';
import { ShellService, SideNavNode } from './shell.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { User, UserContext, UserService } from '@ss/common/api-common';
import {AppContextService} from '../../../api-common/src/lib/app-context.service';
import {switchMap} from 'rxjs/operators';
import {AccessRightsService} from '../../../api-common/src/lib/access-rights.service';

@Component({
    selector: 'ss-shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {

    // todo: disable all buttons on toolbar when loading

    @ViewChild('routerContainer') routerContainer: ElementRef;
    @ViewChild('shellDiv') shellDiv: ElementRef;

    public showSideNav = false;
    public lastScroll = 0;
    // side nav
    treeControl = new NestedTreeControl<SideNavNode>(node => node.children);

    constructor(public langSrv: LanguageService,
                public shellSrv: ShellService,
                protected cdRef: ChangeDetectorRef,
                protected usersSrv: UserService,
                private rightsSrv: AccessRightsService,
                public contextSrv: AppContextService) { }

    ngOnInit() {
        this.shellSrv.setUpdateShellFn(null);
        this.shellSrv.setShowToolbarFn(this.showToolbar);
        this.check();
        // this.usersSrv.load()
        //     .pipe(switchMap(res => this.contextSrv.load()),
        //          switchMap(res => this.rightsSrv.load()))
        //     .subscribe(() => this.showSideNav = true);
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
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.check();
    }

    check(): void {
        const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const open = vw >= 1000;
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
}
