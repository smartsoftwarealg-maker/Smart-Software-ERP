import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {
    Article,
    ArticleAutoCompleteModel,
    ArticleService,
    Location,
    LotAutoCompleteModel,
    QtyPrice
} from '@ss/master-data/api-article';
import { LotsService, Lot } from '@ss/common/api-lookup';
import { Observable, of, switchMap } from 'rxjs';
import {tap} from 'rxjs/operators';
import {LoginService} from '@ss/common/api-common';
import {TransactionLine} from './transaction-line';
import { Directive, HostListener, inject, OnInit, signal } from '@angular/core';
import {OptionService} from '@ss/logistics/ui-options';
import {
    DOC_CONSUMPTION,
    DOC_CORRECTION_OUT, DOC_DELIVERY, DOC_INVOICE, DOC_PRODUCTION, DOC_PRODUCTION_ORDER,
    DOC_RECEPTION,
    DOC_SEPARATOR_200,
    DOC_SEPARATOR_800
} from './transaction';
import { AbstractEntityComponent } from '@ss/common/ui-base-entity';
import { TransactionLinesClass } from './transaction-lines.class';
import { StockInfoService } from '@ss/master-data/api-article';
import { CostCenterService } from '@ss/logistics/api-cost-center';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { MatDialog } from '@angular/material/dialog';
import { Agent, AgentService } from '@ss/logistics/api-agent';
import { LotInputDialogComponent } from '@ss/production/lot-input-dialog';
import { ArticleSearchDlg } from '@ss/logistics/article-search';
import {
    DELIVERY_CANCELLATION,
    IMPORT_RECEPTION,
    INVOICE_CANCELLATION, PRODUCTION,
    PRODUCTION_ORDER,
} from '@ss/workflow';
import {PackagingUnitsService} from '@ss/logistics/packaging-units';
import {PackagingUnit} from '@ss/logistics/packaging-units';

@Directive()
export abstract class BaseTransactionLinesDetailComponent extends AbstractEntityComponent<TransactionLine> implements OnInit {
    #packagingUnitSrv = inject(PackagingUnitsService);
    #dialog = inject(MatDialog);
    #costCenterSrv = inject(CostCenterService);
    #agentSrv = inject(AgentService);
    #priceIndex = 0;

    private locationSrv = inject(StockInfoService);
    private formBuilder = inject(UntypedFormBuilder);
    private articleSrv = inject(ArticleService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    protected lotSrv = inject(LotsService);
    protected optionSrv =  inject(OptionService);
    protected loginSrv  =  inject(LoginService);
    protected packagingUnits: PackagingUnit[] = [];

    public confirmationSrv = inject(ConfirmationDialogService);
    public snackBarSrv = inject(SnackBarService);
    public shellSrv = inject(ShellService);
    public showStock = true;

    usesLots = signal(false);
    usesUnits = signal(false);
    referenceIsDisabled = signal(false);


    selectedRow: TransactionLine = null;
    agentId = 0;
    parentId: number;
    selectedReference: string = null;
    mainStore = 0;
    saveDisabled = false;
    articleStock = 0.0;
    articleLookup: ArticleAutoCompleteModel = new ArticleAutoCompleteModel(this.articleSrv);
    storeLookup: LotAutoCompleteModel = new LotAutoCompleteModel(this.lotSrv);
    cCenterLookup = new DefaultAutoCompleteModel(this.#costCenterSrv);

    protected constructor(public entitySrv: TransactionLinesClass, protected document: number) {
        super(entitySrv);
        // this.articleLookup = new ArticleAutoCompleteModel(this.articleSrv);
        // this.storeLookup   = new LotAutoCompleteModel(this.lotSrv);
        this.articleLookup.onObjectSelected = (a) => this.onArticleLookup(a);
        this.storeLookup.onObjectSelected =  (s) => { this.onStore(s); this.setSalesPrice(); };
    }

    preload(): Observable<Agent> {
        return this.route
            .parent
            .parent
            .paramMap
            .pipe(
                tap(p => {
                    this.parentId = +p.get('id') || 0;
                    this.entitySrv.setParentId(this.parentId);
                }),
                switchMap(() => this.optionSrv.get(this.loginSrv.appCtx.center)),
                tap(res => {
                    this.mainStore = res.mainStore;
                    this.usesLots.set(res.usesLots);
                    this.usesUnits.set(res.usesUnits);
                    this.storeLookup.showLot = res.usesLots;
                }),
                switchMap(res => res.usesUnits? this.#packagingUnitSrv.getData2(0, 50) : of([] as PackagingUnit[])),
                tap(res => this.packagingUnits = res),
                switchMap(() => this.entitySrv.getTransaction(this.parentId)),
                tap(transac => this.agentId = transac.agent),
                switchMap(() => this.agentId? this.#agentSrv.get(this.agentId) : of(null)),
                tap(res => this.#priceIndex = res? Math.max(0, Math.min(4, (res.price||1) - 1)) : 0),
            );
    }

    private updateStockAndValue(res: QtyPrice) {
        if (this.document === DOC_CONSUMPTION || this.document === DOC_CORRECTION_OUT || this.document === DOC_PRODUCTION_ORDER) {
            this.form.controls['price'].setValue(res.price);
        }
        this.articleStock = res.qty;
    }

    private resetPrice() {
        if (this.document === DOC_CONSUMPTION || this.document === DOC_CORRECTION_OUT) {
            this.form.controls['price'].setValue(0.0);
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.load();
    }

    public load() {
        this.form = null;
        this.preload()
            .pipe(
                switchMap(() => this.shellSrv.loadUserRights()),
                tap(() => {
                    const rights = this.shellSrv.getCurrentNodeRights();
                    this.saveDisabled &&= rights.edit;
                    this.isEditable = rights.edit && this.entitySrv.editable;
                }),
                switchMap(() => this.route.params),
                tap(p => {
                    this.queryId = +p['id'];
                }),
                switchMap(() => this.loadEntity(this.queryId || 0)))
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

    // finishLoading(e: TransactionLine) {
    //     this.selectedRow = e;
    //     this.form = this.setupForm(e);
    //     // console.log('*************************isCance', this.document);
    //     // const subs2 = this.form
    //     //     .get('qtyOrdered')
    //     //     .valueChanges.subscribe(next => {
    //     //         const isCancellation =
    //     //             !this.loginSrv.appCtx.manager &&
    //     //             !this.loginSrv.appCtx.responsible &&
    //     //             (this.document === INVOICE_CANCELLATION ||
    //     //                 this.document === DELIVERY_CANCELLATION);
    //     //         if (typeof next === 'number') {
    //     //             if ((next > 0.0 && this.selectedRow?.reference) || isCancellation) {
    //     //                 this.form.get('reference').disable();
    //     //                 this.form.get('store').disable();
    //     //             } else {
    //     //                 this.form.get('reference').enable();
    //     //                 this.form.get('store').enable();
    //     //             }
    //     //         }
    //     //     });
    //     //
    //     // this.subscriptions.push(subs2);
    //     this.shellSrv.setLoading(false);
    //     this.onStore({ id: e.store, center: this.loginSrv.appCtx.center, description: '', storeId: e.store });
    // }

    readForm(): TransactionLine {
        return this.form.getRawValue();
    }

    onArticleLookup(a: Article) {
        this.onArticle(a);
        this.setSalesPrice();
    }

    onArticle(a: Article) {
        this.selectedReference = a?.reference;
        this.form.controls['vat'].setValue(a?.vatValue || 0);
        this.form.controls['vat2'].setValue(a?.vatValue2);
        if (a.notForSale) {
            this.form.controls['store'].disable({onlySelf: true});
            this.form.controls['store'].setValue(null);
        } else {
            this.form.controls['store'].enable({onlySelf: true});
        }

        this.articleSrv
            .getPPrice(this.selectedReference, this.form?.controls['store'].value || 0, this.parentId, this.id)
            .subscribe({
                next: res => this.updateStockAndValue(res),
                error: () => this.resetPrice()
            });
    }

    private setSalesPrice() {
        if (this.document === DOC_INVOICE || this.document === DOC_DELIVERY) {
            const reference = this.form.controls['reference'].value;
            this.locationSrv
                .find(reference)
                .subscribe(res => {
                    const locations = res.body.filter(e => e.storeId === this.form.controls['store'].value);
                    if (locations.length > 0) {
                        const reference= locations[0];
                        const priceList = [reference.price1, reference.price2, reference.price3, reference.price4, reference.price5];
                        this.form.controls['price'].setValue(priceList[this.#priceIndex]);
                    }
                });
        }
    }

    onStore(s: Lot) {
        this.articleSrv
            .getPPrice(this.form?.controls['reference'].value, s?.id || 0, this.parentId, this.id)
            .subscribe({
                next: res => this.updateStockAndValue(res),
                error: () => this.resetPrice()
            });
    }

    finishLoading(e: TransactionLine) {
        super.finishLoading(e);
        this.onStore({ id: e.store, center: this.loginSrv.appCtx.center, description: '', storeId: e.store });
    }

    public setupForm(b: TransactionLine): UntypedFormGroup {
        this.selectedRow = b;
        this.selectedReference = b?.reference;

        if (b.reference && b.store && (this.document < DOC_SEPARATOR_200 || this.document > DOC_SEPARATOR_800)) {
            this.articleSrv
                .getPPrice(b.reference, b.store, b.transacId, b.id)
                .subscribe({
                    next: res => this.updateStockAndValue(res),
                    error: () => this.resetPrice()
                });
        }



        const referenceIsDisabled =
            !this.isEditable ||
            ((this.document === INVOICE_CANCELLATION || this.document === DELIVERY_CANCELLATION) && !this.loginSrv.appCtx.manager && !this.loginSrv.appCtx.responsible) ||
            ( b.qtySatisfied > 0.0001 || !!b.sourceDoc || (this.document >= 200 && this.document <= 800 && b.qtyOrdered > 0.0001));
        this.referenceIsDisabled.set(referenceIsDisabled);

        const unitsIsDisabled =
            !this.isEditable ||
            b.qtySatisfied > 0.0 ||
            ((this.document < DOC_SEPARATOR_200 ||
                this.document > DOC_SEPARATOR_800) &&
                b.qtyOrdered > 0.0) ||
            (b.sourceDoc &&
                this.document >= DOC_SEPARATOR_200 &&
                this.document <= DOC_SEPARATOR_800 &&
                b.qtyOrdered > 0.0) ||
            b.document == PRODUCTION_ORDER ||
            b.document == PRODUCTION;
        const units = b.units || 1;

        return this.formBuilder.group({
            id:           [b.id],
            transacId:    [this.parentId],
            reference:    [{ value: b.reference, disabled: referenceIsDisabled }],
            sourceDoc:    [b.sourceDoc],
            store:        [{ value: b.store, disabled: referenceIsDisabled }],
            qtyOrdered:   [{ value: b.qtyOrdered / units || 0, disabled: !this.isEditable || (this.document > DOC_SEPARATOR_200 && this.document < DOC_SEPARATOR_800 && !(this.document === DOC_PRODUCTION && (b.sourceDoc == undefined || b.qtySatisfied < 0.00001) ))}, Validators.required],
            qtySatisfied: [{ value: b.qtySatisfied / units ||0, disabled: !this.isEditable || (this.document < DOC_SEPARATOR_200 || this.document > DOC_SEPARATOR_800 || this.document === DOC_PRODUCTION)}, Validators.required],
            qtyInvoiced:  [{ value: b.qtyInvoiced / units ||0, disabled: !this.isEditable || (this.document != DOC_RECEPTION)} , Validators.required],
            qtyReturned:  [{ value: b.qtyReturned / units||0, disabled: true} , Validators.required],
            price:        [{ value: b.price || 0, disabled: !this.isEditable }, Validators.required],
            vat:          [{ value: b.vat || 0, disabled: !this.isEditable }, Validators.required],
            vat2:         [{ value: b.vat2, disabled: !this.isEditable }],
            observation:  [{ value: b.observation, disabled: !this.isEditable }],
            footerMemo:   [{ value: b.footerMemo, disabled: !this.isEditable }],
            position:     [{ value: b.position || 0, disabled: !this.isEditable }],
            charge:       [{ value: b.charge || 0, disabled: !this.isEditable }],
            charge2:      [b.charge2 || 0],
            charge3:      [b.charge3 || 0],
            charge4:      [b.charge4 || 0],
            units:        [{ value: units, disabled: unitsIsDisabled }, Validators.min(1)],
            costCenter:   [{value: b.costCenter, disabled: !this.isEditable}],
            pprice:       [{value:b.pprice, disabled: !this.isEditable }],
            bomId:        [{ value: b.bomId, disabled: !this.isEditable || ( (this.document == DOC_PRODUCTION || this.document == DOC_PRODUCTION_ORDER) && b.qtySatisfied > 0.00001 )}],
        });
    }
    public get id() {
        return this.queryId;
    }

    public set id(value: number) {
        this.queryId = value;
    }

    protected scaleUnits(val: TransactionLine) {
        if (this.usesUnits()) {
            val.qtyOrdered *= val.units;
            val.qtySatisfied *= val.units;
            val.qtyInvoiced *= val.units;
            val.qtyReturned *= val.units;
        }
    }

    save() {
        if (this.saveButton.disabled) {
            return;
        }
        this.saveButton.disabled = true;
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val = this.readForm();
        this.scaleUnits(val);
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
                    if (this.usesUnits()) {
                        val.qtyOrdered /= val.units;
                        val.qtySatisfied /= val.units;
                        val.qtyInvoiced /= val.units;
                        val.qtyReturned /= val.units;
                    }
                    this.form?.reset(val);
                    this.saveButton.disabled = false;
                    throw err;
                }
            });
    }
    // save() {
    //     this.router.navigate(['../../lines-list'], {relativeTo: this.route}).then();
    // }
    // cancel() {
    //             this.router.navigate(['../../lines-list'], {relativeTo: this.route}).then();
    //     // const obs = this.form.dirty ?
    //     //     this.confirmationSrv.confirm('COMMON_CANCEL', 'COMMON_CANCEL') :
    //     //     of(true);
    //     // obs.subscribe(res => {
    //     //     if (res) {
    //     //     }
    //     // });
    // }

    protected goBack() {
        this.router.navigate(['../../lines-list'], {relativeTo: this.route}).then();
    }

    showLotInputDialog() {
        const dialogRef = this.#dialog.open(LotInputDialogComponent, {
            width: '1200px!important',
            height: '420px',
            maxWidth: '1200px',
            disableClose: true
        });
        dialogRef
            .afterClosed()
            .pipe(switchMap(res => res? this.lotSrv.save(res as Lot): of(0)))
            .subscribe((result: number) => {
                if (result > 0) {
                    this.snackBarSrv.showSuccessMessage();
                    this.form.controls['store'].setValue(result);
                }
            });
    }

    showSearchDialog() {
        const dialogRef = this.#dialog.open(ArticleSearchDlg, {
            width: '900px!important',
            height: '640px',
            maxWidth: '900px',
            disableClose: true
        });
        dialogRef
            .afterClosed()
            .pipe(tap((location: Location|null) => {
                if (location) {
                    this.form.controls['reference'].setValue(location.reference);
                    this.form.controls['store'].setValue(location.storeId);
                    this.articleStock = location.stock;

                    const priceList = [location.price1, location.price2, location.price3, location.price4, location.price5];
                    this.form.controls['price'].setValue(priceList[this.#priceIndex]);
                }
            }),
            switchMap(res => this.articleSrv.get(res.referenceId))
            ).subscribe((article: Article) => this.onArticle(article));
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.altKey && event.key === 'f') {
            this.showSearchDialog();
            event.preventDefault();
        }
    }

}

