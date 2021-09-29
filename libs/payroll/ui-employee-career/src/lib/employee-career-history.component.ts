import { Component, OnInit, OnDestroy } from "@angular/core";
import { EmployeeCareerUIService } from './employee-career-ui.service';
import { LanguageService } from '@ss/common/api-common';

@Component({
    selector: 'ss-emp-career-history',
    templateUrl: './employee-career-history.component.html',
    styleUrls: ['./employee-career-history.component.scss']
})
export class EmployeeCareerHistoryComponent implements OnInit, OnDestroy {

    public displayedColumns = [
        'from_date',
        'to_date',
        'paymonth',
        'post',
        'division',
        'department',
        'service'
    ];

    constructor(public uiSrv: EmployeeCareerUIService, public langSrv: LanguageService) {
    }

    ngOnInit() {
        this.uiSrv.instance.showListControls(true);
    }

    ngOnDestroy() {
        this.uiSrv.instance.showListControls(false);
    }
}
