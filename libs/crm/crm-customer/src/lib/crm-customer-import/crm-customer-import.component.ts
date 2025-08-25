import { Component, Inject, inject, Input } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { LotsService, Lot } from '@ss/common/api-lookup';
import {  DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { finalize, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { CustomerImportService } from '../customer-import.service';

import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-crm-customer-import',
    templateUrl: './crm-customer-import.component.html',
    styleUrls: ['./crm-customer-import.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    TranslatePipe,
    ReactiveFormsModule
],

})
export class CrmCustomerImportComponent {
    private fb = inject(UntypedFormBuilder);
    private injectSrv = inject(CustomerImportService);
    private storeNameSrv = inject(LotsService);

    storeAutoCompleteModel: DefaultAutoCompleteModel<Lot> = new DefaultAutoCompleteModel<Lot>(this.storeNameSrv);
    columns = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL',
        'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ'
    ];

    @Input()
        requiredFileType = '.xlsx';
    isEditable = false;

    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;
    processing = false;

    form = this.fb.group({
        center:      ['A'],
        code:        ['B',  Validators.required],
        description: ['C', Validators.required],
        address:     ['D', Validators.required],
        commReg:     ['E'],
        nif:         ['F'],
        article:     ['G'],
        phone:       ['H'],
        email:       ['I'],
        agentType:   ['J'],
        nis:         ['K'],
        paymode:     ['L'],
        swift:       ['M']
    });

    constructor(private dialogRef: MatDialogRef<CrmCustomerImportComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { transactId: number }) {
    }


    onFileSelected(files: any) {
        const file: File = files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append('file', file);
            Object.entries(this.form.value)
                .filter(([ , v]) => v != null && v != '' && v != ' ')
                .forEach(([k, v]) => formData.append(k, v.toString()));
            this.processing = true;
            this.uploadSub = this.injectSrv
                .upload(formData)
                .pipe(finalize(() => this.reset()))
                .subscribe({
                    next: (res: any) => {
                        if (res.type == HttpEventType.UploadProgress) {
                            this.uploadProgress = Math.round(100 * (res.loaded / res.total));
                        }
                    },
                    error: (err) => {
                        this.processing = false;
                        throw err;
                    },
                    complete: () => {
                        this.dialogRef.close({ count: 1 });
                        this.processing = false;
                    }
                });
        }
    }

    cancelUpload() {
        this.uploadSub.unsubscribe();
        this.reset();
    }

    reset() {
        this.uploadProgress = null;
        this.uploadSub = null;
    }

    public cancel() {
        this.dialogRef.close();
    }

    onChange(e: any) {
        this.fileName = e[0]?.name;
    }

}
