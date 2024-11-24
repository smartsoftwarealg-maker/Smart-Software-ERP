import { Component, EventEmitter, Output } from '@angular/core';
import { NavService } from '../nav.service';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '@ss/common/api-common';
import { MatIconButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { MatMenuTrigger, MatMenu } from '@angular/material/menu';
import { ThemeSelectComponent } from '../../smart-lib/components/theme/theme-select.component';
import { LanguageSelectComponent } from '../../smart-lib/components/language/language-select.component';
import { LogoutComponent } from '../../smart-lib/components/login/logout.component';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss'],
    standalone: true,
    imports: [MatIconButton, NgIf, RouterLink, TranslateDirective, MatMenuTrigger, MatMenu, ThemeSelectComponent, LanguageSelectComponent, LogoutComponent]
})
export class NavBarComponent {
    @Output()
    toggleSideNav = new EventEmitter();

    constructor(public navSrv: NavService, public langSrv: LanguageService, public router: Router) {
    }

    emitToggleSideNav(): void {
        this.toggleSideNav.emit();
    }

    goBack(): void {
        const params = new URLSearchParams(window.location.search);
        const cmd = params.get('referer');
        if (cmd) {
            this.router.navigate([cmd]);
        } else {
            let url = this.router.url;
            const i = url.lastIndexOf('/');
            if (i > -1) {
                url = url.substring(0, i);
                this.router.navigate([url]);
            }
        }
    }
}
