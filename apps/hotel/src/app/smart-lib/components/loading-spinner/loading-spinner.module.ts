import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { MaterialModule } from '../material.module';


@NgModule({
    exports: [
        LoadingSpinnerComponent
    ],
    imports: [
    CommonModule,
    MaterialModule,
    LoadingSpinnerComponent
]
})
export class LoadingSpinnerModule {
}
