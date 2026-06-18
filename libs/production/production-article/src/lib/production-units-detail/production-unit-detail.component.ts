import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { UnitsOfMeasure } from '@ss/master-data/api-article';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {
    LoginService,
    MaterialModule,
    UserService,
} from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { UnitsService } from '../services/units.service';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
    UserLookup,
} from '@ss/common/ui-auto-complete';
import { UserListService } from '@ss/common/api-users';
import { ACTIVITY_TYPE } from '@ss/crm/opportunity';

@Component({
    selector: 'ss-production-units-detail',
    styleUrls: ['./production-unit-detail.component.scss'],
    templateUrl: './production-unit-detail.component.html',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MaterialModule,
        RouterModule,
        TranslateDirective,
        DatePickerComponent,
        UiAutoCompleteComponent,
    ],
})
export class ProductionUnitDetailComponent
    extends BaseEntityDetailComponent<UnitsOfMeasure>
    implements OnInit
{
    protected UNIT_TYPES = [
        'TIME',
        'LENGTH',
        // 'QUANTITY',
        'WEIGHT',
        'VOLUME',
        // 'AREA',
        // 'ENERGY',
    ];

    #loginSrv = inject(LoginService);
    #userSrv = inject(UserListService);

    userLookup = new UserLookup(this.#userSrv);
    unitMeasureLookup: DefaultAutoCompleteModel<UnitsOfMeasure>;

    constructor(
        public override entitySrv: UnitsService,
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
            'PROD_UNITS_OF_MEASURE',
        );
        this.unitMeasureLookup = new DefaultAutoCompleteModel(this.entitySrv);
    }

    override setupForm(u: UnitsOfMeasure) {
        return this.formBuilder.group({
            id: [u.id],
            code: [u.code],
            name: [u.name, Validators.required],
            description: [u.description],
            unitType: [u.unitType, Validators.required],
            baseUnitId: [u.baseUnitId],
            conversionFactor: [u.conversionFactor],
            value: [u.value],
            isActive: [u.isActive ?? 1],
            createdAt: [{ value: u.createdAt || new Date(), disabled: true }],
            updatedAt: [{ value: u.updatedAt || new Date(), disabled: true }],
            createdBy: [
                {
                    value: u.createdBy || this.#loginSrv.appCtx.id,
                    disabled: true,
                },
            ],
            updatedBy: [
                {
                    value: u.updatedBy || this.#loginSrv.appCtx.id,
                    disabled: true,
                },
            ],
        });
    }

    protected readonly ACTIVITY_TYPE = ACTIVITY_TYPE;
}
