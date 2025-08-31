import { Component } from '@angular/core';

import {
    BaseTransactionLinesDetailComponent,
    DOC_PART_REQUEST
} from '@ss/logistics/api-transaction';
import { PartsRequestLineService } from '../services/parts-request-line.service';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-parts-request-line-detail',
    standalone: true,
    imports: [FormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, TextFieldModule, UiAutoCompleteComponent],
    templateUrl: './parts-request-line-detail.component.html',
    styleUrls: ['../../../../../common/assets/src/assets/transac-lines-detail.scss'],
})
export class PartsRequestLineDetailComponent extends BaseTransactionLinesDetailComponent {

    constructor(public detailSrv: PartsRequestLineService) {
        super(detailSrv, DOC_PART_REQUEST);
    }
}
