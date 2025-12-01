import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {finalize, Subscription} from 'rxjs';
import {HttpEventType} from '@angular/common/http';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ss/common/ui-lang';
import {MutualAidService} from "../../../../social-api/src/lib/services/mutual-aid.service";
import {FormBuilder, FormsModule, Validators} from "@angular/forms";
import {MatCard} from "@angular/material/card";
import {MaterialModule} from "@ss/common/api-common";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'ss-excel-injection',
    templateUrl: './excel-injection.component.html',
    styleUrls: ['./excel-injection.component.scss'],
    standalone: true,
    imports: [TranslateDirective, MaterialModule, MatMiniFabButton, MatButton, MatProgressBar, TranslatePipe, FormsModule, MatCard]
})
export class ExcelInjectionComponent implements OnInit {
    #dialogRef = inject(MatDialogRef<ExcelInjectionComponent>);
    #formBuilder = inject(FormBuilder);
    updatable = false;

    @Input()
    requiredFileType = '.xlsx';
    processing = signal(false);

    file: File = null;
    uploadProgress = 0;
    uploadSub: Subscription;
    queryList = '';

    columns = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    form = this.#formBuilder.group({
        id:        ['', Validators.required],
        aType:     ['', Validators.required],
        amount:    ['', Validators.required],
    });

    constructor(private injectSrv: MutualAidService,
                public  snackBarSrv: SnackBarService,
                private monthSelectorSrv: PayrollMonthService,
                private shellSrv: ShellService) {
    }

    ngOnInit(): void {
        this.shellSrv.setTitle('REMUN_EXCEL_INJECTION');
        this.monthSelectorSrv
            .isUpdatableMonth()
            .subscribe(upd => this.updatable = upd);
        this.shellSrv.setGoBackPathByRelativeUrl('..');
    }

    onChange(e: FileList) {
        this.file = e[0];
        console.log('file', e);
    }

    uploadFile() {
        if (this.file && this.file.size > 0) {
            const formData = new FormData();
            formData.append('file', this.file, this.file.name);
            const formValue = this.form.value;
            formData.append('ID', formValue.id)
            formData.append('TYPE', formValue.aType)
            formData.append('AMOUNT', formValue.amount)

            this.processing.set(true);
            this.uploadSub = this.injectSrv
                .upload(formData)
                .pipe(finalize(() => {
                    this.reset();
                    this.processing.set(false);
                }))
                .subscribe({
                    next: (res: any) => {
                        if (res.type == HttpEventType.UploadProgress) {
                            this.uploadProgress = Math.round(100 * (res.loaded / res.total));
                        } else if (res.type == HttpEventType.Response) {
                            const ret = res.body;
                            if (ret['list']) {
                                this.snackBarSrv.showSuccessMessage();
                                this.processing.set(false);
                            }
                            this.#dialogRef.close();
                        }
                    },
                    error: err => {
                        this.processing.set(false);
                        throw err;
                    }
                });
        } else {
            console.log('**************************file is empty')
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

    cancel() {
        this.#dialogRef.close();
    }
}

