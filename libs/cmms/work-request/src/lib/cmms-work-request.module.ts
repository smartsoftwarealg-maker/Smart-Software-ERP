import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkRequestListComponent } from './work-request-list/work-request-list.component';
import { WorkRequestDetailComponent } from './work-request-detail/work-request-detail.component';

@NgModule({
    imports: [CommonModule],
    declarations: [WorkRequestListComponent, WorkRequestDetailComponent],
})
export class CmmsWorkRequestModule {}
