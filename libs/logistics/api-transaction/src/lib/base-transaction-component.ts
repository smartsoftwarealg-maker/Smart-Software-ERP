import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Transaction} from '@ss/logistics/api-transaction';
import {InvoiceService} from '@ss/sales/api-invoice';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {UserListService} from '@ss/common/api-users';
import {LookupsService} from '@ss/common/api-lookup';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {BaseEntityService} from '@ss/common/api-base-entity';

export abstract class BaseTransactionComponent extends BaseEntityDetailComponent<Transaction> {
    constructor(public invoiceService: BaseEntityService<Transaction>,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public formBuilder: FormBuilder,
                public confirmationSrv: ConfirmationDialogService,
                public title: string) {
        super(invoiceService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, title);
    }

    canDeactivate(): Observable<boolean> {
        console.log('calling canDeactivate', this.id);
        return this.id === 0 ?
            of(true) :
            this.invoiceService
                .get(this.id)
                .pipe(tap(res => {
                        if (res.dirty) {
                            this.form.markAsDirty({onlySelf: false});
                            this.form.markAsUntouched({onlySelf: false});
                            this.snackBarSrv.showFailureMessage('COMMON_SAVE_REQUIRED');
                        }
                    }),
                    map(res => !res.dirty));
    }
}
