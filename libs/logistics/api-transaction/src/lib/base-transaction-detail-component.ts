import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {
    ActivatedRoute,
    ChildActivationStart,
    Event,
    GuardsCheckEnd,
    GuardsCheckStart, NavigationStart,
    Router,
    RouterEvent
} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Observable, of, switchMap, zip} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {BaseEntityService} from '@ss/common/api-base-entity';
import {Transaction} from './transaction';

export abstract class BaseTransactionDetailComponent extends BaseEntityDetailComponent<Transaction> {
    constructor(public invoiceService: BaseEntityService<Transaction>,
                public shellSrv: ShellService,
                public snackBarSrv: SnackBarService,
                public route: ActivatedRoute,
                public router: Router,
                public formBuilder: FormBuilder,
                public confirmationSrv: ConfirmationDialogService,
                public title: string) {
        super(invoiceService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, title);
    }

    public canDeactivate(): Observable<boolean> {
        console.log(this.router.getCurrentNavigation().extractedUrl.queryParamMap.get('parent'));
        const parent = +(this.router.getCurrentNavigation().extractedUrl.queryParamMap.get('parent') || '0');
        return this.id === 0 || parent === this.id?
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
                    switchMap(res => res.dirty? of(false): super.canDeactivate()));
     }
}
