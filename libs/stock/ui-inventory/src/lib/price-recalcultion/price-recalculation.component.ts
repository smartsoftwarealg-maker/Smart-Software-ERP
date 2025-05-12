import { Component, inject, OnInit } from '@angular/core';
import {Currency, CurrencyService, LookupsService, LotsService, Lot} from '@ss/common/api-lookup';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {ERR, Option, OptionService} from '@ss/logistics/ui-options';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable} from 'rxjs';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButton } from '@angular/material/button';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { TranslatePipe } from '@ss/common/ui-lang';

interface EvalPrice {
    id: any,
    name: string
}

@Component({
    selector: 'ss-price-recalculation',
    templateUrl: './price-recalculation.component.html',
    styleUrls: ['./price-recalculation.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        MatCard,
        MatCardContent,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        NgFor,
        MatOption,
        MatError,
        DatePickerComponent,
        MatButton,
        MatTable,
        MatColumnDef,
        MatHeaderCell,
        MatCell,
        MatHeaderRow,
        MatRow,
        DatePipe,
        TranslatePipe,
        TranslateDirective,
        MatHeaderCellDef,
        MatCellDef
    ]
})
export class PriceRecalculationComponent extends BaseEntityDetailComponent<Option> implements OnInit {
    private storeNameSrv =  inject(LotsService);

    evalPriceOptions: EvalPrice[] = [
        {id: 1, name: 'LOGISTICS_FIFO'},
        {id: 3, name: 'LOGISTICS_AWP'}
    ];

    processing = false;
    data: ERR[] = [];
    selected: ERR = null;
    displayedColumns = [
        'document',
        'number',
        'date',
        'reference',
        'description',
    ];

    currencies: Currency[] = [];
    storeAutoCompleteModel: DefaultAutoCompleteModel<Lot> = new DefaultAutoCompleteModel<Lot>(this.storeNameSrv);

    constructor(
        private loginSrv: LoginService,
        public optionSrv: OptionService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private currencySrv: CurrencyService) {
        super(optionSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_PRICE_RECALCULATION');
    }

    public override setupForm(a: Option) {
        return this.formBuilder.group({
            id: [this.loginSrv.appCtx.center],
            eval_price: [{value: a.evalPrice || 1, disabled: true }],
            mainStore: [a.mainStore],
            generate_GL: [a.generate_GL],
            inventory_date: [new Date(), Validators.required],
            defaultCurrency: [a.defaultCurrency, Validators.required]
        });
    }

    override loadEntity(id: number): Observable<Option> {
        this.id = this.loginSrv.appCtx.center;
        return super.loadEntity(this.id);
    }

    override ngOnInit() {
        this.saveButton.visible = false;
        super.ngOnInit();
        this.currencySrv
            .getList(0, 50)
            .subscribe(res => this.currencies = res.body);
    }

    recalculate() {
        this.shellSrv.setLoading(true);
        const value = this.form.value;
        this.processing = true;
        this.optionSrv
            .recalculatePrice(value.inventory_date)
            .subscribe({
                next: res => {
                    this.data = res;
                    this.snackBarSrv.showSuccessMessage();
                    this.shellSrv.setLoading(false);
                    this.processing = false;
                },
                error: err => {
                    this.shellSrv.setLoading(false);
                    this.processing = false;
                    if (err.statusText?.length > 10) {
                        throw err;
                    } else {
                        this.snackBarSrv.showSuccessMessage();
                    }
                }
            });
    }

    select(item: ERR) {
        this.selected = item;
    }
}
