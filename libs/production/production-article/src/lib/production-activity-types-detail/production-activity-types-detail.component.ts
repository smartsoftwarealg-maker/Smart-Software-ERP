import { Component, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {MaterialModule} from "@ss/common/api-common";
import {TranslateDirective, TranslatePipe} from "@ss/common/ui-lang";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField} from "@angular/material/input";

import {CategoriesService} from '../services/categories.service';
import {UnitsService} from '../services/units.service';
import {ActivityType} from "@ss/master-data/api-article";
import {ActivityTypesService} from "../services/types.service";

@Component({
    selector: 'ss-production-activity-types-detail',
    templateUrl: './production-activity-types-detail.component.html',
    styleUrls: ['./production-activity-types-detail.component.scss'],
    standalone: true,
    imports: [
        RouterModule,
        MatFormField,
        MatCardContent,
        MatCard,
        MaterialModule,
        TranslatePipe,
        TranslateDirective
    ]
})
export class ActivityTypesDetailComponent
    extends BaseEntityDetailComponent<ActivityType>
    implements OnInit {

    categories: any[] = [];
    units: any[] = [];

    constructor(
        public override entitySrv: ActivityTypesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private categoriesSrv: CategoriesService,
        private unitsSrv: UnitsService
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'CRM_ACTIVITY_TYPE'
        );
    }

    override ngOnInit() {
        super.ngOnInit();

        this.categoriesSrv.getListSimple()
            .subscribe(res => this.categories = res || []);

        this.unitsSrv.getListSimple()
            .subscribe(res => this.units = res || []);
    }

    override setupForm(e: ActivityType) {
        return this.formBuilder.group({
            id: [e.id || 0],
            code: [e.code, Validators.required],
            name: [e.name, Validators.required],
            description: [e.description],
            activityCategory: [e.activityCategory],
            unitOfMeasureId: [e.unitOfMeasureId],
            defaultBaseUnit: [e.defaultBaseUnit],
            isActive: [!!e.isActive]
        });
    }
}
