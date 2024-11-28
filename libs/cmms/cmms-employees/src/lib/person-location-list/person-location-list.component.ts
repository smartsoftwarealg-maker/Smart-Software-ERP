import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PersonLocation } from '../employee-api';
import { PersonLocationService } from '../services/person-location.service';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '@ss/common/api-common';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-person-location-list',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatTableModule, MaterialModule, TranslatePipe],
    templateUrl: './person-location-list.component.html',
    styleUrls: ['./person-location-list.component.css'],
})
export class PersonLocationListComponent extends BaseChildEntityListComponent<PersonLocation> {
    override displayedColumns = ['locationDescription'];

    constructor(protected override detailSrv: PersonLocationService) {
        super(detailSrv, 'PersonLocation');
    }
}
