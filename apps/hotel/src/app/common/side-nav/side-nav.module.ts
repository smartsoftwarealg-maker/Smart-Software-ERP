import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { RouterModule } from '@angular/router';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { MaterialModule } from '../../smart-lib/components/material.module';

@NgModule({
    imports: [
        CommonModule,
        SmartCommonModule,
        MaterialModule,
        RouterModule
    ],
    declarations: [
        SideNavComponent
    ],
    exports: [
        SideNavComponent
    ]
})
export class SideNavModule {
}
