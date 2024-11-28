import { Component, inject, Input } from '@angular/core';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from "@ss/common/ui-auto-complete";
import {finalize, Subscription} from 'rxjs';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {MatDialogRef} from '@angular/material/dialog';
import {HttpEventType} from '@angular/common/http';
import {LtmInjectionService} from '@ltm/ltm-api';
import { LanguageService, MaterialModule } from "@ss/common/api-common";
import { INJResult } from '@ltm/ltm-api';
import { CommonModule } from "@angular/common";





import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { RouterOutlet } from "@angular/router";
import { CommonUiHourPickerModule } from "@ss/common/ui-hour-picker";

@Component({
    selector: 'ss-ltm-injection',
    templateUrl: './ltm-injection.component.html',
    styleUrls: ['./ltm-injection.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        PaginationComponent,

        ReactiveFormsModule,


        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterOutlet,
        CommonUiHourPickerModule
    ],
})
export class LtmInjectionComponent {
    // private matterSrv =  inject(LtmLineMatterService);
    // matterLookup = new DefaultAutoCompleteModel(this.matterSrv, 'matterId');

    @Input() requiredFileType = '.xlsx';
    isEditable = false;

    result: INJResult | null = null;
    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;
    processing = false;
    format: 1 | 2 = 1;

    fb = inject(UntypedFormBuilder);
    form = this.fb.group({
        from: [new Date(), Validators.required],
        to: [new Date(), Validators.required],
    });


    constructor(private dialogRef: MatDialogRef<LtmInjectionComponent>,
        private injectSrv: LtmInjectionService,
        private langSrv: LanguageService) {
    }


    upload(files: any) {
        const file: File = files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            const value = this.form.value;
            formData.append('file', file);
            formData.append('from', this.langSrv.formatDate(value.from));
            formData.append('to', this.langSrv.formatDate(value.to));
            formData.append('format', this.format.toString());

            this.processing = true;
            this.uploadSub = this.injectSrv
                .upload(formData)
                .pipe(finalize(() => this.reset()))
                .subscribe({
                    next: (res: any) => {
                        if (res.type == HttpEventType.UploadProgress) {
                            this.uploadProgress = Math.round(100 * (res.loaded / res.total));
                        } else {
                            this.result = res?.body;
                        }
                    },
                    error: (err) => {
                        this.processing = false;
                        throw err;
                    },
                    complete: () => {
                        // this.dialogRef.close( { count: 1 });
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

