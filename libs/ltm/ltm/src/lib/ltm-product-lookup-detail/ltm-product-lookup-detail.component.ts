import { Component } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { Lookup } from '@ss/common/api-lookup';
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { LtmProductLookupService } from '@ltm/ltm-api';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-product-lookup-detail',
    templateUrl: './ltm-product-lookup-detail.component.html',
    styleUrls: ['./ltm-product-lookup-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
    ],
})
export class LtmProductLookupDetailComponent extends BaseEntityDetailComponent<Lookup> {


    constructor(
        public override entitySrv: LtmProductLookupService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_PRODUCT');
    }

    public override setupForm(b: Lookup) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:            [b.id],
            description:   [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }
}
