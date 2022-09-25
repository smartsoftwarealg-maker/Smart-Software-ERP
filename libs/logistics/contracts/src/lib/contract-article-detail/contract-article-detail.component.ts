import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractArticleService} from '../contract-article.service';
import {FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators} from '@angular/forms';
import {ProjectArticle} from '../contract-api.class';
import {filter, map, of, switchMap, tap} from 'rxjs';
import {ArticleAutoCompleteModel} from '@ss/logistics/api-logistics-common';
import {ArticleService} from '@ss/stock/api-article';
import {SnackBarService} from '@ss/common/ui-shell';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';


@Component({
    selector: 'ss-contract-article-detail',
    templateUrl: './contract-article-detail.component.html',
    styleUrls: ['./contract-article-detail.component.scss'],
})
export class ContractArticleDetailComponent implements OnInit {
    articleLookup = new ArticleAutoCompleteModel(this.articleSrv);
    form: UntypedFormGroup = null;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private entitySrv: ContractArticleService,
                private articleSrv: ArticleService,
                private snackBarSrv: SnackBarService,
                private confirmSrv: ConfirmationDialogService,
                private fb: FormBuilder) {
        this.articleLookup.onObjectSelected = a => this.form.controls['reference'].setValue(a.reference);
    }

    ngOnInit(): void {
        this.route
            .parent
            .parent
            .params
            .pipe(tap(params => this.entitySrv.setParentId(+params['id'] | 0)),
                  filter(_ => this.entitySrv.getParentId() > 0),
                  switchMap(_ => this.route.params),
                  map(params => +params['id'] | 0),
                  switchMap(id => this.entitySrv.get(id)))
            .subscribe(res => this.form = this.fb.group({
                id: new FormControl(res?.id || 0),
                parentId:     [res?.parentId | this.entitySrv.getParentId(), Validators.required],
                reference:    [res?.reference || null, Validators.required],
                price:        [res?.price | 0],
                address:      [res?.address],
                qty:          [res?.qty | 0, Validators.required],
                vat:          [res?.vat| 0, Validators.required],
                discount:     [res?.discount| 0],
                description:  [res?.description],
                articleId:    [res?.articleId]
            }));
    }

    save() {
        this.entitySrv
            .save(this.form.getRawValue())
            .subscribe(res => {
                console.log(res);
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                }
                this.router.navigate(['../'], { relativeTo: this.route }).then();
            });
    }

    cancel() {
        this.confirmSrv
            .confirm('COMMON_CONFIRMATION', 'COMMON_CANCEL')
            .pipe(switchMap(res => res?
                this.router.navigate(['../'], { relativeTo: this.route }):
                of(false)))
            .subscribe(_ => {});
    }
}
