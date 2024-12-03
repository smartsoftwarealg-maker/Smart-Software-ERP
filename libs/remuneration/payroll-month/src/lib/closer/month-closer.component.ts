import {Component, OnInit} from '@angular/core';
import {PayrollMonthService} from '../payroll-month.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { catchError, delay, map, mergeMap, Observable, of, repeat, retry, switchMap, tap, throwError } from "rxjs";
import {SnackBarService} from '@ss/common/ui-shell';
import { LanguageService, LoginService } from "@ss/common/api-common";
import { NgIf } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-month-selector',
    templateUrl: './month-closer.component.html',
    styleUrls: ['./month-closer.component.scss'],
    standalone: true,
    imports: [NgIf, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatButton, MatProgressBar, MatProgressSpinner, TranslatePipe]
})
export class MonthCloserComponent implements OnInit {
    form: UntypedFormGroup = null;
    processing = false;
    private maxMonth = 0;
  constructor(private selectorSrv: PayrollMonthService,
              private formBuilder: UntypedFormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private confirmationSrv: ConfirmationDialogService,
              private snackBarSrv: SnackBarService,
              private langSrv: LanguageService,
              private loginSrv: LoginService) {
      this.maxMonth = this.loginSrv.appCtx.payMonth;
  }

  ngOnInit(): void {
      this.selectorSrv
          .maxMonth()
          .subscribe(res => {
              this.maxMonth = res?.month || 0;
              this.form = this.formBuilder
                  .group({
                      year:  [ { value: +(res.month / 100).toFixed(0), disabled: true }, Validators.required],
                      month: [{ value: +(res.month % 100).toFixed(0), disabled: true }, Validators.required],
                  })
          })
  }

  cancel() {
      this.router
          .navigate(['../'], { relativeTo: this.activatedRoute })
          .then();
  }

  retries(count: number): Observable<boolean> {
      return count >= 5?
        of(false) :
        this.selectorSrv
          .maxMonth()
          .pipe(delay(2000),
              switchMap(res => res.month > this.maxMonth? of(true) : this.retries(count + 1)));
  }

  close() {
      this.confirmationSrv
          .confirm(this.langSrv.translate('REMUN_MONTH_CLOSURE'),
              this.langSrv.translate('REMUN_CLOSE') + '?',
              false,
              false)
          .pipe(
              tap(confirmed => this.processing = confirmed),
              switchMap(confirmed => {
                  if (confirmed) {
                      return this.selectorSrv
                                 .close()
                                 .pipe(switchMap(() => this.selectorSrv.maxMonth()),
                                       switchMap(res => this.selectorSrv.selectMonth(res.month)));
                  } else {
                      return of(false)
                  }
              }),
            catchError(err =>
              this.retries(1)
                .pipe(tap(res => {
                    if (!res) {
                      throw err;
                    }
                  }),
                  switchMap(() => this.selectorSrv.maxMonth()),
                  switchMap(res => this.selectorSrv.selectMonth(res.month)))
            ))
          .subscribe({
                  next: res => {
                      this.processing = false;
                      if (res) {
                          this.snackBarSrv.showSuccessMessage();
                          this.router
                              .navigate(['../'], {relativeTo: this.activatedRoute})
                              .then();
                      } else {
                          this.snackBarSrv.showFailureMessage();
                      }
                  },
                  error: err => {
                    this.processing = false;
                    throw err;
                  }
              }
          );
  }

    public canDeactivate(): boolean {
        if (this.processing) {
            window.confirm(this.langSrv.translate('COMMON_BUSY'));
        }
        return !this.processing;
    }

}
