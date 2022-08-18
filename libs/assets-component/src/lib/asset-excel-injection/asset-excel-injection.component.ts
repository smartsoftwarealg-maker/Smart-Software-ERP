import {Component, Input, OnInit} from '@angular/core';
import {finalize, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {HttpEventType} from '@angular/common/http';
import {AssetsService} from '../assets.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'ss-asset-excel-injection',
  templateUrl: './asset-excel-injection.component.html',
  styleUrls: ['./asset-excel-injection.component.scss']
})
export class AssetExcelInjectionComponent implements OnInit {
    columns = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
               'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL',
               'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ'
             ];

    @Input()
    requiredFileType = '.xlsx';

    fileName = '';
    uploadProgress = 0;
    uploadSub: Subscription;
    processing = false;

    form = this.fb.group({
        parentId: [''],
        reference: ['', Validators.required],
        reference2: [''],
        accountNo: ['', Validators.required],
        description: ['', Validators.required],
        info: [''],
        acquisitionDate: [''],
        serviceDate: [''],
        invoiceNumber:     [''],
        itemCount:         [''],
        acquisitionValue:  ['', Validators.required],
        historicValue:     ['', Validators.required],
        vat:               ['', Validators.required],
        depreciationRate:  [''],
        residualValue:     [''],
        supplier:          [''],
        originalSupplier:  [''],
        dateOut:           [''],
        customer:          [''],
        serialNo:          [''],
        location:          [''],
        costCenter:        [''],
        investEnd:         [''],
        startYear:         [''],
        receptionNumber:   [''],
        receptionDate:     [''],
        modelNumb:         [''],
        comment:           [''],
        orderNumb:         [''],
        orderDate:         [''],
        salesPrice:        [''],
        investmentType:    [''],
        usefulLife:        [''],
        oldDepreciation:   [''],
        outOfService:      [''],
        assetClass:        [''],
        status:            [''],
        beneficiary:       ['']
    });

    constructor(private injectSrv: AssetsService,
                private router: Router,
                public snackBarSrv: SnackBarService,
                private shellSrv: ShellService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.shellSrv.setGoBackPathByRelativeUrl('..');
    }

    onFileSelected(files: any) {
        this.processing = true;
        const file:File = files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append('file', file);
            Object.entries(this.form.value)
                .filter(([k, v]) => v != null && v != '' && v != ' ')
                .forEach(([k, v]) => formData.append(k, v.toString()));
            const upload$ = this.injectSrv
                .upload(formData)
                .pipe(finalize(() => this.reset()));

            this.uploadSub = upload$.subscribe({
                next: (res: any) => {
                    if (res.type == HttpEventType.UploadProgress) {
                        this.uploadProgress = Math.round(100 * (res.loaded / res.total));
                    } else if (res.type == HttpEventType.Response) {
                        this.snackBarSrv.showSuccessMessage();
                    }
                    this.processing = false;
                },
                error: (err) => {
                    this.processing = false;
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
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
}
