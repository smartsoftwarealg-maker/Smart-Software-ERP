import {Component, inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MaterialModule } from '@ss/common/api-common';
import {FormControl, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';


import { OrgChartModule } from 'angular13-organization-chart';
import { TranslateDirective, TranslatePipe} from '@ss/common/ui-lang';

export interface QuantityInputData {
    quantity: number;
}

@Component({
    selector: 'ss-quantity-input-dialog',
    templateUrl: './quantity-input.component.html',
    styleUrls: ['./quantity-input.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        OrgChartModule,
        TranslatePipe,
    ],
})
export class QuantityInputComponent implements OnInit {
    private dialogRef  = inject(MatDialogRef<QuantityInputComponent>);
    readonly data = inject<QuantityInputData>(MAT_DIALOG_DATA);
    readonly quantity = new FormControl<number>(20, [Validators.required, Validators.min(1), Validators.max(50)]);

    public cancel() {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.quantity.setValue(this.data.quantity||20);
    }

    public close() {
        this.dialogRef.close(this.quantity.value);
    }
}
