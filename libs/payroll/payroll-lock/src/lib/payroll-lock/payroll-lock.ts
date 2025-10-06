import {Component, inject, OnInit} from '@angular/core';
import {LoginService, MaterialModule} from "@ss/common/api-common";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateDirective, TranslatePipe} from "@ss/common/ui-lang";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {UiAutoCompleteComponent} from "@ss/common/ui-auto-complete";
import {MonthLockService} from "./month-lock.service";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {PayrollMonthService} from "@ss/remuneration/payroll-month";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
    selector: 'ss-payroll-lock',
    templateUrl: './payroll-lock.html',
    styleUrl: './payroll-lock.scss',
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        TranslateDirective,
        TranslatePipe
    ],
})
export class PayrollLock implements OnInit {
    #route = inject(ActivatedRoute);
    #shellSrv = inject(ShellService);
    #monthSelectorSrv  = inject(PayrollMonthService);
    #monthLockSrv = inject(MonthLockService);
    #snackBarSrv = inject(SnackBarService);
    #loginSrv = inject(LoginService);

    isCurrentMonth = toSignal(this.#monthSelectorSrv.isUpdatableMonth());

    protected lock() {
        this.#monthLockSrv.lock(this.#loginSrv.appCtx.center)
            .subscribe({
            next: (res) => {
                this.#snackBarSrv.showSuccessMessage();
            },
            error: (err) => {
                throw err;
            }
        });
    }

    ngOnInit() {
        this.#shellSrv.setGoBackPath('..', this.#route);
    }

    cancel() {
        this.#shellSrv.goBack();
    }
}
