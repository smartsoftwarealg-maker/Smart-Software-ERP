import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {SideNavComponent} from './side-nav.component';
import {RouterModule} from '@angular/router';
import {SmartCommonModule} from 'smart-shared';

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
