import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {Article, ArticleAutoCompleteModel, ArticleService, LotAutoCompleteModel, QtyPrice} from '@ss/stock/api-article';
import {LookupsService, LotsService} from '@ss/common/api-lookup';
import { Observable, of, Subscription, switchMap } from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoginService} from '@ss/common/api-common';
import {TransactionLine} from './transaction-line';
import { Directive, inject, OnInit } from '@angular/core';
import {OptionService} from '@ss/logistics/ui-options';
import { TransactionLinesService } from './transaction-lines.service';

@Directive()
export abstract class BaseTransactionLinesDetailComponent2 implements OnInit {
    private queryId: number;

    private loginSrv  =  inject(LoginService);
    private optionSrv =  inject(OptionService);
    private shellSrv = inject(ShellService);
    private snackBarSrv = inject(SnackBarService);
    private formBuilder = inject(UntypedFormBuilder);
    private confirmationSrv = inject(ConfirmationDialogService);
    private articleSrv = inject(ArticleService);
    private lotSrv = inject(LotsService);
    private lookupsSrv = inject(LookupsService);

    protected subscriptions: Subscription[] = [];
    protected route = inject(ActivatedRoute);
    protected router = inject(Router);

    form: UntypedFormGroup = null;
    selectedRow: TransactionLine = null;
    agentId = 0;
    parentId: number;
    selectedReference: string = null;
    isManager = false;
    mainStore = 0;
    isEditable = true;
    saveDisabled = false;
    articleStock = 0.0;
    articleAutoCompleteModel: ArticleAutoCompleteModel = null;
    storeAutoCompleteModel: LotAutoCompleteModel = null;

    protected constructor(protected entitySrv: TransactionLinesService, protected document: number) {
        this.articleAutoCompleteModel = new ArticleAutoCompleteModel(this.articleSrv);
        this.storeAutoCompleteModel   = new LotAutoCompleteModel(this.lotSrv);
        this.articleAutoCompleteModel.onObjectSelected = (a) => this.onArticle(a);
    }

    preload(): Observable<any> {
        return this.route
            .parent
            .parent
            .paramMap
            .pipe(
                tap(p => {
                    this.parentId = +p.get('id') || 0;
                    this.entitySrv.setParentId(this.parentId);
                }),
                switchMap(_ => this.optionSrv.get(this.loginSrv.appCtx.center)),
                tap(res => this.mainStore = res.mainStore),
                switchMap(_ => this.entitySrv.getTransaction(this.parentId)),
                tap(transac => this.agentId = transac.agent),
            );
    }

    private updateStockAndValue(res: QtyPrice) {
        this.articleStock = res.qty;
    }

    ngOnInit() {
        const rights = this.shellSrv.getCurrentNodeRights();
        this.isEditable = rights.edit;
        this.load();
        const subs1 = this.storeAutoCompleteModel
            .evenEmitter
            .subscribe(id => {
                this.articleSrv
                    .getPPrice(this.form.controls['reference'].value, <number>id || 0, this.parentId, this.id)
                    .subscribe({
                        next: res => this.articleStock = res.qty,
                        error: err => this.articleStock = 0
                    });
            });

        const subs2 = this.articleAutoCompleteModel
            .evenEmitter
            .subscribe(ref => {
                this.articleSrv
                    .getPPrice(<string>ref, this.form.controls['store']?.value || 0, this.parentId, this.id)
                    .subscribe({
                        next: res => this.updateStockAndValue(res),
                        error: err => this.form.controls['price'].setValue(0.0)
                    });
            });

        this.subscriptions.push(subs1);
        this.subscriptions.push(subs2);
    }

    public ngOnDestroy() {
        this.form = null;
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public load() {
        this.form = null;
        this.preload()
            .pipe(
                switchMap(_ => this.shellSrv.loadUserRights()),
                tap(_ => {
                    const rights = this.shellSrv.getCurrentNodeRights();
                    this.saveDisabled &&= rights.edit;
                    this.isEditable = rights.edit;
                }),
                switchMap(_ => this.getRouteParam()))
            .subscribe({
                next: entity => {
                    if (entity) {
                        this.finishLoading(entity);
                    } else {
                        throw new Error('BaseEntityDetail: Entity is null');
                    }
                },
                error: error => {
                    this.shellSrv.showRetry(() => this.load());
                    throw error;
                }
            });
    }

    public loadEntity(id: number): Observable<TransactionLine> {
        if (id == null) {
            this.shellSrv.goBack();
            return of(null);
        }
        if (id === 0) {
            const a: any = {
                id: 0
            };
            return of(a);
        }
        return this.entitySrv.get(id);
    }

    protected getRouteParam(): Observable<any> {
        return this.route.params
            .pipe(
                switchMap(p => {
                    this.queryId = +p['id'];
                    return this.loadEntity(this.queryId || 0);
                })
            );
    }

    finishLoading(e: TransactionLine) {
        this.selectedRow = e;
        this.form = this.setupForm(e);
        const subs2 = this.form.get('qtyOrdered').valueChanges.subscribe(next => {
            if (typeof next === 'number') {
                if (next > 0.0 && this.selectedRow?.reference) {
                    this.form.get('reference').disable();
                    this.form.get('store').disable();
                } else {
                    this.form.get('reference').enable();
                    this.form.get('store').enable();
                }
            }
        });
        this.subscriptions.push(subs2);
        this.shellSrv.setLoading(false);
    }

    readForm(): TransactionLine {
        return this.form.getRawValue();
    }

    onArticle(a: Article | string) {
        this.selectedReference = typeof a === 'string'? a : a.reference? a.reference : null;
        this.articleSrv
            .getPPrice(this.selectedReference, this.form?.controls['store'].value || 0, this.parentId, this.id)
            .subscribe({
                next: res => this.updateStockAndValue(res),
                error: err => this.form.controls['price'].setValue(0.0)
            });
    }

    public setupForm(b: TransactionLine): UntypedFormGroup {
        this.selectedRow = b;
        this.selectedReference = b?.reference;

        return this.formBuilder.group({
            id: [b.id],
            transacId: [this.parentId],
            reference: [ { value: b.reference, disabled:  b.qtySatisfied > 0.0001 }],
            sourceDoc: [b.sourceDoc],
            store: [b.store],
            qtyOrdered: [{ value: b.qtyOrdered, disabled: this.document >= 513 && this.document <= 800 }],
            qtySatisfied: [{ value: b.qtySatisfied ||0, disabled: this.document < 513 || this.document > 800}, Validators.required],
            qtyInvoiced: [b.qtyInvoiced ||0, Validators.required],
            qtyReturned: [b.qtyReturned ||0, Validators.required],
            price: [b.price || 0, Validators.required],
            vat: [b.vat || 0, Validators.required],
            observation: [b.observation],
            footerMemo: [b.footerMemo],
            position: [{ value: b.position || 0, disabled: true }],
        });
    }
    public get id() {
        return this.queryId;
    }

    public set id(value: number) {
        this.queryId = value;
    }

    save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val = this.readForm();
        val.id = this.queryId;
        this.entitySrv.update(val)
            .pipe(tap(i => {
                if (this.queryId == 0) {
                    this.queryId = i;
                    val.id = i;
                }
                this.shellSrv.setLoading(true);
            })).subscribe({
                next: () => {
                    this.shellSrv.setLoading(false);
                    this.router.navigate(['../../lines-list'], {relativeTo: this.route}).then();
                    this.form.markAsUntouched();
                    this.snackBarSrv.showSuccessMessage();
                },
                error: err => {
                    this.snackBarSrv.showFailureMessage();
                    this.shellSrv.setLoading(false);
                    this.form?.reset(val);
                    throw err;
                }
            });
    }
    // save() {
    //     this.router.navigate(['../../lines-list'], {relativeTo: this.route}).then();
    // }
    cancel() {
        const obs = this.form.dirty ?
            this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
            of(true);
        obs.subscribe(res => {
            if (res) {
                this.router.navigate(['../../lines-list'], {relativeTo: this.route}).then();
            }
        });
    }
}
