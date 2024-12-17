import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import { WorkArticle } from '@ss/cmms/cmms-api';
import { FormBuilder, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { ArticleService } from '@ss/master-data/api-article';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

import { MatTableModule } from '@angular/material/table';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { PMPart } from '../services/asset-api';
import { CmmsAssetPmArticleService } from '../services/cmms-asset-pm-article.service';
import { of, switchMap, tap } from 'rxjs';

@Component({
    selector: 'ss-work-order-article-detail',
    standalone: true,
    imports: [
        CommonModule,

        MatTableModule,


        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
       
        MatButtonModule,
        MaterialModule,
        UiAutoCompleteComponent
    ],
    templateUrl: './asset-pm-article-detail.component.html',
    styleUrls: ['./asset-pm-article-detail.component.css'],
})
export class AssetPmArticleDetailComponent extends BaseChildEntityDetailComponent<PMPart> implements OnInit {
    private articleSrv = inject(ArticleService);
    private fb = inject(FormBuilder);

    articleLookup = new DefaultAutoCompleteModel(this.articleSrv, 'id', 'description2');

    constructor(protected override entitySrv: CmmsAssetPmArticleService) {
        super(entitySrv, 'PMPart');
    }

    setupForm(e: PMPart): UntypedFormGroup {
        return this.fb.group({
            id:        [e.id],
            parentId:  [e.parentId || this.entitySrv.getParentId()],
            partId:    [e.partId],
            qty:       [e.qty]
        });
    }

    override ngOnInit() {
        this.route
            .paramMap
            .pipe(
                tap(map => this.id = +map.get('id') || 0),
                switchMap(map => {
                    this.EMPTY_RECORD.parentId = +map.get('id') || 0;
                    return this.id? this.entitySrv.get(this.id) : of(this.EMPTY_RECORD);
                })
            ).subscribe(ent => {
                this.form = this.setupForm(ent);
            });
        this.isEditable = this.shellSrv.getCurrentNodeRights()?.edit || false;
    }
}
