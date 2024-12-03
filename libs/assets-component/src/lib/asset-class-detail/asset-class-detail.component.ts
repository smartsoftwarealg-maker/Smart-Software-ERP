import { Component, OnInit } from "@angular/core";
import { BaseEntityDetailComponent } from "@ss/common/ui-base-entity";
import { AssetClass } from "../assets-api";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LookupsService } from "@ss/common/api-lookup";
import { AssetClassService } from "../services/asset-class.service";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";



import { DatePickerComponent } from "@ss/common/ui-datepicker";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';


@Component({
    selector: "ss-asset-class-detail",
    templateUrl: "./asset-class-detail.component.html",
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,

        DatePickerComponent,
        RouterModule,

    ],

    styleUrls: ["./asset-class-detail.component.scss"]
})
export class AssetClassDetailComponent extends BaseEntityDetailComponent<AssetClass> {

    constructor(
        public override entitySrv: AssetClassService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, "COMMON_CLASSES");
    }


    public override setupForm(b: AssetClass) {
        return this.formBuilder.group({
            id: [b.id],
            description:      [b.description, [Validators.required, Validators.minLength(1), Validators.maxLength(70)]],
            depreciationRate: [b.depreciationRate, Validators.max(100)],
            usefulLife:       [b.usefulLife, [Validators.required, Validators.min(1), Validators.max(100)]]
        });
    }

}
