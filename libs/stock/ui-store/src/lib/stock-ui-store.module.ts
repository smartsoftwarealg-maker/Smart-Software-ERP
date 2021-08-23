import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreDetailComponent} from './store-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StoreDetailComponent],
  exports: [StoreDetailComponent]
})
export class StockUiStoreModule {}
