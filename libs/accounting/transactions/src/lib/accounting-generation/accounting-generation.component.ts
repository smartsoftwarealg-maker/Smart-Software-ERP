import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService, PaginationModel} from '@ss/common/api-common';
import {ActivatedRoute} from '@angular/router';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {AccJournalsService, AccountingGenerationService, Journal, TDocument} from '@ss/accounting/accounting-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'ss-accounting-generation',
  templateUrl: './accounting-generation.component.html',
  styleUrls: ['./accounting-generation.component.scss']
})
export class AccountingGenerationComponent implements OnInit, OnDestroy {
    private documentMap = new Map(
        [
            [1, {code: 514, description: 'purchase',    stock: false}],
            [2, {code: 514, description: 'inventory',   stock: true}],
            [3, {code: 260, description: 'consumption', stock: true}],
            [4, {code: 258, description: 'sales',       stock: false}],
        ]);
    private subscriptions: Subscription[] = [];
    form: FormGroup | null = null;
    journalLookup = new DefaultAutoCompleteModel<Journal>(this.journalSrv);
    processing = false;
    data: TDocument[] = [];
    displayedColumns = ['description', 'number', 'date'];
    public pagination = PaginationModel.newInstance();

    constructor(private fb: FormBuilder,
                private loginSrv: LoginService,
                private generationSrv: AccountingGenerationService,
                private route: ActivatedRoute,
                private shellSrv: ShellService,
                private snackBarSrv: SnackBarService,
                private journalSrv: AccJournalsService) {
        this.pagination.onChange = () => this.showDocuments();
        this.pagination.pageSize = 15;
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

  ngOnInit(): void {
      this.shellSrv.setGoBackPath('..', this.route);
      this.loginSrv
          .loadContext()
          .subscribe(res => {
              this.form = this.fb.group({
                  year:    [{ value: this.loginSrv.appCtx.accYear, disabled: true }],
                  period:  [{ value: this.loginSrv.appCtx.accPeriod, disabled: true} ],
                  journal: [null, Validators.required],
                  genType: ['purchase', Validators.required],
              });
              this.subscriptions.push(
                  this.form?.controls['genType']
                      .valueChanges
                      .pipe(
                          debounceTime(300),
                          distinctUntilChanged()
                      ).subscribe(v => this.showDocuments()));
          });
  }

  generate() {
      const key = +this.form?.controls['genType'].value;
      const generationPayload = { journal: this.form?.controls['journal'].value,
                                  genType: this.documentMap.get(key)?.description
                                };
      this.generationSrv
          .generate(generationPayload)
          .subscribe(res => {
              this.showDocuments();
              this.snackBarSrv.showSuccessMessage();
          })
  }

  showDocuments() {
      this.processing = true;
      this.shellSrv.setLoading(true);
      const key = +this.form?.controls['genType'].value;
      const value = this.documentMap.get(key);
      const params = new HttpParams()
          .set('document', value?.code || 0)
          .set('stock', value?.stock);
      this.generationSrv
          .getList(this.pagination.page - 1, this.pagination.pageSize, null, null, params)
          .subscribe({
              next: res => {
                  this.data = res.body;
                  this.pagination.elementCount = res.itemCount;
                  this.processing = false;
                  this.shellSrv.setLoading(false);
              }, error: err => {
                  this.processing = false;
                  this.shellSrv.setLoading(false);
                  throw err;
              }
          });
  }
}
