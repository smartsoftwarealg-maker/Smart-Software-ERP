import { Component, HostBinding, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CItem } from '@ss/costing/costing-utils';
import { slideToRight } from '@ss/costing/costing-utils';
import { BaseEntityListComponent } from 'libs/common/ui-base-entity/src';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import { CommonUiConfirmationDialogModule, ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { ItemService } from "../item.service";
import { CommonModule } from '@angular/common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiMainPageModule } from '@ss/common/ui-main-page';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { AppArchiveModule } from '@ss/common/app-archive';

@Component({
  selector: "ss-costing-item-list",
  templateUrl: "./costing-item-list.component.html",
  styleUrls: ["./costing-item-list.component.scss"],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    CommonUiLangModule,
    UiPaginationModule,
    ReactiveFormsModule,
    CommonUiMainPageModule,
    CommonUiAutoCompleteModule,
    CommonUiDatepickerModule,
    CommonUiConfirmationDialogModule,
    AppArchiveModule
  ],
  animations: [slideToRight]
})
export class CostingItemListComponent extends BaseEntityListComponent<CItem> implements OnInit {
  @HostBinding("@routeAnimation") routeAnimation = true;

  public displayedColumns = ["code", "description", "accountDescription"];

  constructor(
    public override entitySrv: ItemService,
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
      "COSTING_ITEMS");
    this.pagination.pageSize = 15;
  }

}
