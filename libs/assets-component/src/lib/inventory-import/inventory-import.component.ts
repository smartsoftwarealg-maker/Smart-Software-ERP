import {Component, Inject, Input, OnInit} from '@angular/core';
import {finalize, Subscription} from 'rxjs';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {HttpEventType} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LotsService, Store} from '@ss/common/api-lookup';
import {AssetInventoryService} from '../asset-inventory.service';

@Component({
    selector: 'ss-inventory-import',
    templateUrl: './inventory-import.component.html',
    styleUrls: ['./inventory-import.component.scss'],
})
export class InventoryImportComponent {
    storeAutoCompleteModel: DefaultAutoCompleteModel<Store> = new DefaultAutoCompleteModel<Store>(this.storeNameSrv);
    columns = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
               'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    @Input()
    requiredFileType = '.xlsx';
    isEditable = false;

    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;
    processing = false;

    form = this.fb.group({
        reference: [null,  Validators.required],
        date:      [null,  Validators.required],
        status:    [null                      ],
        user:      [null                      ],
        office:    [null                      ],
    });

    constructor(private dialogRef: MatDialogRef<InventoryImportComponent>,
                private injectSrv: AssetInventoryService,
                private fb: UntypedFormBuilder,
                private storeNameSrv: LotsService,
                @Inject(MAT_DIALOG_DATA) private data: { transactId: number }) {
    }


    onFileSelected(files: any) {
        const file:File = files[0];
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
                    error: (err: Error) => {
                        this.processing = false;
                        throw err;
                    },
                    complete: () => {
                        this.dialogRef.close( { count: 1 });
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
