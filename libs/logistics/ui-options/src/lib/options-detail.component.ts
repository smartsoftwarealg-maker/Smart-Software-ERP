import { Component, inject, OnInit } from "@angular/core";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import { BaseEntityDetailComponent } from "@ss/common/ui-base-entity";
import {
    LookupsService,
    Lot,
    LotsService,
    Currency,
    CurrencyService
} from "@ss/common/api-lookup";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { Option } from "./option.class";
import { OptionService } from "./option.service";
import { LoginService, MaterialModule } from "@ss/common/api-common";
import { CommonModule } from "@angular/common";


import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { CustomerService } from "@ss/logistics/api-agent";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

interface EvalPrice {
    id: any,
    name: string
}

@Component({
    selector: "ss-account-detail",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,


        ReactiveFormsModule,
        DatePickerComponent,
        UiAutoCompleteComponent
    ],
    styleUrls: ["./options-detail.component.scss"],
    templateUrl: "./options-detail.component.html"
})
export class OptionsDetailComponent extends BaseEntityDetailComponent<Option> implements OnInit {
    private loginSrv = inject(LoginService);
    private customerSrv = inject(CustomerService);
    private storeNameSrv = inject(LotsService);
    evalPriceOptions: EvalPrice[] = [
        { id: 1, name: "LOGISTICS_FIFO" },
        { id: 3, name: "LOGISTICS_AWP" }
    ];

    currencies: Currency[] = [];
    storeAutoCompleteModel: DefaultAutoCompleteModel<Lot> = new DefaultAutoCompleteModel<Lot>(this.storeNameSrv);
    customerLookup = new DefaultAutoCompleteModel(this.customerSrv, 'id', 'denomination');

    constructor(
        public optionSrv: OptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private currencySrv: CurrencyService) {
        super(optionSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, "COMMON_EDIT_OPTION");
    }

    public override setupForm(a: Option) {
        return this.formBuilder.group({
            id: [this.loginSrv.appCtx.center],
            evalPrice: [a.evalPrice || 1, Validators.required],
            mainStore: [a.mainStore],
            generate_GL: [a.generate_GL],
            inventoryDate: [a.inventoryDate, Validators.required],
            defaultCurrency: [a.defaultCurrency, Validators.required],
            checkPrices: [a.checkPrices || false, Validators.required],
            passingClient: [a.passingClient],
            returnInvoiceMerge: [a.returnInvoiceMerge, Validators.required],
            usesLots: [a.usesLots || false, Validators.required],
        });
    }

    override loadEntity(id: number): Observable<Option> {
        this.id = this.loginSrv.appCtx.center;
        return super.loadEntity(this.id);
    }

    override ngOnInit() {
        super.ngOnInit();
        this.currencySrv
            .getList(0, 50)
            .subscribe(res => this.currencies = res.body);
    }
}
