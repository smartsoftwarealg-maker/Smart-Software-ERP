import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "@ss/common/api-common";


import {ReactiveFormsModule} from "@angular/forms";

import {SmtpDetailComponent} from "./smtp-detail/smtp-detail.component";
import {SmtpListComponent} from "./smtp-list/smtp-list.component";


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,

        SmtpListComponent, SmtpDetailComponent
    ],
    exports: []
})
export class AdministrationUiSmtpModule {}
