import { Component, OnInit, ViewChild } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Lookup, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { of, switchMap } from 'rxjs';
import {DeliveryService} from '@ss/sales/api-delivery';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {MatDialog} from '@angular/material/dialog';
import { BaseTransactionDetailComponent, BaseTransactionLinesListComponent } from '@ss/logistics/api-transaction';
import { DeliveryLinesService } from '@ss/sales/api-delivery';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { DeliveryLinesListComponent } from '@ss/sales/ui-delivery-lines';


@Component({
    selector: 'ss-delivery-detail',
    templateUrl: './delivery-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [MaterialModule, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatError, DatePickerComponent, UiAutoCompleteComponent, MatTabGroup, MatTab, MatTabLabel, CdkTextareaAutosize, RouterOutlet]
})
export class DeliveryDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    @ViewChild(DeliveryLinesListComponent) deliveryList: DeliveryLinesListComponent;
    // private payMethodSrv =  inject(PayMethodService);
    // private agentService = inject(AgentService);
    // private usersSrv = inject(UserListService);

    // public dealerAutoCompleteModel = new DefaultAutoCompleteModel<User>(this.usersSrv);
    // public agentAutoCompleteModel = new DefaultAutoCompleteModel<Agent>(this.agentService, 'id', 'denomination');
    // public payModeAutoCompleteModel = new DefaultAutoCompleteModel<PayMethod>(this.payMethodSrv);
    private importContractBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-file-arrow-up',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_IMPORT_CONTRACT',
        visible: true,
        click: () => this.importContract(),
    };

    constructor(
        protected loginSrv: LoginService,
        public deliveryService: DeliveryService,
        public override detailSrv: DeliveryLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        protected dialog: MatDialog) {
        super(deliveryService,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'SALES_EDIT_DELIVERY');
    }

    override ngOnInit() {
        super.ngOnInit();
        this.shellSrv.addButton(this.importContractBtn);
    }

    protected override showImportButton(): boolean {
        return true;
    }

    protected override requireAgentToImportDocument(): boolean {
        return true;
    }

    protected override requireAgent(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{id: 1025, description: 'SALES_ORDER'}];
    }

    private importContract() {
        if (!this.importContractBtn.disabled) {
            this.deliveryService
                .consumeContract(this.id)
                .pipe(switchMap(_ => this.deliveryList? this.deliveryList.loadDetailLines() : of(null)),
                    switchMap(() =>
                        this.outlet?.component instanceof BaseTransactionLinesListComponent?
                            this.outlet?.component.loadDetailLines() :
                            of(0)))
                .subscribe(_ => {
                    this.shellSrv.setLoading(false);
                    this.snackBarSrv.showSuccessMessage();
                });
        }
    }
}
