import { Component, Input } from '@angular/core';
import { EmployeeLanguagesService, PersonLanguage } from '@ss/payroll/api-employee';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';

@Component({
    selector: 'ss-employee-languages',
    templateUrl: './employee-languages-list.component.html',
    styleUrls: ['./employee-languages-list.component.scss']
})
export class EmployeeLanguagesListComponent extends BaseChildEntityListComponent<PersonLanguage>{
    @Input() editable = true;

    public displayedColumns = [
        'languageId',
        'readLevel',
        'writeLevel'
    ];

    constructor(public entitySrv: EmployeeLanguagesService) {
        super(entitySrv, 'PersonLanguage');
    }
}
