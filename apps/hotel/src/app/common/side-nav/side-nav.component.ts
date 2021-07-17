import { Component, EventEmitter, Output } from '@angular/core';
import { NavService } from '../nav.service';
import { LanguageService } from '@ss/common/api-common';


@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
    @Output()
    closeSideNav = new EventEmitter();

    constructor(public navSrv: NavService, public langSrv: LanguageService) {
    }

    public hasChild = this.navSrv.hasChild;

    public isActive = this.navSrv.isActive;

    public emitCloseSideNav(): void {
        this.closeSideNav.emit();
    }
}
