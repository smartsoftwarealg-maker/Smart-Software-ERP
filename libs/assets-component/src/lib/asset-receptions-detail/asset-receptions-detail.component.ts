import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShellService} from '@ss/common/ui-shell';
import {ABS_ASSET_RECEPTIONS_URL} from '../../../../../apps/erp/src/app/common';
import {AssetsService} from '../assets.service';
import {switchMap, tap} from 'rxjs/operators';
import {Asset} from '../assets-api';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'ss-asset-receptions-detail',
    templateUrl: './asset-receptions-detail.component.html',
    styleUrls: ['./asset-receptions-detail.component.scss']
})
export class AssetReceptionsDetailComponent implements OnInit {
    id = 0;
    asset: Asset = null;
    public form: FormGroup = null;


    constructor(private assetSrv: AssetsService,
                private route: ActivatedRoute,
                private router: Router,
                private shellSrv: ShellService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.shellSrv.setGoBackFn(() => this.router.navigate([ABS_ASSET_RECEPTIONS_URL]).then());
        this.route
            .paramMap
            .pipe(tap(params => this.id = +(params.get("id") || '0')),
                switchMap(_ => this.assetSrv.get(this.id)),
                tap(res => console.log(res)))
            .subscribe(ent => this.form = this.formBuilder.group({
                    id: [{value: ent.id, disabled: true}],
                    invoiceNumber: [{value: ent.invoiceNumber, disabled: true}],
                    acquisitionDate: [{value: ent.acquisitionDate, disabled: true}],
                    supplierName: [{value: ent.supplierName, disabled: true}]
                }
            ));
    }
}
