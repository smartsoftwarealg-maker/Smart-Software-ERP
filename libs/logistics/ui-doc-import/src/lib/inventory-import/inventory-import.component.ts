import { Component, inject, Inject, Input } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { InventoryImportService } from '../inventory-import.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { LotsService, Lot } from '@ss/common/api-lookup';
import { TranslateDirective } from '@ss/common/ui-lang';

import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-inventory-import',
    templateUrl: './inventory-import.component.html',
    styleUrls: ['./inventory-import.component.scss'],
    standalone: true,
    imports: [TranslateDirective, MatMiniFabButton, MatProgressBar, MatCard, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, UiAutoCompleteComponent, MatSelect, MatOption, MatButton, TranslatePipe]
})
export class InventoryImportComponent {
    private fb = inject(UntypedFormBuilder);
    private injectSrv = inject(InventoryImportService);
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
        id:        [0,  Validators.required],
        store:     [0,  Validators.required],
        reference: ['', Validators.required],
        qty:       [0,  Validators.required],
        price:     ['', Validators.required]
    });

    constructor(private dialogRef: MatDialogRef<InventoryImportComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { transactId: number }) {
        this.form.controls['id'].setValue(data.transactId);
    }


    onFileSelected(files: any) {
        const file: File = files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append('file', file);
            Object.entries(this.form.value)
                .filter(([k, v]) => v != null && v != '' && v != ' ')
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
