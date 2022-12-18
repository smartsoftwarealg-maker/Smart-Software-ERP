import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {CCGroup, Currency, CurrencyService, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';


@Component({
    selector: 'ss-cost-center-detail',
    styleUrls: ['./currency-detail.component.scss'],
    templateUrl: './currency-detail.component.html'
})
export class CurrencyDetailComponent extends BaseEntityDetailComponent<Currency> {


    constructor(
        public currencySrv: CurrencyService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(currencySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_CURRENCIES');
    }


    public override setupForm(b: Currency) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            code: [b.code, Validators.required],
            description: [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
            exchangeRate: [b.exchangeRate || 1.0, Validators.required],
        });
    }

    ngOnInit() {
        super.ngOnInit();
        this.currencySrv.load().subscribe();
    }
}
