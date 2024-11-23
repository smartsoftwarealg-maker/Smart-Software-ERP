import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SideNavComponent
],
    exports: [
        SideNavComponent
    ]
})
export class SideNavModule {
}
