import { Component, OnInit, OnDestroy } from "@angular/core";
import { LanguageService } from '@ss/common/api-common';
import { EmployeeContractListUIService } from './employee-contract-lists-ui.service';


@Component({
    selector: 'ss-emp-contract-list',
    templateUrl: './employee-contract-list.component.html',
    styleUrls: ['./employee-contract-list.component.scss']
})
export class EmployeeContractListComponent implements OnInit, OnDestroy {

    public displayedColumns = [
        'number',
        'recordNumber',
        'date',       
        'fromdate',
        'todate',
        'valid_date',
        'post',
        'division',
        'department',
        'service',
        'salarygrid', // todo: add lookup
        'salary_rank',
        'basesalary',
        'notes',
        'motive', // todo: add lookup
        'cost_center', // todo: add lookup
        'confirmed',
        'trial_period'
    ];

    constructor(public uiSrv: EmployeeContractListUIService, public langSrv: LanguageService) {
    }

    ngOnInit() {
        this.uiSrv.instance.showListControls(true);
    }

    ngOnDestroy() {
        this.uiSrv.instance.showListControls(false);
    }
}
