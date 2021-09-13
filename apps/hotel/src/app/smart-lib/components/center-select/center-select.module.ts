import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterSelectComponent } from './center-select.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CentersService } from './centers.service';
import { LanguageModule } from '../language/language.module';
import { MaterialModule } from '../material.module';
import { RouterModule, Routes } from '@angular/router';
import { CENTER_SELECT_URL } from './center-select-constants';
import { CanActivateService } from '../login/can-activte.service';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { HttpClientModule } from '@angular/common/http';
import { SmartCommonModule } from '../../common/smart-common.module';
import { LanguageService } from '@ss/common/api-common';

const routes: Routes = [
    {
        path: CENTER_SELECT_URL,
        component: CenterSelectComponent,
        canActivate: [CanActivateService]
    }
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LanguageModule,
        MaterialModule,
        HttpClientModule,
        LoadingSpinnerModule,
        SmartCommonModule,
        RouterModule.forChild(routes)
    ],
    declarations: [CenterSelectComponent],
    exports: [CenterSelectComponent],
    providers: [
        CentersService
    ]
})
export class CenterSelectModule {
    constructor(private langSrv: LanguageService) {
        langSrv.addSource('assets/locale/lib/center-select/', 'C_C_');
    }
}
