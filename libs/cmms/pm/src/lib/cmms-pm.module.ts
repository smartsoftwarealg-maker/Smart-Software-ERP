import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PmListComponent } from './pm-list/pm-list.component';
import { PmDetailComponent } from './pm-detail/pm-detail.component';

@NgModule({
    imports: [CommonModule],
    declarations: [PmListComponent, PmDetailComponent],
})
export class CmmsPmModule {}
