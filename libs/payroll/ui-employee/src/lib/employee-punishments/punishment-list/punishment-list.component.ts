import {Component} from '@angular/core';
import {Punishment} from '../punishment-api';
import {PunishmentService} from '../punishment.service';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-punishment-list',
    templateUrl: './punishment-list.component.html',
    styleUrls: ['./punishment-list.component.scss']
})
export class PunishmentListComponent extends BaseChildEntityListComponent<Punishment>{
    public displayedColumns = [
        'number',
        'date',
        'sanction',
        'typeName',
        'faultName',
        'memo',
    ];

    constructor(public entitySrv: PunishmentService) {
        super(entitySrv, 'Punishment');
    }
}
