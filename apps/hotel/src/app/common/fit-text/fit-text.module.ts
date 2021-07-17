import {
    NgModule,
} from '@angular/core';
import { FitTextDirective } from './fit-text.directive';

@NgModule({
    declarations: [FitTextDirective],
    exports: [FitTextDirective]
})
export class FitTextModule {
}
