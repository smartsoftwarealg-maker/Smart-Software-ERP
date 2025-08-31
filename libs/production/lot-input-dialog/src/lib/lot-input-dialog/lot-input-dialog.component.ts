import { Component, inject, signal } from '@angular/core';

import { Agent, SupplierService } from '@ss/logistics/api-agent';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { TranslateDirective } from '@ss/common/ui-lang';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { StoresService } from '@ss/stock/api-article-store';

@Component({
    selector: 'ss-lot-input-dialog',
    imports: [MaterialModule, MatCard, MatCardContent, ReactiveFormsModule, TranslateDirective, UiAutoCompleteComponent, DatePickerComponent],
    templateUrl: './lot-input-dialog.component.html',
    styleUrl: './lot-input-dialog.component.scss'
})
export class LotInputDialogComponent {
    #confirmationSrv = inject(ConfirmationDialogService);
    #loginSrv = inject(LoginService);
    #fb = inject(FormBuilder);
    #supplierSrv = inject(SupplierService);
    #lotSrv = inject(StoresService);
    #dialogRef =  inject(MatDialogRef<LotInputDialogComponent>);

    supplierLookup = new DefaultAutoCompleteModel<Agent>(this.#supplierSrv, 'id', 'denomination');
    storeLookup = new DefaultAutoCompleteModel(this.#lotSrv);
    invalidForm = signal(false);


    form = this.#fb.group({
        id: [0],
        storeId: [0, Validators.required],
        supplier: [0],
        description: [''],
        descriptionAr: [''],
        lotState: ['', Validators.maxLength(1)],
        lotNumber: [1, Validators.required],
        creationDate: [new Date(), Validators.required],
        expirationDate: [null],
        team: [''],
        center: [this.#loginSrv.appCtx.center]
    });

    save() {
        const rawValue = this.form.getRawValue();
        this.#dialogRef.close(rawValue);
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
                    this.#dialogRef.close(null);
                }
            });
    }
}
