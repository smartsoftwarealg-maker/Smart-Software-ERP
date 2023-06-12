import { Component, inject, Input, OnInit } from '@angular/core';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {finalize, Subscription} from 'rxjs';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpEventType} from '@angular/common/http';
import {LtmLineService} from '../services/ltm-line.service';
import {LtmLineMatterService} from '../services/ltm-line-matter.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {LtmInjectionService} from '../services/ltm-injection.service';
import {LanguageService} from '@ss/common/api-common';
import { MatRadioChange } from "@angular/material/radio";

@Component({
    selector: 'ss-ltm-injection',
    templateUrl: './ltm-injection.component.html',
    styleUrls: ['./ltm-injection.component.scss'],
})
export class LtmInjectionComponent {
    private matterSrv =  inject(LtmLineMatterService);
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv, 'matterId');

    @Input()  requiredFileType = '.xlsx';
    isEditable = false;

    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;
    processing = false;
    format: 1|2 = 1;

    fb = inject(UntypedFormBuilder);
    form = this.fb.group({
        from:   [new Date(),                        Validators.required],
        to:     [new Date(),                        Validators.required],
    });

    constructor(private dialogRef: MatDialogRef<LtmInjectionComponent>,
                private injectSrv: LtmInjectionService,
                private langSrv: LanguageService) {
    }


    upload(files: any) {
        const file:File = files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            const value = this.form.value;
            formData.append('file', file);
            formData.append('from', this.langSrv.formatDate(value.from));
            formData.append('to',   this.langSrv.formatDate(value.to));
            formData.append('format',   this.format.toString());

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

    onFormat(e: MatRadioChange) {
        this.format = +e.value === 2? 2 : 1;
    }
}
