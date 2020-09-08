import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './logout.component';
import { MaterialModule } from '@ss/common/api-common';

@NgModule({
    imports: [CommonModule, MaterialModule],
    declarations: [LogoutComponent],
    exports: [LogoutComponent]
})
export class UiLogoutModule { }
