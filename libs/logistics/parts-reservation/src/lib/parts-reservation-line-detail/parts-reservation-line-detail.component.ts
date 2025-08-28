import { Component } from '@angular/core';

import { BaseTransactionLinesDetailComponent, DOC_RESERVATION } from '@ss/logistics/api-transaction';
import { ReservationLinesService } from '../services/reservation-lines.service';


import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { TextFieldModule } from "@angular/cdk/text-field";
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-parts-reservation-line-detail',
    standalone: true,
    imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TextFieldModule,
    UiAutoCompleteComponent,
    TranslateDirective
],
    templateUrl: './parts-reservation-line-detail.component.html',
    styleUrl: '../../../../../common/assets/src/assets/transac-lines-detail.scss',
})
export class PartsReservationLineDetailComponent extends BaseTransactionLinesDetailComponent {
    constructor(
        public detailSrv: ReservationLinesService) {
        super(detailSrv,  DOC_RESERVATION);
    }
}
