import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {ExcelInjectionService} from './excel-injection.service';
import {finalize, Subscription} from 'rxjs';
import {HttpEventType} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';

@Component({
  selector: 'ss-excel-injection',
  templateUrl: './excel-injection.component.html',
  styleUrls: ['./excel-injection.component.scss']
})
export class ExcelInjectionComponent implements OnInit {
    updatable = false;

    @Input()
    requiredFileType = '.xlsx';
    processing = false;

    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;
    queryList = '';

    constructor(private injectSrv: ExcelInjectionService,
                private router: Router,
                public  snackBarSrv: SnackBarService,
                private monthSelectorSrv: PayrollMonthService,
                private shellSrv: ShellService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.monthSelectorSrv
            .isUpdatableMonth()
            .subscribe(upd => this.updatable = upd);
        this.shellSrv.setGoBackPathByRelativeUrl('..');
    }

    onChange(e: any) {
        this.fileName = e[0]?.name;
    }

    onFileSelected(files: any) {
        const file:File = files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("file", file);

            this.processing = true;
            this.uploadSub = this.injectSrv
                .upload(formData)
                .pipe(finalize(() => {
                    this.reset();
                    this.processing = false;
                }))
                .subscribe({
                    next: (res: any) => {
                        if (res.type == HttpEventType.UploadProgress) {
                            this.uploadProgress = Math.round(100 * (res.loaded / res.total));
                        } else if (res.type == HttpEventType.Response) {
                            const ret = res.body;
                            if (ret['list']) {
                                this.snackBarSrv.showSuccessMessage();
                                this.queryList = ret['list'].join('\n');
                                this.processing = false;
                            }
                        }
                    },
                    // error: err => {
                    //     this.processing = false;
                    //     throw err;
                    // }
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

    cancel() {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
}

