import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OptionsComponent} from './options.component';
import {CommonModule} from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import {SmartCommonModule, LoadingSpinnerModule, LanguageService} from 'smart-shared';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
    {path: '', component: OptionsComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
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
        langSrv.addSource('/assets/locale/hotel/options/', 'HTL_OPT_');
    }
}
