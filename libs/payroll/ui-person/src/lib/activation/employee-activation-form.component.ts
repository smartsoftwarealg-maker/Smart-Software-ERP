import { Component, OnInit, OnDestroy } from "@angular/core";
import { EmployeeActivationUIService } from './employee-activation-ui.service';
import { ShellService } from '@ss/common/ui-shell';


@Component({
    selector: 'ss-emp-act-form',
    templateUrl: './employee-activation-form.component.html',
    styleUrls: ['./employee-activation-form.component.scss']
})
export class EmployeeActivationFormComponent implements OnInit, OnDestroy {

    constructor(public uiSrv: EmployeeActivationUIService, public shellSrv: ShellService) {
    }

    ngOnInit(): void {
        this.shellSrv.setButtonVisible(this.uiSrv.instance.refreshButton, false);
        // add save button
    }

    ngOnDestroy(): void {
        // remove save button
        this.shellSrv.setButtonVisible(this.uiSrv.instance.refreshButton, true);
    }
}
