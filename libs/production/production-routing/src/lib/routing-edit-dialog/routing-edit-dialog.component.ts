import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

// Angular Material Modules
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox'; // For isDefault, isActive

import { Routing } from '../production-routing-services/production-routing-api';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { FinalProductService } from '@ss/master-data/api-article';
import { MaterialModule } from '@ss/common/api-common';
import {ProductionRoutingService} from "../production-routing-services/production-routing.service";
import {of, switchMap, tap} from "rxjs";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog"; // Assuming this module exports MatDividerModule, MatChipsModule etc.

@Component({
    selector: 'app-routing-edit-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        TranslateDirective,
        UiAutoCompleteComponent,
        TranslatePipe,
        DatePickerComponent
    ],
    templateUrl: './routing-edit-dialog.component.html',
    styleUrls: ['./routing-edit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutingEditDialogComponent implements OnInit {
    private readonly productionRoutingSrv = inject(ProductionRoutingService);
    private readonly fb = inject(FormBuilder);
    private confirmationSrv = inject(ConfirmationDialogService);
    protected readonly finalProductSrv = inject(FinalProductService);
    readonly dialogRef = inject(MatDialogRef<RoutingEditDialogComponent>);
    readonly data: Routing = inject(MAT_DIALOG_DATA);

    form!: FormGroup;
    productLookup = new DefaultAutoCompleteModel(this.finalProductSrv, 'id', 'description2');

    statusOptions = signal<('DRAFT' | 'RELEASED' | 'OBSOLETE')[]>([
        'DRAFT',
        'RELEASED',
        'OBSOLETE'
    ]);

    constructor() {}

    ngOnInit(): void {
        this.form = this.fb.group({
            productId:     [this.data.productId, Validators.required],
            routingNumber: [{ value: this.data.routingNumber, disabled: this.data.id > 0 }], // Usually not editable
            revision:      [{ value: this.data.revision, disabled: this.data.id > 0 }],      // Usually not editable
            description:   [this.data.description],
            status:        [this.data.status || 'DRAFT', Validators.required],
            isDefault:     [this.data.isDefault || false],
            isActive:      [this.data.isActive || false],
            validFrom:     [this.data.validFrom, Validators.required],
            validTo:       [this.data.validTo],
        });

        // Set initial value for product autocomplete if data is available
        // if (this.data.productId && this.data.productName) {
        //     this.productLookup.initialValue = { id: this.data.productId, description: this.data.productName };
        // }
    }

    onSave(): void {
        if (this.form.valid) {
           const routing = { ...this.data, ...this.form.getRawValue() };
           this.productionRoutingSrv
               .update(routing)
               .subscribe(res => {
                   routing.id = res;
                   this.dialogRef.close(routing);
               });
        } else {
            this.form.markAllAsTouched();
        }
    }

    onCancel(): void {
        const obs = this.form.dirty? this.confirmationSrv.confirmDontSave() : of(true);
        obs.subscribe(result => {
            if (result) {
                this.dialogRef.close();
            }
        });
    }
}
