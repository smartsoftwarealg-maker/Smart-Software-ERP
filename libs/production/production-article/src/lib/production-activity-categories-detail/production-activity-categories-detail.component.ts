import { Component, inject, OnInit, signal } from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {
    ActivityCategory,

} from '@ss/master-data/api-article';
import { ActivatedRoute,RouterModule } from '@angular/router';
import { UntypedFormBuilder, Validators } from '@angular/forms';

import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {CategoriesService} from "../services/categories.service";
import {MatFormField} from "@angular/material/input";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MaterialModule} from "@ss/common/api-common";
import {TranslateDirective, TranslatePipe} from "@ss/common/ui-lang";

@Component({
    selector: 'ss-production-activity-categories-detail',
    templateUrl: './production-activity-categories-detail.component.html',
    styleUrls: ['./production-activity-categories-detail.component.scss'],
    standalone: true,
    imports: [RouterModule, MatFormField, MatCardContent, MatCard, MaterialModule, TranslatePipe, TranslateDirective]
})
export class ActivityCategoriesDetailComponent
    extends BaseEntityDetailComponent<ActivityCategory>
    implements OnInit {

    constructor(
        public override entitySrv: CategoriesService,
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
            'PROD_ACTIVITY_CATEGORIES'
        );
    }

    readonly costElementGroups: string[] = [
        "DL-REG",
        "DL-OT",
        "DL-SETUP",
        "MCH-RUN",
        "MCH-DEPR",
        "MCH-MAINT",
        "OH-LABOR",
        "OH-MACH",
        "OH-UTIL"
    ];

    override setupForm(e: ActivityCategory) {
        return this.formBuilder.group({
            id: [e.id || 0],
            code: [e.code],
            name: [e.name, Validators.required],
            description: [e.description],
            costElementGroup: [e.costElementGroup, Validators.required],
            isActive: [!!e.isActive]
        });
    }
}
