import { Component, inject, input, OnInit, signal } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { TruckStatus } from '../weight-capture-api';
import {
    WeightCaptureDialogComponent,
    WeightCaptureService,
} from '@ss/sales/weight-capture';
import { BalanceService } from '../balance.service';

@Component({
    selector: 'ss-weight-capture-dialog-button-dialog',
    standalone: true,
    imports: [MatButtonModule],
    templateUrl: './weight-capture-dialog-button.component.html',
    styleUrl: './weight-capture-dialog-button.component.scss',
})
export class WeightCaptureDialogButtonComponent implements OnInit {

    transactionId = input(0);

    private dialog = inject(MatDialog);

    private weightCaptureSrv = inject(WeightCaptureService);
    private balanceTruckSrv = inject(BalanceService);
    urlExists = signal(false);

    ngOnInit() {
        this.weightCaptureSrv.getBalanceUrl().subscribe({
            next: (res) => {
                if (res?.url?.length > 0) {
                    this.balanceTruckSrv.setBalanceUrl(res.url);
                    this.urlExists.set(true);
                }
            },
            error: () => {},
        });
    }

    public openTareDialog() {
        const tare: TruckStatus = { id: this.transactionId(), type: 'tare' };
        this.dialog.open(WeightCaptureDialogComponent, {
            minWidth: 'fit-content',
            minHeight: 'fit-content',
            disableClose: true,
            data: tare,
        });
    }

    public openBrutDialog() {
        const brut: TruckStatus = { id: this.transactionId(), type: 'brut' };
        this.dialog.open(WeightCaptureDialogComponent, {
            minWidth: 'fit-content',
            height: 'fit-content',
            disableClose: true,
            data: brut,
        });
    }
}
