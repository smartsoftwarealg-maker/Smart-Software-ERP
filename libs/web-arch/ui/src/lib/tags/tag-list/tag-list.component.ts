import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {TagService} from './tag.service';
import {Tag} from '../tag';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {LookupsService} from '@ss/common/api-lookup';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';


import { ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { PaginationComponent } from '@ss/common/ui-pagination';

@Component({
  selector: 'ss-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        DatePickerComponent,

        PaginationComponent
    ]
})

export class TagListComponent extends BaseEntityListComponent<Tag>  {

  public displayedColumns = ['description'];

    constructor(
        public tagSrv: TagService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService,
        public override pagPersistSrv: PaginatorPersistenceService) {
        super(tagSrv, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, pagPersistSrv, 'WAR_TAGS');
    }
}
