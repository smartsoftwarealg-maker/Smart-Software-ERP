import { Component, HostBinding, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { ACCRecord, CItem } from "@ss/costing/costing-utils";
import { slideToRight } from '@ss/costing/costing-utils';
import { BaseEntityListComponent } from 'libs/common/ui-base-entity/src';
import { MaterialModule, PaginatorPersistenceService } from '@ss/common/api-common';
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { DefaultReportService } from '@ss/common/ui-default-report-component';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CommonModule } from '@angular/common';


import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";


import { DatePickerComponent } from '@ss/common/ui-datepicker';

import { AccRecordService } from "../acc-record.service";
import { callback } from "chart.js/helpers";
import { debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs/operators";
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { Observable } from "rxjs";

@Component({
  selector: "ss-costing-item-list",
  templateUrl: './cost-item-accounting-records.html',
  styleUrls: ['./cost-item-accounting-records.scss'],
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
export class CostItemAccountingRecords extends BaseEntityListComponent<ACCRecord> implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  public displayedColumns = ['accountNo', 'description', 'balance'];
  currentYear = signal(new Date().getFullYear() - 1);
  year = new FormControl<number>(this.currentYear(), [Validators.min(this.currentYear() -5), Validators.max(this.currentYear() + 1)]);

  constructor(
    public override entitySrv: AccRecordService,
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
      "COST_ACC_RECORDS");
    this.pagination.pageSize = 15;
    this.entitySrv.year = this.currentYear();
  }

    protected override preInit(): Observable<unknown> {
        return super.preInit()
            .pipe(tap(() => {
                this.addButton.visible = false;
                this.editButton.visible = false;
                this.deleteButton.visible = false;
            }));
    }

    override ngOnInit() {
        super.ngOnInit();
        this.subscriptions.push(
            this.year
                .valueChanges
                .pipe(
                    debounceTime(300),
                    distinctUntilChanged(),
                    switchMap(() => this.entitySrv.list(this.year.value))
                ).subscribe(data => this.data = data)
        );
    }
}
