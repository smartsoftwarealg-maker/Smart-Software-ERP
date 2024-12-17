import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { CostingKeyService } from '../costing-key.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { CKey, slideToRight } from '@ss/costing/costing-utils';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-costing-key-list',
    templateUrl: './costing-key-list.component.html',
    styleUrls: ['./costing-key-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,


       
        PaginationComponent

    ],
    animations: [slideToRight]
})
export class CostingKeyListComponent extends BaseEntityListComponent<CKey> implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  public displayedColumns = ['code', 'description'];

  constructor(
    public override entitySrv: CostingKeyService,
    public override shellSrv: ShellService,
    public override snackBarSrv: SnackBarService,
    public override route: ActivatedRoute,
    public override router: Router,
    public override defReportSrv: DefaultReportService,
    public override confirmationSrv: ConfirmationDialogService,
    public override pagPersistSrv: PaginatorPersistenceService) {
      super(entitySrv,
          shellSrv,
          snackBarSrv,
          route,
          router,
          confirmationSrv,
          defReportSrv,
          pagPersistSrv,
          'COST_ALLOCATION_KEYS');
      this.pagination.pageSize = 15;
  }
}
