import { Component, inject, OnInit } from '@angular/core';
import {BaseChildEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Blocking} from '../assets-api';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import {AssetBlockingService} from '../services/asset-blocking.service';
import {AssetBlockingTypeService} from '../services/asset-blocking-type.service';
import { CommonModule } from '@angular/common';


import { DatePickerComponent } from '@ss/common/ui-datepicker';



import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-asset-blocking-detail',
    templateUrl: './asset-blocking-detail.component.html',
    styleUrls: ['./asset-blocking-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateDirective,
        DatePickerComponent,
        RouterModule,
        UiAutoCompleteComponent
    ]})
export class AssetBlockingDetailComponent extends BaseChildEntityDetailComponent<Blocking> implements OnInit {
    private typeLookupSrv = inject(AssetBlockingTypeService);
    typeLookup = new DefaultAutoCompleteModel(this.typeLookupSrv);
    private formBuilder = inject(UntypedFormBuilder);

    constructor(public assetBlockingSrv: AssetBlockingService) {
        super(assetBlockingSrv, 'Blocking');
    }

    public override setupForm(a: Blocking): UntypedFormGroup {
        const today = new Date();
        return this.form = this.formBuilder.group({
            id: a.id,
            investId:       [a.investId || this.assetBlockingSrv.getParentId(), Validators.required],
            fromDate:       [a.fromDate || today, Validators.required],
            toDate:         [a.toDate || today, Validators.required],
            decisionDate:   [a.decisionDate, Validators.required],
            decisionNumber: [a.decisionNumber],
            blockingType:   [a.blockingType]
        });
    }
}
