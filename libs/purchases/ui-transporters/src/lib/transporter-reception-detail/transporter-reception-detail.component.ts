import { Component, inject, OnInit, signal } from '@angular/core';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { Lookup } from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    BaseTransactionDetailComponent,
    BaseTransactionLinesListComponent,
    Transaction
} from '@ss/logistics/api-transaction';
import { ReceptionService } from '@ss/purchases/api-reception';
import { IsParamService, LoginService, MaterialModule } from '@ss/common/api-common';
import { MatDialog } from '@angular/material/dialog';



import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { TransporterReceptionLinesService } from '../transporter-reception-lines.service';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { ExtraCostService } from '@ss/purchases/extra-costs';
import { Observable, of, switchMap, tap } from 'rxjs';
import {TransportersService} from "../../../../api-transporters/src";


@Component({
    selector: 'ss-transporter-reception-detail',
    templateUrl: './transporter-reception-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-detail.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    DatePickerComponent,
    RouterOutlet,
    UiAutoCompleteComponent
]
})
export class TransporterReceptionDetailComponent extends BaseTransactionDetailComponent implements OnInit {
    private isSrv = inject(IsParamService);
    private extraCostSrv = inject(ExtraCostService);
    private URLs = ['./lines-list', './costs-list'];

    // private importContractBtn: ToolbarButton = {
    //     disabled: false,
    //     icon: 'fa-solid fa-file-arrow-up',
    //     keepOnToolbar: KeepOnToolbar.DYNAMIC,
    //     label: 'LOGISTICS_IMPORT_CONTRACT',
    //     visible: true,
    //     click: () => this.importContract(),
    // };

    showAccTab = signal(true);

    constructor(
        public override entitySrv: ReceptionService,
        public override detailSrv: TransporterReceptionLinesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected readonly loginSrv: LoginService,
        protected dialog: MatDialog) {
        super(entitySrv,
            detailSrv,
            shellSrv,
            snackBarSrv,
            route,
            router,
            formBuilder,
            confirmationSrv,
            loginSrv,
            dialog,
            'PURCHASES_TRANSPORT_RECEPTIONS');
    }

    protected showImportButton(): boolean {
        return true;
    }

    protected requireAgent(): boolean {
        return true;
    }


    protected requireAgentToImportDocument(): boolean {
        return true;
    }

    protected importedDocuments(): Lookup[] {
        return [{ id: 2, description: 'LOGISTICS_PURCHASE_ORDER' }];
    }

    override ngOnInit() {
        super.ngOnInit();
        this.onTabChange(0);
    }

    onTabChange(idx: number) {
        if (this.saveButton.visible) {
            this.router.navigate([this.URLs[idx]], { relativeTo: this.route }).then();
        }
    }


    loadEntity(id: number): Observable<Transaction> {
        this.extraCostSrv.setParentId(id||0);
        return super.loadEntity(id);
    }

    preload(): Observable<any> {
        return this.isSrv
            .is('SODISMAC')
            .pipe(
                tap(res => this.showAccTab.set(true)),
                switchMap(() => super.preload()));
    }
}
