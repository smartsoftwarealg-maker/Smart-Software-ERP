import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import {PayMethodService} from '@ss/logistics/api-logistics-common';

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class PurchasesModule {
    constructor() {
    }
}
