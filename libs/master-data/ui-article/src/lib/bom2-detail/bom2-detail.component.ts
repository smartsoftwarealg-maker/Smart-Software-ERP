import { Component, inject, signal } from '@angular/core';

import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { BomService } from '../bom.service';
import {
    ArticleIdAutoCompleteModel,
    BOM,
    FinalProductService
} from '@ss/master-data/api-article';
import { MatButtonModule } from '@angular/material/button';
import { LoginService, MaterialModule,  } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { TranslateDirective } from '@ss/common/ui-lang';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { FormBuilder, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { BomListComponent } from '../bom/bom-list.component';
import { OptionService } from '@ss/logistics/ui-options';
import {
    PackagingUnit,
    PackagingUnitsService,
} from '@ss/logistics/packaging-units';
import { of, switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'ss-bom-detail',
    standalone: true,
    imports: [
        MatButtonModule,
        MaterialModule,
        TranslateDirective,
        UiAutoCompleteComponent,
        DatePickerComponent,
        BomListComponent,
    ],
    templateUrl: './bom2-detail.component.html',
    styleUrl: './bom2-detail.component.css',
})
export class Bom2DetailComponent extends BaseEntityDetailComponent<BOM> {
    #packagingUnitSrv = inject(PackagingUnitsService);
    #formBuilder = inject(FormBuilder);
    #finalProductSrv = inject(FinalProductService);
    #optionSrv = inject(OptionService);
    #loginSrv = inject(LoginService);

    protected packagingUnits: PackagingUnit[] = [];

    finalProductLookup = new ArticleIdAutoCompleteModel(this.#finalProductSrv);
    usesUnits = signal(false);

    constructor(
        public override entitySrv: BomService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'LOGISTICS_BOM',
        );
    }

    public setupForm(e: BOM): UntypedFormGroup {
        return this.#formBuilder.group({
            id:          [e.id],
            productId:   [e.productId, Validators.required],
            description: [ e.description, [Validators.required, Validators.minLength(3)]],
            from:        [e.from],
            to:          [e.to],
            units:       [{ value: e.units, disabled: false }],
            qty:         [{ value: 1, disabled: true }],
            version:     [e.version || 1, Validators.required],
            updateMemo:  [e.updateMemo],
            updateDate:  [e.updateDate],
        });
    }

    override ngOnInit() {
        super.ngOnInit();
        this.#optionSrv
            .get(this.#loginSrv.appCtx.center)
            .pipe(
                tap((options) => this.usesUnits.set(options.usesUnits)),
                switchMap((options) => options.usesUnits? this.#packagingUnitSrv.getData2(0, 50): of([])
                )            )
            .subscribe((res) => this.packagingUnits = res);
    }
}
