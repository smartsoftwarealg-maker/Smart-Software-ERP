import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import {ContractArticleService} from '../contract-article.service';
import { FormBuilder, FormControl, ReactiveFormsModule, UntypedFormGroup, Validators } from "@angular/forms";
import {filter, map, of, switchMap, tap} from 'rxjs';
import {ArticleAutoCompleteModel, ArticleService} from '@ss/master-data/api-article';
import {SnackBarService} from '@ss/common/ui-shell';
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";



import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-contract-article-detail',
    templateUrl: './contract-article-detail.component.html',
    styleUrls: ['./contract-article-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule,
        RouterModule,
    ],

})
export class ContractArticleDetailComponent implements OnInit {
    private fb = inject(FormBuilder);
    private articleSrv =  inject(ArticleService);
    articleLookup = new ArticleAutoCompleteModel(this.articleSrv);
    form: UntypedFormGroup = null;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private entitySrv: ContractArticleService,
                private snackBarSrv: SnackBarService,
                private confirmSrv: ConfirmationDialogService) {
        this.articleLookup.onObjectSelected = a => {
            this.form.controls['reference'].setValue(a.reference);
            this.form.controls['vat'].setValue(a.vatValue);
        }
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
                if (res) {
                    this.snackBarSrv.showSuccessMessage();
                }
                this.router.navigate(['../'], { relativeTo: this.route }).then();
            });
    }

    cancel() {
        const confirm =
            this.form.dirty ? this.confirmSrv.confirm('COMMON_CONFIRMATION', 'COMMON_CANCEL') :
            of(true);
        confirm.pipe(switchMap(res => res?
            this.router.navigate(['../'], { relativeTo: this.route }):  of(false)))
            .subscribe(_ => {});
    }
}
