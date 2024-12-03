import { Component, inject, Input, OnInit } from "@angular/core";
import {finalize, Subscription} from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {HttpEventType} from '@angular/common/http';
import {AssetsService} from '../services/assets.service';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import { MaterialModule, UserRightsService } from '@ss/common/api-common';
import { CommonModule } from '@angular/common';





import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { QRCodeModule } from 'angularx-qrcode';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-excel-injection',
    templateUrl: './asset-excel-injection.component.html',
    styleUrls: ['./asset-excel-injection.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,

        DatePickerComponent,
        RouterModule,


        QRCodeModule
    ]})
export class AssetExcelInjectionComponent implements OnInit {
    private fb = inject(UntypedFormBuilder);
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
        historicValue:     [''],
        vat:               [''],
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
        comment:           [''],
        requestNumb:       [''],
        requestDate:       [''],
        requester:         [''],
        salesPrice:        [''],
        investmentType:    [''],
        usefulLife:        [''],
        oldDepreciation:   [''],
        assetClass:        [''],
        status:            [''],
        beneficiary:       ['']
    });

    constructor(private injectSrv: AssetsService,
                private router: Router,
                private rightsSrv: UserRightsService,
                public snackBarSrv: SnackBarService,
                private shellSrv: ShellService,
                private activatedRoute: ActivatedRoute) {
        this.injectSrv.activeOnly = false;
    }

    ngOnInit(): void {
        this.shellSrv.setGoBackPathByRelativeUrl('..');
        this.isEditable = this.rightsSrv.getUserRights('Asset')?.write;
    }

    onChange(e: any) {
        this.fileName = e[0]?.name;
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
