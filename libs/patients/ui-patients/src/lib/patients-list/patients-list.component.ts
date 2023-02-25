import {Component,} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {AgentType, LookupsService} from '@ss/common/api-lookup';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {BaseEntityListComponent} from '@ss/common/ui-base-entity';
import {Patient, PatientService} from '@ss/patients/api-patient';

@Component({
    selector: 'ss-agent-list',
    styleUrls: ['./patients-list.component.scss'],
    templateUrl: './patients-list.component.html'
})
export class PatientsListComponent extends BaseEntityListComponent<Patient> {

    agentTypes: { [id: number]: string; };

    displayedColumns = [
        'lastName',
        'firstName',
        'birthDate',
        'birthPlace'
    ];


    constructor(
        public patientService: PatientService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override router: Router,
        public override confirmationSrv: ConfirmationDialogService,
        public override defReportSrv: DefaultReportService,
        public lookupsSrv: LookupsService) {
        super(patientService, shellSrv, snackBarSrv, route, router, confirmationSrv, defReportSrv, 'COMMON_PATIENTS');
    }

    preload(): Observable<any> {
        return this.lookupsSrv.getAgentTypes()
            .pipe(
                tap(x => this.onAgentTypesLoaded(x))
            );
    }


    private onAgentTypesLoaded(data: AgentType[]) {
        this.agentTypes = data.reduce(
            (total: { [id: number]: string; }, currentValue) => {
                total[currentValue.id] = currentValue.description;
                return total
            }, {}
        );
    }
}
