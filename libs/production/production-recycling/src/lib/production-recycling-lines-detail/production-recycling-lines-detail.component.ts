import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
    BaseTransactionLinesDetailComponent,
    DOC_PRODUCTION_RECYCLE,
} from '@ss/logistics/api-transaction';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MaterialModule } from '@ss/common/api-common';
import { ProductionRecyclingLinesService } from '../production-recycling-services/production-recycling-lines.service';

@Component({
    selector: 'ss-inventory-entry-lines-detail',
    styleUrls: [
        '../../../../../common/assets/src/assets/transac-lines-detail.scss',
    ],
    templateUrl: './production-recycling-lines-detail.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MaterialModule,
        MatMiniFabButton,
        MatCard,
        MatCardContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        UiAutoCompleteComponent,
        MatError,
        CdkTextareaAutosize,
    ],
})
export class ProductionRecyclingLinesDetailComponent
    extends BaseTransactionLinesDetailComponent
    implements OnInit, OnDestroy
{
    constructor(public detailSrv: ProductionRecyclingLinesService) {
        super(detailSrv, DOC_PRODUCTION_RECYCLE);
    }
}
