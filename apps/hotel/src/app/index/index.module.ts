import { NgModule } from '@angular/core';
import { IndexComponent } from './index.component';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavService } from '../common/nav.service';
import { BasicShellModule } from '../common/basic-shell/basic-shell.module';
import { LoginModule } from '../smart-lib/components/login/login.module';
import { SmartCommonModule } from '../smart-lib/common/smart-common.module';
import { MaterialModule } from '../smart-lib/components/material.module';

const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports:
        [
            CommonModule,
            MaterialModule,
            LoginModule,
            BasicShellModule,
            SmartCommonModule,
            RouterModule.forChild(routes),
        ],
    declarations:
        [
            IndexComponent
        ],
    providers: [],
})
export class IndexModule {
    constructor(private navSrv: NavService) {
        const TAG = 'IndexModule';
        navSrv.setChildren(TAG, routes);
    }
}
