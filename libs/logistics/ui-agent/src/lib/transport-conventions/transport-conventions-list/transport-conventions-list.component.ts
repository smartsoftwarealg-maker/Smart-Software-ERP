import { Component, OnInit } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import {
    CONVENTIONS_TYPES,
    TransportConvention,
} from '../transport-convention.api';
import { TransportConventionService } from '../transport-convention.service';

@Component({
    selector: 'ss-transport-conventions-list',
    templateUrl: './transport-conventions-list.component.html',
    styleUrls: ['./transport-conventions-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatSortModule,
        MatTableModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        TranslateDirective,
        MatButtonModule,
        MaterialModule,
        TranslatePipe,
        TranslateDirective,
        PaginationComponent,
    ],
})
export class TransportConventionsListComponent
    extends BaseChildEntityListComponent<TransportConvention>
    implements OnInit
{
    override displayedColumns = [
        'conventionType',
        'conventionDate',
        'fromDate',
        'toDate',
    ];

    constructor(public override detailSrv: TransportConventionService) {
        super(detailSrv, 'TransportConventions');
    }

    protected readonly CONVENTIONS_TYPES = CONVENTIONS_TYPES;
}
