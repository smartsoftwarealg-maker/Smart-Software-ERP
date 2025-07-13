import { Component, Inject, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateDirective } from '@ss/common/ui-lang';
import { TruckStatus } from '../weight-capture-api';
import { WeightCaptureService } from '../weight-capture.service';
import { BalanceService } from '../balance.service';
import { SnackBarService } from '@ss/common/ui-shell';

const TARE = 0;
const BRUT = 1;

@Component({
    selector: 'ss-weight-capture-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        TranslateDirective,
        MaterialModule,
    ],
    templateUrl: './weight-capture-dialog.component.html',
    styleUrl: './weight-capture-dialog.component.scss',
})
export class WeightCaptureDialogComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    public type = 0;
    scaleTruckFC = new FormControl(0);
    form = this.fb.group({
        id: [0],
        tareId: [0],
        tare: [0],
        tareTime: [],
        brutId: [0],
        brut: [0],
        brutTime: [],
        tareUserDescription: [''],
        brutUserDescription: [''],
    });

    private weightCaptureSrv = inject(WeightCaptureService);
    private balanceTruckSrv = inject(BalanceService);
    private snackBarSrv = inject(SnackBarService);

    constructor(
        private dialogRef: MatDialogRef<WeightCaptureDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: TruckStatus,
    ) {
        this.data.type == 'tare' ? (this.type = TARE) : (this.type = BRUT);
        this.weightCaptureSrv.getWeightCapture(data.id).subscribe({
            next: (res) => {
                this.form.controls['id'].setValue(res.id || 0);
                this.form.controls['tareId'].setValue(res.tareId || 0);
                this.form.controls['tare'].setValue(res.tare || 0);
                this.form.controls['tareTime'].setValue(res.tareTime);
                this.form.controls['brutId'].setValue(res.brutId || 0);
                this.form.controls['brut'].setValue(res.brut || 0);
                this.form.controls['brutTime'].setValue(res.brutTime);
                this.form.controls['tareUserDescription'].setValue(
                    res.tareUserDescription,
                );
                this.form.controls['brutUserDescription'].setValue(
                    res.brutUserDescription,
                );
            },
            error: (err) => {
                throw err;
            },
        });
    }

    ngOnInit(): void {
        this.readTruckScale();
    }

    ngOnDestroy(): void {
        this.balanceTruckSrv.reset();
    }

    save() {
        if (this.data.type == 'tare') {
            this.weightCaptureSrv
                .updateTare(this.form.getRawValue())
                .subscribe({
                    next: () => {
                        this.snackBarSrv.showSuccessMessage();
                        this.dialogRef.close(this.form.getRawValue());
                    },
                    error: (err) => {
                        this.snackBarSrv.showFailureMessage();
                        throw err;
                    },
                });
        }
        if (this.data.type == 'brut') {
            this.weightCaptureSrv
                .updateBrut(this.form.getRawValue())
                .subscribe({
                    next: () => {
                        this.snackBarSrv.showSuccessMessage();
                        this.dialogRef.close(this.form.getRawValue());
                    },
                    error: (err) => {
                        this.snackBarSrv.showFailureMessage();
                        throw err;
                    },
                });
        }
    }

    readTare() {
        this.form.controls.tare.setValue(+this.scaleTruckFC.value);
    }

    readBrut() {
        this.form.controls.brut.setValue(+this.scaleTruckFC.value);
    }

    cancel() {
        this.dialogRef.close();
    }

    readTruckScale() {
        this.balanceTruckSrv.getTruckScale().subscribe({
            next: (weight) => {
                this.scaleTruckFC.setValue(weight.reading);
            },
            error: (err) => {
                throw err;
            },
        });
    }

    readonly TARE = TARE;
}
