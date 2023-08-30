import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PersonFault } from '../employee-api';
import { PersonFaultService } from '../services/person-fault.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';

@Component({
    selector: 'ss-person-fault-list',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatButtonModule, MatTableModule, UiPaginationModule],
    templateUrl: './person-fault-list.component.html',
    styleUrls: ['./person-fault-list.component.css'],
})
export class PersonFaultListComponent extends BaseChildEntityListComponent<PersonFault> {
    override displayedColumns = ['faultDescription'];

    constructor(protected override detailSrv: PersonFaultService) {
        super(detailSrv);
    }
}
