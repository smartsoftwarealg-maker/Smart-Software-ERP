import {Component, HostBinding, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';


import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';

import { BaseEntityListComponent } from '@ss/common/ui-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { CostingProductService } from '../costing-product.service';
import { CProduct, slideToRight } from '@ss/costing/costing-utils';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-costing-product-list',
    templateUrl: './costing-product-list.component.html',
    styleUrls: ['./costing-product-list.component.scss'],
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
export class CostingProductListComponent extends BaseEntityListComponent<CProduct> implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  public displayedColumns = ['code', 'description'];

  constructor(
    public override entitySrv: CostingProductService,
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
          'COST_PRODUCTS');
      this.pagination.pageSize = 15;
  }

}
