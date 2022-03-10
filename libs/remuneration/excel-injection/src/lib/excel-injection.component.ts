import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '@ss/common/api-common';
import {ExcelInjectionService} from './excel-injection.service';
import {finalize, Subscription} from 'rxjs';
import {HttpEventType} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarService} from '@ss/common/ui-shell';
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

    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;
    queryList = '';

    constructor(private injectSrv: ExcelInjectionService,
                private router: Router,
                public snackBarSrv: SnackBarService,
                private monthSelectorSrv: PayrollMonthService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.monthSelectorSrv
            .isUpdatableMonth()
            .subscribe(upd => this.updatable = upd);
    }

    onFileSelected(event: any) {
        const file:File = event.target.files[0];

        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append("file", file);

            const upload$ = this.injectSrv
                .upload(formData)
                .pipe(finalize(() => this.reset()));

            this.uploadSub = upload$.subscribe((res: any) => {
                if (res.type == HttpEventType.UploadProgress) {
                    this.uploadProgress = Math.round(100 * (event.loaded / event.total));
                } else if (res.type == HttpEventType.Response) {
                    const ret = res.body;
                    if (ret['list']) {
                        this.snackBarSrv.showSuccessMessage();
                        this.queryList = ret['list'].join('\n');
                    }
                }
            })
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

