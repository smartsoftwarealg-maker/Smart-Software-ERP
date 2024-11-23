import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicShellComponent } from './basic-shell.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { SideNavModule } from '../side-nav/side-nav.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        NavBarModule,
        SideNavModule,
        RouterModule,
        BasicShellComponent,
    ],
    exports: [
        BasicShellComponent
    ]
})
export class BasicShellModule {
}
