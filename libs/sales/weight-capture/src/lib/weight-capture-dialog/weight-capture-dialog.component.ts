import {
    Component,
    Inject,
    inject,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import { MaterialModule } from '@ss/common/api-common';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateDirective } from '@ss/common/ui-lang';
import { Scale, ScaleList, TruckStatus } from '../weight-capture-api';
import { WeightCaptureService } from '../weight-capture.service';
import { ScaleService } from '../scale.service';
import { SnackBarService } from '@ss/common/ui-shell';
import { DOC_RECEPTION } from '@ss/logistics/api-transaction';

const TARE = 0;
const BRUT = 1;
const KG = 1; // one Kilogram = itself
const T = 0.001; // One Kilogram = 0.001T

@Component({
    selector: 'ss-weight-capture-dialog',
    standalone: true,
    imports: [MatButtonModule, TranslateDirective, MaterialModule],
    templateUrl: './weight-capture-dialog.component.html',
    styleUrl: './weight-capture-dialog.component.scss',
})
export class WeightCaptureDialogComponent implements OnInit, OnDestroy {
    private fb = inject(FormBuilder);
    public type = 0;
    public unit = T;
    public scaleControls: FormControl[] = [];
    public scales: Scale[] = [];
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
    isReception = signal(false);
    updateQty = new FormControl(false);

    private weightCaptureSrv = inject(WeightCaptureService);
    private scaleService = inject(ScaleService);
    private snackBarSrv = inject(SnackBarService);

    constructor(
        private dialogRef: MatDialogRef<WeightCaptureDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: TruckStatus,
    ) {
        this.data.type == 'tare' ? (this.type = TARE) : (this.type = BRUT);
        this.isReception.set(
            data.document == DOC_RECEPTION && this.data.type == 'brut',
        );
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
        this.scaleService.reset();
    }

    save() {
        if (this.data.type == 'tare') {
            this.weightCaptureSrv
                .updateTare(this.form.getRawValue())
                .subscribe({
                    next: () => {
                        this.snackBarSrv.showSuccessMessage();
                        this.dialogRef.close(true);
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
                        const quantity = this.calculateQuantity();
                            this.dialogRef.close( quantity != null ? quantity : true ); // if quantity = 0 it's true
                    },
                    error: (err) => {
                        this.snackBarSrv.showFailureMessage();
                        throw err;
                    },
                });
        }
    }

    private calculateQuantity(): number | null {
        if (!this.updateQty.value) return null;
        const brut = Number(this.form.controls.brut.value);
        const tare = Number(this.form.controls.tare.value);
        return (!isNaN(brut) && !isNaN(tare))
            ? (brut - tare) * this.unit
            : null;
    }

    cancel() {
        this.dialogRef.close(false);
    }

    readTruckScale() {
        this.scaleService.startPolling().subscribe({
            next: (list: ScaleList) => {
                this.scales = list.scales;
                if (this.scaleControls.length !== this.scales.length) {
                    this.scaleControls = this.scales.map(
                        (s) => new FormControl(s.reading),
                    );
                } else {
                    this.scales.forEach((s, i) =>
                        this.scaleControls[i].setValue(
                            s.reading !== null ? s.reading : '-',
                        ),
                    );
                }
            },
            error: (err) => {
                throw err;
            },
        });
    }

    get weightControl() {
        return this.type === TARE
            ? this.form.controls.tare
            : this.form.controls.brut;
    }

    readWeight(index: number) {
        const value = this.scaleControls[index].value;
        const finalValue = isNaN(+value)
            ? null
            : parseFloat((+value * this.unit).toFixed(2));
        if (this.type === TARE) {
            this.form.controls.tare.setValue(finalValue);
        } else {
            this.form.controls.brut.setValue(finalValue);
        }
    }

    readonly TARE = TARE;
    readonly T = T;
    readonly KG = KG;
}
