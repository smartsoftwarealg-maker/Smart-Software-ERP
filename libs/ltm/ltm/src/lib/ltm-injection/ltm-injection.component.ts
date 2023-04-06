import {Component, Input, OnInit} from '@angular/core';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {finalize, Subscription} from 'rxjs';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpEventType} from '@angular/common/http';
import {LtmLineService} from '../ltm-line.service';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {LtmInjectionService} from '../ltm-injection.service';
import {LanguageService} from '@ss/common/api-common';

@Component({
    selector: 'ss-ltm-injection',
    templateUrl: './ltm-injection.component.html',
    styleUrls: ['./ltm-injection.component.scss'],
})
export class LtmInjectionComponent implements OnInit {
    lineLookup   = new DefaultAutoCompleteModel(this.lineSrv);
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv, 'matterId');

    @Input()
    requiredFileType = '.xlsx';
    isEditable = false;

    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;
    processing = false;

    form = this.fb.group({
        line:   [{ value: this.matterSrv.getParentId(), disabled: true}, Validators.required],
        from:   [new Date(),                        Validators.required],
        to:     [new Date(),                        Validators.required],
    });

    constructor(private dialogRef: MatDialogRef<LtmInjectionComponent>,
                private injectSrv: LtmInjectionService,
                private fb: UntypedFormBuilder,
                private lineSrv: LtmLineService,
                private matterSrv: LtmLineMatterService,
                private langSrv: LanguageService) {
    }


    upload(files: any) {
        const file:File = files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append('file', file);
            const value = this.form.value;
            console.log('file ****************', value);
            formData.append('line', this.matterSrv.getParentId() + '');
            formData.append('from', this.langSrv.formatDate(value.from));
            formData.append('to',   this.langSrv.formatDate(value.to));
            // Object.entries(this.form.getRawValue())
            //     .filter(([k, v]) => v != null && v != '' && v != ' ')
            //     .forEach(([k, v]) => formData.append(k, v.toString()));
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

    ngOnInit() {
        this.form
            .controls['line']
            .valueChanges
            .pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(v => this.matterSrv.setParentId(v || 0));
    }
}
