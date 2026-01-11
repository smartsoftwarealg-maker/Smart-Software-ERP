import { Component, inject, signal } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { CategoryDiscount } from '../api/category-discount';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { CategoryDiscountService } from '../api/category-discount.service';
import { ArticleService } from '@ss/master-data/api-article';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatCard } from '@angular/material/card';
import {
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
} from '@angular/material/input';
import { MatMiniFabButton } from '@angular/material/button';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { sign } from 'chart.js/helpers';

@Component({
    selector: 'ss-category-discounts-detail',
    imports: [
        FormsModule,
        MatCard,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatMiniFabButton,
        ReactiveFormsModule,
        UiAutoCompleteComponent,
        TranslateDirective,
    ],
    templateUrl: './category-discounts-detail.component.html',
    styleUrl: './category-discounts-detail.component.scss',
})
export class CategoryDiscountsDetailComponent extends BaseChildEntityDetailComponent<CategoryDiscount> {
    #articleSrv = inject(ArticleService);
    #fb = inject(FormBuilder);
    articleLookup = new DefaultAutoCompleteModel(
        this.#articleSrv,
        'id',
        'description2',
    );

    constructor(public override entitySrv: CategoryDiscountService) {
        super(entitySrv, 'CategoryDiscount');
    }

    override setupForm(e: CategoryDiscount): UntypedFormGroup {
        return this.#fb.group({
            id: [e.id],
            parentId: [e.parentId || this.entitySrv.getParentId()],
            articleId: [e.articleId],
            discount: [e.discount],
        });
    }

    override ngOnInit() {
        const parentId = this.entitySrv.getParentId();
        super.ngOnInit();
        this.entitySrv.setParentId(parentId);
        console.log(this.entitySrv.getParentId(), this.entitySrv.curParentId());
        if (parentId === 0) {
            this.router.navigate(['..'], { relativeTo: this.route }).then();
        }
    }
}
