import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { LtmProductTypeService, LTMSiloService } from '@ltm/ltm-api';
import { Lookup } from '@ss/common/api-lookup';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-product-type-detail',
    templateUrl: './ltm-product-type-detail.component.html',
    styleUrls: ['./ltm-product-type-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,

        RouterOutlet,
        TranslateDirective
    ],
})
export class LtmProductTypeDetailComponent extends BaseEntityDetailComponent<Lookup> implements OnInit {
    constructor(
        public override entitySrv: LtmProductTypeService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_PRODUCT_TYPES');
    }

    public override setupForm(b: Lookup) {
        return this.formBuilder.group({
            id:            [b.id],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }

}
