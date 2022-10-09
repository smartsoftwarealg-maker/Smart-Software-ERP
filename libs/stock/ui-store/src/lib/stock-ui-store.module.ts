import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreDetailComponent} from './store-detail.component';
import {StoreListComponent} from './store-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StoreDetailComponent, StoreListComponent],
  exports: [StoreDetailComponent, StoreListComponent]
})
export class StockUiStoreModule {}
