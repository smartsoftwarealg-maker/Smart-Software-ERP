import { Component, inject, OnInit } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatCard, MatCardContent } from '@angular/material/card';
import {
    ReactiveFormsModule,
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { MatFormField, MatError, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {  WorkCenterActivityService } from '../work-center-services/work-center-activity.service';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {TranslateDirective, TranslatePipe} from '@ss/common/ui-lang';
import {WorkCenterActivity} from "../work-center-services/work-center-api";
import {ActivityTypesService} from "../../../../production-article/src/lib/services/types.service";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
    selector: 'ss-work-center-activity-detail',
    templateUrl: './work-center-activity-detail.component.html',
    styleUrl: './work-center-activity-detail.component.scss',
    standalone: true,
    imports: [
        MatCard, MatCardContent,
        MatFormField, ReactiveFormsModule,
        MatInput, MatMiniFabButton,
        MatError, MatLabel,
        TranslateDirective, MatSelect, MatOption, MatCheckbox, TranslatePipe,
    ],
})
export class WorkCenterActivityDetailComponent
    extends BaseChildEntityDetailComponent<WorkCenterActivity>
    implements OnInit
{
    private formBuilder = inject(UntypedFormBuilder);
    activityTypes: any[] = [];

    constructor(protected detailSrv: WorkCenterActivityService,
    private activityTypesSrv: ActivityTypesService) {
        super(detailSrv, 'WorkCenterActivityDetail');
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.activityTypesSrv.getListSimple()
            .subscribe(res => this.activityTypes = res || []);
    }

    setupForm(entity: WorkCenterActivity): UntypedFormGroup {
        return this.formBuilder.group({
            id:             [entity.id],
            parentId:       [entity.parentId || this.detailSrv.getParentId()],
            activityTypeId: [entity.activityTypeId],
            formulaFactor:  [entity.formulaFactor ?? 1.0],
            baseUnit:       [entity.baseUnit ?? 'TIME'],
            priority:       [entity.priority ?? 0],
            isActive:       [!!entity.isActive]
        });
    }
}
