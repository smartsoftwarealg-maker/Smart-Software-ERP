import { Component, OnInit, OnDestroy } from "@angular/core";
import { LanguageService } from '@ss/common/api-common';
import { EmployeeWivesListUIService } from './employee-wives-lists-ui.service';


@Component({
    selector: 'ss-emp-wives-list',
    templateUrl: './employee-wives-list.component.html',
    styleUrls: ['./employee-wives-list.component.scss']
})
export class EmployeeWivesListComponent implements OnInit, OnDestroy {

    public displayedColumns = [
//        'notDivorced',
        'name',
        'birthdate',
        'birthPlace',
        'father',
        'mother'
    ];

    constructor(public uiSrv: EmployeeWivesListUIService, public langSrv: LanguageService) {
    }

    ngOnInit() {
        this.uiSrv.instance.showListControls(true);
    }

    ngOnDestroy() {
        this.uiSrv.instance.showListControls(false);
    }
}
