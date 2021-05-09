import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {LookupsService, Lot, LotsService, PayMethod, PayMode, PayModeService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Option} from './option.class';
import {OptionService} from './option.service';
import {AppContextService} from '@ss/common/api-common';


@Component({
    selector: 'ss-account-detail',
    styleUrls: ['./options-detail.component.scss'],
    templateUrl: './options-detail.component.html'
})
export class OptionsDetailComponent extends BaseEntityDetailComponent<Option> {
    storeAutoCompleteModel: DefaultAutoCompleteModel<Lot> = new DefaultAutoCompleteModel<Lot>(this.storeNameSrv);

    constructor(
        public optionSrv: OptionService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private storeNameSrv: LotsService,
        private appContextSrv: AppContextService) {
        super(optionSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_EDIT_OPTION');
    }

    public setupForm(a: Option) {
        return this.formBuilder.group({
            id: [this.appContextSrv.context.center],
            eval_price: [a.eval_price || 1, Validators.required],
            mainStore: [a.mainStore],
            inventory_date: [a.inventory_date, Validators.required]
        });
    }

    loadEntity(id: number): Observable<Option> {
        return super.loadEntity(this.appContextSrv.context.center);
    }
}
