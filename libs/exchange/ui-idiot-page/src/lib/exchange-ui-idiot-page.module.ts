import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdiotPageComponent } from './idiot-page.component';
import {MaterialModule} from "@ss/common/api-common";

@NgModule({
  imports: [CommonModule,
            MaterialModule],
  declarations: [
    IdiotPageComponent
  ],
    exports: [
        IdiotPageComponent
    ]
})
export class ExchangeUiIdiotPageModule {}
