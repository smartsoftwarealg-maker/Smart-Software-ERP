import { Component, inject, OnInit } from '@angular/core';
import {
    BaseChildEntityDetailComponent
} from '@ss/common/ui-base-entity';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators } from '@angular/forms';
import { CMMSAssetReadingService } from '../cmms-asset-reading.service';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { CMMSMeterService } from '@ss/cmms/lookups';
import { AssetReading } from '@ss/cmms/cmms-api';
import { CommonModule } from '@angular/common';

import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { MatButtonModule } from '@angular/material/button';
import { of, switchMap, tap } from 'rxjs';

@Component({
    selector: 'ss-asset-reading-detail',
    templateUrl: './asset-child-reading-detail.component.html',
    styleUrls: ['./asset-child-reading-detail.component.css'],
    standalone: true,
    imports: [
        CommonModule,

        MatSortModule,
        MatTableModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        DatePickerComponent,

        MatButtonModule,
        UiAutoCompleteComponent
    ]
})
export class AssetChildReadingDetailComponent extends BaseChildEntityDetailComponent<AssetReading> implements OnInit {
    private formBuilder = inject(FormBuilder);
    protected meterSrv = inject(CMMSMeterService);

    meterLookup = new DefaultAutoCompleteModel(this.meterSrv);

    constructor(public override entitySrv: CMMSAssetReadingService) {
        super(entitySrv, 'AssetReading');
    }

    setupForm(e: AssetReading): UntypedFormGroup {
        return this.formBuilder.group({
            id:       [e.id],
            parentId: [e.parentId || this.entitySrv.getParentId()],
            meterId:  [e.meterId, Validators.required],
            date:     [e.date || new Date(), Validators.required],
            amount:   [e.amount, Validators.required]
        });
    }

    override ngOnInit() {
        this.route
            .paramMap
            .pipe(
                switchMap(map => {
                    this.id = +map.get('id') || 0;
                    return this.id? this.entitySrv.get(this.id) : of(this.EMPTY_RECORD);
                })
            ).subscribe(ent => {
                this.form = this.setupForm(ent);
            });
        this.isEditable = this.shellSrv.getCurrentNodeRights()?.edit || false;
    }
}
