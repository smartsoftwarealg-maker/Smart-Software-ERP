import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BasicShellComponent} from './basic-shell.component';
import {NavBarModule} from '../nav-bar/nav-bar.module';
import {SideNavModule} from '../side-nav/side-nav.module';
import {MaterialModule} from '../material.module';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        NavBarModule,
        SideNavModule,
        RouterModule,
    ],
    declarations: [
        BasicShellComponent,
    ],
    exports: [
        BasicShellComponent
    ]
})
export class BasicShellModule {
}
