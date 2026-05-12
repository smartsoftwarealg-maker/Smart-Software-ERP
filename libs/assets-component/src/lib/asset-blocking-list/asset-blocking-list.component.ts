import {Component, Input, OnInit, signal} from '@angular/core';
import {Blocking} from '../assets-api';
import { LanguageService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {of, switchMap} from 'rxjs';
import {AssetBlockingService} from '../services/asset-blocking.service';
import { CommonModule } from '@angular/common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';



import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
  selector: 'ss-asset-blocking-list',
  templateUrl: './asset-blocking-list.component.html',
  styleUrls: ['../asset-revaluation-list/asset-revaluation-list.component.scss'],
  standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,


        RouterModule,


        PaginationComponent,
        TranslatePipe
    ]})
export class AssetBlockingListComponent extends BaseChildEntityListComponent<Blocking> {
    override displayedColumns = signal<string[]>(['decision', 'date', 'fromDate', 'toDate', 'typeDescription']);


    constructor(protected entitySrv: AssetBlockingService) {
        super(entitySrv, 'Blocking');
    }
}
