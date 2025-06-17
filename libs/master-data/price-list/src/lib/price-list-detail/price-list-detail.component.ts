import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
//import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {Bank, BankService} from '@ss/administration/api-bank';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Location, LocationService } from '@ss/master-data/api-article';




@Component({
    selector: 'ss-price-list-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
    ],
    styleUrls: ['./price-list-detail.component.scss'],
    templateUrl: './price-list-detail.component.html'
})
export class PriceListDetailComponent extends BaseEntityDetailComponent<Location> {
    constructor(
        public override entitySrv: LocationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'STOCK_PRICE_LIST');
    }


    public override setupForm(b: Location) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:            [b.id],
            storeId:       [b.storeId],
            stock:         [b.stock],
            referenceId:   [b.referenceId],
            reference:     [{ value: b.reference, disabled: true }],
            description:   [{ value: b.description, disabled: true }],
            lotNumber:     [{ value: b.lotNumber, disabled: true }],
            storeName:     [{ value: b.storeName, disabled: true }],
            price1:        [b.price1||0, Validators.required],
            price2:        [b.price2||0, Validators.required],
            price3:        [b.price3||0, Validators.required],
            price4:        [b.price4||0, Validators.required],
            price5:        [b.price5||0, Validators.required],
            pp:            [b.pp||0],
            inventStock:   [b.inventStock],
            analysis_date: [b.analysisDate],

        });
    }
}
