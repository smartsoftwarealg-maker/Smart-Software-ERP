import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PersonFault } from '../employee-api';
import { PersonFaultService } from '../services/person-fault.service';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { MaterialModule } from "@ss/common/api-common";
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-person-fault-list',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatTableModule, MaterialModule, TranslatePipe, TranslateDirective],
    templateUrl: './person-fault-list.component.html',
    styleUrls: ['./person-fault-list.component.css'],
})
export class PersonFaultListComponent extends BaseChildEntityListComponent<PersonFault> {
    override displayedColumns = ['faultDescription'];

    constructor(protected override detailSrv: PersonFaultService) {
        super(detailSrv, 'PersonFault');
    }
}
