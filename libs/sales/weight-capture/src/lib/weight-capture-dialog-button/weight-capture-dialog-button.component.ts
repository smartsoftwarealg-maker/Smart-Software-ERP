import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TruckStatus } from '../weight-capture-api';
import { WeightCaptureDialogComponent } from '@ss/sales/weight-capture';

@Component({
    selector: 'ss-weight-capture-dialog-button-dialog',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './weight-capture-dialog-button.component.html',
    styleUrl: './weight-capture-dialog-button.component.scss',
})
export class WeightCaptureDialogButtonComponent {
    @Input() transactionId = 0;

    private dialog = inject(MatDialog);

    public openTareDialog() {
        const tare: TruckStatus = { id: this.transactionId, type: 'tare' };
        this.dialog.open(WeightCaptureDialogComponent, {
            minWidth: 'fit-content',
            minHeight: 'fit-content',
            disableClose: true,
            data: tare,
        });
    }

    public openBrutDialog() {
        const brut: TruckStatus = { id: this.transactionId, type: 'brut' };
        this.dialog.open(WeightCaptureDialogComponent, {
            minWidth: 'fit-content',
            height: 'fit-content',
            disableClose: true,
            data: brut,
        });
    }
}
