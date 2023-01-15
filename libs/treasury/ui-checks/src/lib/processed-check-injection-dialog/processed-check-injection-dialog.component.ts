import {Component, Input} from '@angular/core';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LotsService, Store} from '@ss/common/api-lookup';
import {finalize, Subscription} from 'rxjs';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpEventType} from '@angular/common/http';
import {ProcessedCheckService} from '@ss/treasury/api-checks';
import {BankService} from '@ss/administration/api-bank';

@Component({
    selector: 'ss-processed-check-injection-dialog',
    templateUrl: './processed-check-injection-dialog.component.html',
    styleUrls: ['./processed-check-injection-dialog.component.scss'],
})
export class ProcessedCheckInjectionDialogComponent {
    bankLookup = new DefaultAutoCompleteModel(this.bankSrv);
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
        bankId: [0,          Validators.required],
        number: ['',         Validators.required],
        date:   [new Date(), Validators.required],
        amount: ['',         Validators.required],
    });

    constructor(private dialogRef: MatDialogRef<ProcessedCheckInjectionDialogComponent>,
                private bankSrv:  BankService,
                private injectSrv: ProcessedCheckService,
                private fb: UntypedFormBuilder,
                private storeNameSrv: LotsService) {
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
                    error: (err) => {
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
