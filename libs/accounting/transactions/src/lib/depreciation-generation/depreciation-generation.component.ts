import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '@ss/common/api-common';
import {DepreciationGenerationService} from './depreciation-generation.service';
import {DepreciationRow} from './depreciation-row';

@Component({
    selector: 'ss-depreciation-generation',
    templateUrl: './depreciation-generation.component.html',
    styleUrls: ['./depreciation-generation.component.scss']
})
export class DepreciationGenerationComponent implements OnInit {
    public form: FormGroup | null = null;
    data: DepreciationRow[] = [];
    displayedColumns = ['acc', 'description', 'cCenter', 'debit', 'credit'];
    processing = false;

    constructor(private fb: FormBuilder,
                private loginSrv: LoginService,
                private deprecSrv: DepreciationGenerationService) {}

    ngOnInit(): void {
        const max = 12;
        this.form = this.fb.group({
            from:  [1,  [Validators.required, Validators.min(1), Validators.max(max)]],
            to:    [12, [Validators.required, Validators.min(1), Validators.max(max)]],
            byCC:  [false, Validators.required],
            year:  [this.loginSrv.appCtx.accYear],
            dType: [2, Validators.required]
        })
    }

    generate() {
        this.deprecSrv
            .getDepreciation(this.form?.value)
            .subscribe(res => this.data = res);
    }
}
