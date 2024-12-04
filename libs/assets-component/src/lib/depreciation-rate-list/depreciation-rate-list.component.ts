import { Component, Input, OnInit } from '@angular/core';
import { DepreciationRate } from '../assets-api';
import { LanguageService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import { SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { of, switchMap } from 'rxjs';
import { DepreciationRateService } from '../services/depreciation-rate.service';
import { CommonModule } from '@angular/common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { QRCodeModule } from 'angularx-qrcode';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-depreciation-rate-list',
    templateUrl: './depreciation-rate-list.component.html',
    styleUrls: ['./depreciation-rate-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,

        DatePickerComponent,
        RouterModule,

        QRCodeModule,
        PaginationComponent
    ]

})
export class DepreciationRateListComponent extends BaseChildEntityListComponent<DepreciationRate>{
    override displayedColumns = ['year', 'rate'];

    constructor(public entitySrv: DepreciationRateService) {
        super(entitySrv, 'DepreciationRate');
    }

}
