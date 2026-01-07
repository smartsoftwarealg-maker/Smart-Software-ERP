import {Component, inject, input, OnInit, signal} from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {TruckStatus} from '../weight-capture-api';
import {
    WeightCaptureDialogComponent,
    WeightCaptureService,
} from '@ss/sales/weight-capture';
import {ScaleService} from '../scale.service';
import {DOC_RECEPTION} from "@ss/logistics/api-transaction";

@Component({
    selector: 'ss-weight-capture-dialog-button-dialog',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './weight-capture-dialog-button.component.html',
    styleUrl: './weight-capture-dialog-button.component.scss',
})
export class WeightCaptureDialogButtonComponent implements OnInit {
    transactionId = input(0);
    document = input(0);
    callback = input<(id: number, qty: number) => void>();

    private dialog = inject(MatDialog);

    private weightCaptureSrv = inject(WeightCaptureService);
    private balanceTruckSrv = inject(ScaleService);
    scaleExists = signal(false);

    ngOnInit() {
        this.weightCaptureSrv.hasScaleConfig().subscribe({
            next: (exists) => {
                if (exists) {
                    this.scaleExists.set(true);
                }
            },
            error: () => {
            },
        });
    }

    public openTareDialog() {
        const tare: TruckStatus = {id: this.transactionId(), type: 'tare', document: this.document()};
        this.dialog.open(WeightCaptureDialogComponent, {
            disableClose: true,
            data: tare,
        });
    }

    public openBrutDialog() {
        const brut: TruckStatus = {id: this.transactionId(), type: 'brut', document: this.document()};
        const dialogRef = this.dialog.open(WeightCaptureDialogComponent, {
            disableClose: true,
            data: brut,
        });
        if (this.document() == DOC_RECEPTION) {
            dialogRef.afterClosed().subscribe((result) => {
                if (result != null && typeof (result) == 'number'){
                    this.callback()?.(this.transactionId(), result);
                }
            });
        }

    }
}
