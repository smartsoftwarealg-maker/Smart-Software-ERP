import { Component } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/api-base-entity';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Wilaya, WilayaService} from "@ss/common/api-lookup";


@Component({
    selector: 'ss-wilaya-detail',
    templateUrl: '../base-templates/detail-template.html',
    styleUrls: ['../base-templates/detail-template.scss']
})
export class WilayaDetailComponent extends BaseEntityDetailComponent<Wilaya> {

    constructor(
        public wilayaSrv: WilayaService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder) {
            super(wilayaSrv, shellSrv, snackBarSrv, route, formBuilder, 'COMMON_EDIT_WILAYA');
    }

    public setupForm(e: Wilaya): FormGroup {
        return this.formBuilder.group({
            id: e.id,
            description: [e.description, Validators.required]
        });
    }
}
