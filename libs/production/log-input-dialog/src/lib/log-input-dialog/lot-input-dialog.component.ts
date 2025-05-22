import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Agent, SupplierService } from '@ss/logistics/api-agent';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { LotAutoCompleteModel } from '@ss/master-data/api-article';
import { LotsService } from '@ss/common/api-lookup';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from '@ss/common/ui-shell';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { StoresService } from '@ss/stock/api-article-store';

@Component({
    selector: 'ss-log-input-dialog',
    imports: [CommonModule,
        MaterialModule,
        MatCard, MatCardContent, ReactiveFormsModule, TranslateDirective, UiAutoCompleteComponent, DatePickerComponent],
    templateUrl: './lot-input-dialog.component.html',
    styleUrl: './lot-input-dialog.component.scss'
})
export class LotInputDialogComponent {
    #confirmationSrv = inject(ConfirmationDialogService);
    #loginSrv = inject(LoginService);
    #fb = inject(FormBuilder);
    #supplierSrv = inject(SupplierService);
    #lotSrv = inject(StoresService);

    supplierLookup = new DefaultAutoCompleteModel<Agent>(this.#supplierSrv, 'id', 'denomination');
    storeLookup = new DefaultAutoCompleteModel(this.#lotSrv);

    constructor(private dialogRef:  MatDialogRef<LotInputDialogComponent>) {
    }

    form = this.#fb.group({
        id: [0],
        storeId: [0, Validators.required],
        supplier: [0],
        description: [''],
        descriptionAr: [''],
        lotState: ['', Validators.maxLength(1)],
        lotNumber: ['', Validators.required],
        creationDate: [new Date(), Validators.required],
        expires: [false, Validators.required],
        expirationDate: [null],
        team: [''],
        center: [this.#loginSrv.appCtx.center]
    });

    save() {
        const rawValue = this.form.getRawValue();
        rawValue.description = rawValue.lotNumber + '';
        rawValue.expires = rawValue.expirationDate !== null;
        this.dialogRef.close(rawValue);
        // this.#lotSrv.save(rawValue)
        //     .subscribe({
        //         next: res => {
        //             if (res > 0) {
        //                 this.#snackBarSrv.showSuccessMessage();
        //             }
        //             this.dialogRef.close( );
        //         }
        //     });
    }

    cancel() {
        this.#confirmationSrv
            .confirmDontSave()
            .subscribe(res => {
                if (res) {
                    this.dialogRef.close(null);
                }
            });
    }
}
