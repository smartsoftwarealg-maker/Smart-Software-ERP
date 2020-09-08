import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CENTER_SELECT_URL, CanActivateService } from '@ss/common/api-common';
import { CenterSelectComponent } from './center-select.component';
import { Routes, RouterModule } from '@angular/router';
import { UiLangModule } from '@ss/common/ui-lang';

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
        MaterialModule,
        UiLangModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        CenterSelectComponent
    ],
    exports: [
        CenterSelectComponent
    ]
})
export class UiCenterSelectModule { }
