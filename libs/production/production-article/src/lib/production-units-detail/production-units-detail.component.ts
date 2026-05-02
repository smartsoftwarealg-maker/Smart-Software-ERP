import { Component, inject, OnInit, signal } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {
    Article,
    ARTICLE_FINAL_PRODUCT,
    ARTICLE_SEMI_FINAL,
    ArticleService,
    UnitsOfMeasure
} from '@ss/master-data/api-article';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {
    ArticleTypeService,
    ClassService,
    LookupsService,
    MarkService, SubclassService,
    UnitService,
    Vat
} from '@ss/common/api-lookup';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { ImageInputComponent, ImageModel } from '@ss/common/ui-image-input';
import { HttpService, MaterialModule } from '@ss/common/api-common';

import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { ArticleStoreComponent } from '@ss/stock/article-store';
import { ChildBomComponent } from '@ss/master-data/ui-article';
import { BomService } from '@ss/master-data/ui-article';
import { DosageUnitService } from '../services/dosage-unit.service';
import { PackagingUnitService } from '../services/packaging-unit.service';
import { ProductTypeService } from '../services/product-type.service';
import { ChildAttributesComponent } from '@ss/custom-attributes';
import {UnitsService} from '../services/units.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'ss-production-units-detail',
    styleUrls: ['./production-units-detail.component.scss'],
    templateUrl: './production-units-detail.component.html',
    standalone: true,
    imports: [MaterialModule, RouterModule],
})
export class UnitsDetailComponent
    extends BaseEntityDetailComponent<UnitsOfMeasure>
    implements OnInit
{
    protected UNIT_TYPES = ['TIME', 'LENGTH', 'QUANTITY', 'WEIGHT', 'VOLUME', 'AREA', 'ENERGY'];

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
    }

    override setupForm(u: UnitsOfMeasure) {
        return this.formBuilder.group({
            id: [u.id],
            code: [u.code, Validators.required],
            name:             [u.name, Validators.required],
            description:      [u.description],
            unitType:         [u.unitType, Validators.required],
            conversionFactor: [u.conversionFactor, Validators.required],
            value:            [u.value, Validators.required],
            isActive:         [u.isActive ?? 1],
        });
    }
}
