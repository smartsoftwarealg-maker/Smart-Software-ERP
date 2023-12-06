import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTransactionLinesDetailComponent, DOC_RESERVATION } from '@ss/logistics/api-transaction';
import { ReservationLinesService } from '../services/reservation-lines.service';
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { TextFieldModule } from "@angular/cdk/text-field";

@Component({
    selector: 'ss-parts-reservation-line-detail',
    standalone: true,
    imports: [CommonModule, CommonUiAutoCompleteModule, CommonUiLangModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, TextFieldModule],
    templateUrl: './parts-reservation-line-detail.component.html',
    styleUrl: '../../../../../common/assets/src/assets/transac-lines-detail.scss',
})
export class PartsReservationLineDetailComponent extends BaseTransactionLinesDetailComponent {
    constructor(
        public detailSrv: ReservationLinesService) {
        super(detailSrv,  DOC_RESERVATION);
    }
}
