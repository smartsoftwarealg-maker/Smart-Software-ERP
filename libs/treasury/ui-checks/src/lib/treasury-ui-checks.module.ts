import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckListComponent } from './check-list.component';
import { CheckDetailComponent } from './check-detail.component';

@NgModule({
    imports: [CommonModule],
    declarations: [CheckListComponent, CheckDetailComponent],
    exports: [CheckListComponent, CheckDetailComponent]
})
export class TreasuryUiChecksModule {}
