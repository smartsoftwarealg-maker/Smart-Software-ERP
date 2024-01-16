import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtraCostService } from '../services/extra-cost.service';
import { FormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { COST_TYPES, ExtraCost, VALUE_TYPES } from '@ss/logistics/api-transaction';
import { of, switchMap, tap } from 'rxjs';
import { ArticleAutoCompleteModel, ServiceArticleService } from '@ss/master-data/api-article';
import { AbstractEntityComponent } from '@ss/common/ui-base-entity';
import { Agent, SupplierService } from '@ss/logistics/api-agent';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-extra-cost-detail',
    templateUrl: './extra-cost-detail.component.html',
    styleUrls: ['./extra-cost-detail.component.scss'],
})
export class ExtraCostDetailComponent extends AbstractEntityComponent<ExtraCost> implements OnInit {
    private supplierSrv = inject(SupplierService);
    private serviceArticleSrv = inject(ServiceArticleService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private fb = inject(FormBuilder);
    private parentId= 0;

    public supplierLookup   = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');

    public Empty: ExtraCost = {
        id: 0,
        parentId: 0,
        reference: '',
        transactDate: new Date(),
        amount: 0,
        vat: 0,
        foreignCurrency: false,
        costType: 1,
        valueType: 1,
        exchangeRate: 1.0
    };

    public override shellSrv = inject(ShellService);
    public override snackBarSrv = inject(SnackBarService);
    public override confirmationSrv = inject(ConfirmationDialogService);

    costTypes = COST_TYPES;
    valueTypes = VALUE_TYPES;
    articleLookup = new ArticleAutoCompleteModel(this.serviceArticleSrv);

    entity: ExtraCost = null;
    formId = 0;

    constructor(public override entitySrv: ExtraCostService) {
        super(entitySrv);
    }

    override ngOnInit() {
        this.route
            .parent
            .parent
            .paramMap
            .pipe(
                tap(params => this.parentId = +(params.get('id') || '0')),
                switchMap(() => this.route.paramMap),
                tap(param => this.formId = +(param.get('id') || '0')),
                switchMap(() => this.formId? this.entitySrv.get(this.formId) : of(this.Empty)))
            .subscribe(res => {
                this.entity = res;
                this.form = this.setupForm(res);
            });
        super.ngOnInit();
    }

    override setupForm(e: ExtraCost): UntypedFormGroup {
        this.id = e.id;
        return this.fb.group({
            id: new FormControl<number>(e?.id || 0),
            parentId: new FormControl<number>(e.parentId || this.parentId),
            reference: new FormControl<string>(e.reference),
            description: new FormControl<string>(e.description),
            transactDate: new FormControl<Date>(e.transactDate),
            amount: new FormControl<number>(e.amount),
            vat: new FormControl<number>(e.vat),
            agent: new FormControl<number>(e.agent || 0, Validators.required),
            invoiceNo: new FormControl<string>(e.invoiceNo),
            foreignCurrency: new FormControl<boolean>(e.foreignCurrency),
            costType: new FormControl<number>(e.costType),
            valueType: new FormControl<number>(e.valueType),
            exchangeRate: new FormControl<number>(e.exchangeRate)
        });
    }

    protected override goBack() {
        this.router.navigate(['../../costs-list'], { relativeTo: this.route}).then();
    }

    override readForm(): ExtraCost {
        return this.form.getRawValue();
    }
}
