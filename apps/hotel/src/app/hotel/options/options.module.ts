import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsComponent } from './options.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerModule } from '../../smart-lib/components/loading-spinner/loading-spinner.module';
import { SmartCommonModule } from '../../smart-lib/common/smart-common.module';
import { LanguageService } from '@ss/common/api-common';
import { MaterialModule } from '../../smart-lib/components/material.module';
import { CanActivateService } from '../../smart-lib/components/login/can-activte.service';

const routes: Routes = [
    {
        path: '',
        component: OptionsComponent,
        canActivate: [CanActivateService]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        LoadingSpinnerModule,
        SmartCommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        OptionsComponent
    ]
})
export class OptionsModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('assets/locale/hotel/options/', 'HTL_OPT_');
    }
}
