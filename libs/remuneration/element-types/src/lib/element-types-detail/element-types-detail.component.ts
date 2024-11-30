import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ElementsInfoService } from "@ss/remuneration/elementsinfo";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LookupsService } from "@ss/common/api-lookup";
import { ElementTypesService } from "../services/element-types.service";
import { ElementInfoLookupModel } from "../element-info-lookup-model";
import { HttpService, MaterialModule } from "@ss/common/api-common";
import { ElementType } from "@ss/payroll-common";
import { CommonModule } from "@angular/common";


import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: "ss-element-types-detail",
    templateUrl: "./element-types-detail.component.html",
    styleUrls: ["./element-types-detail.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ]

})
export class ElementTypesDetailComponent extends BaseEntityDetailComponent<ElementType> {
    private httpSrv = inject(HttpService);
    infoLookupModel = new ElementInfoLookupModel(new ElementsInfoService(this.httpSrv));

    constructor(
        private infoSrv: ElementTypesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(infoSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, "REMUN_ELEMENT_TYPES");
    }

    override setupForm(e: ElementType): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description: [e.description, Validators.required],
            fieldId: [e.fieldId]
        });
    }
}
