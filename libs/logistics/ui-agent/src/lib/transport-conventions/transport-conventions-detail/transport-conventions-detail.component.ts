import { Component, inject, OnInit } from '@angular/core';
import { BaseChildEntityDetailComponent } from '@ss/common/ui-base-entity';
import {
    FormBuilder,
    ReactiveFormsModule,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, switchMap } from 'rxjs';
import { TransportConventionService } from '../transport-convention.service';
import {
    CONVENTIONS_TYPES,
    TransportConvention,
} from '../transport-convention.api';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslateDirective } from '@ss/common/ui-lang';
import {MaterialModule} from "@ss/common/api-common";
import {RouterModule} from "@angular/router";
@Component({
    selector: 'ss-transport-conventions-detail',
    templateUrl: './transport-conventions-detail.component.html',
    styleUrls: ['./transport-conventions-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateDirective,
        DatePickerComponent,
        RouterModule,
    ],
})
export class TransportConventionsDetailComponent
    extends BaseChildEntityDetailComponent<TransportConvention>
    implements OnInit
{
    private formBuilder = inject(FormBuilder);

    constructor(public override entitySrv: TransportConventionService) {
        super(entitySrv, 'TransportConvention');
    }

    setupForm(e: TransportConvention): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            parentId: [e.parentId || this.entitySrv.getParentId()],
            conventionType: [e.conventionType, Validators.required],
            conventionDate: [e.conventionDate || new Date()],
            fromDate: [e.fromDate || new Date(), Validators.required],
            toDate: [e.toDate || new Date(), Validators.required],
        });
    }

    override ngOnInit() {
        this.route.paramMap
            .pipe(
                switchMap((map) => {
                    this.id = +map.get('id') || 0;
                    return this.id
                        ? this.entitySrv.get(this.id)
                        : of(this.EMPTY_RECORD);
                }),
            )
            .subscribe((ent) => {
                this.form = this.setupForm(ent);
            });
        this.isEditable = this.shellSrv.getCurrentNodeRights()?.edit || false;
    }

    protected readonly CONVENTIONS_TYPES = CONVENTIONS_TYPES;
}
