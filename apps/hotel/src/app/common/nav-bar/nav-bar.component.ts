import {Component, EventEmitter, Output} from '@angular/core';
import {NavService} from '../nav.service';
import {LanguageService} from 'smart-shared';
import {Router} from '@angular/router';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
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
