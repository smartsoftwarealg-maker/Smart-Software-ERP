import { Component, Input } from '@angular/core';
import { LanguageService } from '@ss/common/api-common';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-basic-shell',
    templateUrl: './basic-shell.component.html',
    standalone: true,
    imports: [MatSidenavContainer, MatSidenav, SideNavComponent, MatSidenavContent, NavBarComponent, NgIf, RouterOutlet]
})
export class BasicShellComponent {
    @Input()
    public hasContent = false;

    constructor(public langSrv: LanguageService) {
    }
}
