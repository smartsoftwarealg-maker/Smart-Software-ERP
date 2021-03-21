import { Component, OnInit, OnDestroy } from "@angular/core";
import { EmployeeActivationUIService } from './employee-activation-ui.service';

@Component({
    selector: 'ss-emp-act-history',
    templateUrl: './employee-activation-history.component.html',
    styleUrls: ['./employee-activation-history.component.scss']
})
export class EmployeeActivationHistoryComponent implements OnInit, OnDestroy {

    public displayedColumns = [
        'hireDate',
        'employmentType',
        'suspended',
        'suspensionDate',
        'suspensionReason',
        'inConflict'
    ];

    constructor(public uiSrv: EmployeeActivationUIService) {
    }

    ngOnInit() {
        this.uiSrv.instance.showActivationButtons(true);
    }

    ngOnDestroy() {
        this.uiSrv.instance.showActivationButtons(false);
    }
}
