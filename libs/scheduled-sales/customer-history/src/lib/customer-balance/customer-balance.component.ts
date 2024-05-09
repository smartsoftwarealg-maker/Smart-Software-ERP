import { Component, inject, OnInit, signal } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonUiConfirmationDialogModule } from "@ss/common/ui-confirmation-dialog";
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonModule } from "@angular/common";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { LogisticsUiDocInfoModule } from "@ss/logistics/ui-doc-info";
import { LogisticsUiDocImportModule } from "@ss/logistics/ui-doc-import";
import { LogisticsUiStockInfoModule } from "@ss/logistics/ui-stock-info";
import { CommonUiImageInputModule } from "@ss/common/ui-image-input";
import { CommonUiColorSelectModule } from "@ss/common/ui-color-select";
import { ColorPickerModule } from "ngx-color-picker";
import { CustomerBalanceService } from './customer-balance.service';
import { ScheduleBalanceService } from './schedule-balance.service';

@Component({
    selector: 'ss-customer-history',
    templateUrl: './customer-balance.component.html',
    styleUrls: ['./customer-balance.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,
        RouterModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        LogisticsUiDocInfoModule,
        LogisticsUiDocImportModule,
        LogisticsUiStockInfoModule,
        CommonUiImageInputModule,
        CommonUiColorSelectModule,
        ColorPickerModule
    ]

})
export class CustomerBalanceComponent implements OnInit {
    private scheduleBalanceSrv = inject(ScheduleBalanceService);
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private loginSrv = inject(LoginService);
    private balanceSrv = inject(CustomerBalanceService);

    balance = signal({ credit: 0, debit: 0 });
    schedule = signal({ missed: 0, invoiced: 0, pending: 0 });

    ngOnInit() {
        this.shellSrv.setGoBackPath('../..', this.route);
        this.shellSrv.setTitle('COMMON_BALANCE');
        this.balanceSrv
            .balance(this.loginSrv.appCtx.agentId | 0)
            .subscribe(res => this.balance.set(res));
        this.scheduleBalanceSrv
            .balance(this.loginSrv.appCtx.agentId | 0)
            .subscribe(res => this.schedule.set(res));
    }
}
