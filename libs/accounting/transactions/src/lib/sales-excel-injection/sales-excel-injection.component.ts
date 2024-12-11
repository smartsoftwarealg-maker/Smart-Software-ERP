import { Component, inject, input, OnInit, signal } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { HttpEventType} from '@angular/common/http';
import { ActivatedRoute, Router} from '@angular/router';
import { ShellService, SnackBarService} from '@ss/common/ui-shell';
import { NgIf } from '@angular/common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ss/common/ui-lang';
import { AccJournalsService, Journal, ScheduledSalesExcelInjectionService } from '@ss/accounting/accounting-api';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MaterialModule } from '@ss/common/api-common';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'ss-sales-excel-injection',
    templateUrl: './sales-excel-injection.component.html',
    styleUrls: ['./sales-excel-injection.component.scss'],
    standalone: true,
    imports: [
        NgIf,
        TranslateDirective,
        MatMiniFabButton,
        MatButton,
        MatProgressBar,
        TranslatePipe,
        MatFormField,
        MatLabel,
        MaterialModule,
        UiAutoCompleteComponent,
    ]
})
export class SalesExcelInjectionComponent implements OnInit {
    #injectSrv = inject(ScheduledSalesExcelInjectionService);
    #router = inject(Router);
    #snackBarSrv = inject(SnackBarService);
    #shellSrv = inject(ShellService);
    #activatedRoute = inject(ActivatedRoute);
    #journalSrv = inject(AccJournalsService);

    journals = this.#journalSrv.getList(0, 50);
    updatable = false;
    requiredFileType = input('.xlsx');
    processing = signal(false);
    journalList = signal<Journal[]>([]);
    journalLookup = new DefaultAutoCompleteModel(this.#journalSrv);

    journal = new FormControl<number>(0);
    mode = new FormControl<number>(0);
    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;


    ngOnInit(): void {
        this.#shellSrv.setGoBackPathByRelativeUrl('..');
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
            formData.append("journal", this.journal.value.toString());
            formData.append("mode", this.mode.value.toString());
            this.processing.set(true);
            this.uploadSub = this.#injectSrv
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
                            if (ret['count'] > 0) {
                                this.#snackBarSrv.showSuccessMessage();
                                this.processing.set(false);
                            }
                            this.cancel();
                        }
                    },
                    error: err => {
                        this.processing.set(false);
                        throw err;
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

    cancel() {
        this.#router.navigate(['../'], { relativeTo: this.#activatedRoute }).then();
    }
}

