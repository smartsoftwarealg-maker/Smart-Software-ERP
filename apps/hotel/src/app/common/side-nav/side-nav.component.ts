import { Component, EventEmitter, Output } from '@angular/core';
import { NavService } from '../nav.service';
import { LanguageService } from '@ss/common/api-common';
import { MatTree, MatTreeNodeDef, MatTreeNode, MatTreeNodeToggle, MatNestedTreeNode, MatTreeNodeOutlet } from '@angular/material/tree';
import { RouterLink } from '@angular/router';
import { TranslateDirective } from '../../../../../../libs/common/ui-lang/src/lib/translate.directive';
import { MatIconButton } from '@angular/material/button';
import { NgIf } from '@angular/common';


@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss'],
    standalone: true,
    imports: [MatTree, MatTreeNodeDef, MatTreeNode, MatTreeNodeToggle, RouterLink, TranslateDirective, MatNestedTreeNode, MatIconButton, NgIf, MatTreeNodeOutlet]
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
