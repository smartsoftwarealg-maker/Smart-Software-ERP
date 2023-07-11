import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkOrderDetailComponent } from './work-order-detail/work-order-detail.component';
import { WorkOrderListComponent } from './work-order-list/work-order-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [WorkOrderDetailComponent, WorkOrderListComponent],
})
export class CmmsWorkOrderModule {}
