import { Component, inject, OnInit } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ExtraCostService } from '../services/extra-cost.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { COST_TYPES, ExtraCost, VALUE_TYPES } from '@ss/logistics/api-transaction';
import { of, switchMap, tap } from 'rxjs';
import { ArticleAutoCompleteModel, ServiceArticleService } from '@ss/stock/api-article';

@Component({
    selector: 'ss-extra-cost-detail',
    templateUrl: './extra-cost-detail.component.html',
    styleUrls: ['./extra-cost-detail.component.scss'],
})
export class ExtraCostDetailComponent implements OnInit {
    private serviceArticleSrv = inject(ServiceArticleService);
    private snackBarSrv = inject(SnackBarService);
    private confirmationSrv = inject(ConfirmationDialogService);
    private router = inject(Router);
    private route = inject(ActivatedRoute);
    private entitySrv = inject(ExtraCostService);
    private shellSrv = inject(ShellService);
    private fb = inject(FormBuilder);
    private parentId= 0;
    private Empty: ExtraCost = {
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

    costTypes = COST_TYPES;
    valueTypes = VALUE_TYPES;
    articleLookup = new ArticleAutoCompleteModel(this.serviceArticleSrv);
    isEditable = true;

    entity: ExtraCost = null;
    formId = 0;
    form = this.fb.group({
        id: new FormControl<number>(0),
        parentId: new FormControl<number>(0 || this.parentId),
        reference: new FormControl<string | null>(null),
        description: new FormControl<string | null>(null),
        transactDate: new FormControl<Date>(new Date()),
        amount: new FormControl<number>(0),
        vat: new FormControl<number | null>(null),
        agent: new FormControl<number>(0),
        invoiceNo: new FormControl<string | null>(null),
        foreignCurrency: new FormControl<boolean>(false),
        costType: new FormControl<number>(0),
        valueType: new FormControl<number>(0),
        exchangeRate: new FormControl<number>(0),
    });

    ngOnInit() {
        this.route
            .parent
            .parent
            .paramMap
            .pipe(tap(res => console.log(res)),
                switchMap(() => this.route.paramMap),
                tap(param => this.formId = +(param.get('id') || '0')),
                switchMap(() => this.formId? this.entitySrv.get(this.formId) : of(this.Empty)))
            .subscribe(res => {
                this.entity = res;
                this.form = this.fb.group({
                    id: new FormControl<number>(this.entity?.id),
                    parentId: new FormControl<number>(res.parentId || this.parentId),
                    reference: new FormControl<string>(res.reference),
                    description: new FormControl<string>(res.description),
                    transactDate: new FormControl<Date>(res.transactDate),
                    amount: new FormControl<number>(res.amount),
                    vat: new FormControl<number>(res.vat),
                    agent: new FormControl<number>(res.agent),
                    invoiceNo: new FormControl<string>(res.invoiceNo),
                    foreignCurrency: new FormControl<boolean>(res.foreignCurrency),
                    costType: new FormControl<number>(res.costType),
                    valueType: new FormControl<number>(res.valueType),
                    exchangeRate: new FormControl<number>(res.exchangeRate)
                });
            });
    }

    save() {
        this.cancel();
    }
    cancel() {
        this.router.navigate(['../../costs-list'], { relativeTo: this.route}).then();
    }
}
