import {Component, OnInit} from '@angular/core';
import {PayrollMonthService} from '../payroll-month.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {of, switchMap, tap} from 'rxjs';
import {SnackBarService} from '@ss/common/ui-shell';
import {LanguageService} from '@ss/common/api-common';

@Component({
  selector: 'ss-month-selector',
  templateUrl: './month-closer.component.html',
  styleUrls: ['./month-closer.component.scss']
})
export class MonthCloserComponent implements OnInit {
    form: FormGroup = null;
    processing = false;

  constructor(private selectorSrv: PayrollMonthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private confirmationSrv: ConfirmationDialogService,
              private snackBarSrv: SnackBarService,
              private langSrv: LanguageService) {
  }

  ngOnInit(): void {
      this.selectorSrv
          .maxMonth()
          .subscribe(res => {
              this.form = this.formBuilder
                  .group({
                      year: [+(res.month / 100).toFixed(0), Validators.required],
                      month: [+(res.month % 100).toFixed(0), Validators.required],
                  })
          })
  }

  cancel() {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  close() {
      let oldMonth = 0;
      let currMonth = 0;

      this.confirmationSrv
          .confirm(this.langSrv.translate('REMUN_MONTH_CLOSURE'),
              this.langSrv.translate('REMUN_CLOSE_CURRENT_MONTH'),
              false,
              false)
          .pipe(
              tap(confirmed => this.processing = confirmed),
              switchMap(_ => this.selectorSrv.maxMonth()),
              tap(res => oldMonth = res.month),
              switchMap(confirmed => confirmed ? this.selectorSrv.close() : of(false)),
              switchMap(_ => this.selectorSrv.maxMonth()),
              tap(res => currMonth = res.month),
              switchMap(_ => currMonth > oldMonth? this.selectorSrv.selectMonth(currMonth) : of(0)))
          .subscribe({
                  next: _ => {
                      if (currMonth > oldMonth) {
                          this.snackBarSrv.showSuccessMessage();
                          this.router.navigate(['../'], {relativeTo: this.activatedRoute});
                      } else {
                          this.snackBarSrv.showFailureMessage();
                      }
                      this.processing = false;
                  },
                  error: err => {
                      this.processing  = false;
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
