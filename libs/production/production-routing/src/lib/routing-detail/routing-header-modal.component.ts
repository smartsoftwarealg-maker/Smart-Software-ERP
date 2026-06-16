import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {Routing} from "../production-routing-services/production-routing-api";
import {ProductionRoutingService} from "../production-routing-services/production-routing.service";

@Component({
    selector: 'app-routing-header-modal',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, MatDialogModule,
        MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule
    ],
    templateUrl: './routing-header-modal.component.html',
    styleUrls: ['./routing-header-modal.component.scss']
})
export class RoutingHeaderModalComponent {
    private readonly fb = inject(FormBuilder);
    private readonly service = inject(ProductionRoutingService);
    readonly data = inject<Routing | null>(MAT_DIALOG_DATA);
    readonly dialogRef = inject(MatDialogRef<RoutingHeaderModalComponent>);

    mode = this.data ? 'edit' : 'create';

    form: FormGroup = this.fb.nonNullable.group({
        number: [this.data?.number || ''],
        revision: [this.data?.revision || '1.0'],
        productId: [this.data?.productId || ''],
        status: [this.data?.status || 'DRAFT'],
        validFrom: [this.data?.validFrom || ''],
        validTo: [this.data?.validTo || ''],
        changeReason: [this.data?.changeReason || '']
    });

    isSaving = false;

    constructor() {
        if (this.mode === 'edit') {
            this.form.get('number')?.disable();
            this.form.get('revision')?.disable();
        }
    }

    submit() {
        if (this.form.invalid) return;
        this.isSaving = true;

        this.service.saveRoutingHeader(this.form.getRawValue()).subscribe({
            next: () => {
                this.isSaving = false;
                this.dialogRef.close({ ...this.data, ...this.form.getRawValue() });
            },
            error: () => { this.isSaving = false; }
        });
    }
}
