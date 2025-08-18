import { Component, inject, OnInit } from '@angular/core';
import { Currency, LotsService, Lot } from '@ss/common/api-lookup';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import {
    LoginService,
    MaterialModule,
    PaginationModel,
} from '@ss/common/api-common';
import { ERR, OptionService } from '@ss/logistics/ui-options';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import {
    UntypedFormBuilder,
    Validators,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormGroup,
} from '@angular/forms';
import { MatCard, MatCardContent } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButton } from '@angular/material/button';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRow,
    MatRow,
} from '@angular/material/table';
import { TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';

interface EvalPrice {
    id: any;
    name: string;
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
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
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
        MatCellDef,
        PaginationComponent,
    ],
})
export class PriceRecalculationComponent implements OnInit {
    private storeNameSrv = inject(LotsService);

    evalPriceOptions: EvalPrice[] = [
        { id: 1, name: 'LOGISTICS_FIFO' },
        { id: 3, name: 'LOGISTICS_AWP' },
    ];

    form: UntypedFormGroup | null = null;

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
    storeAutoCompleteModel: DefaultAutoCompleteModel<Lot> =
        new DefaultAutoCompleteModel<Lot>(this.storeNameSrv);

    shellSrv = inject(ShellService);
    snackBarSrv = inject(SnackBarService);
    route = inject(ActivatedRoute);
    formBuilder = inject(UntypedFormBuilder);
    //confirmationSrv = inject(ConfirmationDialogService);
    loginSrv = inject(LoginService);
    optionSrv = inject(OptionService);
    //lookupsSrv = inject(LookupsService);
    //currencySrv = inject(CurrencyService);

    pagination = PaginationModel.newInstance({
        page: 1,
        pageSize: 15,
        elementCount: 0,
    });

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('STOCK_PRICE_RECALCULATION');
        this.form = this.formBuilder.group({
            id: [this.loginSrv.appCtx.center],
            eval_price: [{ value: 1, disabled: true }],
            inventory_date: [
                new Date(new Date().getFullYear(), 0, 1),
                Validators.required,
            ],
        });
        // this.currencySrv
        //     .getList(0, 50)
        //     .subscribe((res) => (this.currencies = res.body));
    }

    recalculate() {
        if (this.form.valid) {
            this.shellSrv.setLoading(true);
            const value = this.form.value;
            this.processing = true;
            this.optionSrv.recalculatePrice(value.inventory_date).subscribe({
                next: (res) => {
                    this.data = res;
                    this.snackBarSrv.showSuccessMessage();
                    this.shellSrv.setLoading(false);
                    this.processing = false;
                },
                error: (err) => {
                    this.shellSrv.setLoading(false);
                    this.processing = false;
                    if (err.statusText?.length > 10) {
                        throw err;
                    } else {
                        this.snackBarSrv.showSuccessMessage();
                    }
                },
            });
        }
    }

    select(item: ERR) {
        this.selected = item;
    }
}
