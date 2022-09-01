import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {VacationPlanning, VacationPlanningDetail} from '../vacation-planning-api';
import {InputFiltersService} from '@ss/remuneration/input-filters';
import {ElementsInfoService} from '@ss/remuneration/elementsinfo';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {VacationPlanningService} from '@ss/remuneration/vacation-planning';

@Component({
  selector: 'ss-vacation-planning-detail',
  templateUrl: './vacation-planning-detail.component.html',
  styleUrls: ['./vacation-planning-detail.component.scss']
})
export class VacationPlanningDetailComponent extends BaseEntityDetailComponent<VacationPlanning> implements OnInit {

    constructor(
        private detailSrv: VacationPlanningService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: UntypedFormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'REMUN_VACATION_PLANNING');
    }

    setupForm(e: VacationPlanning): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id || 0],
            lastName: [e.lastName],
            firstName: [e.firstName],
            acquired: [e.acquired],
            taken: [e.taken],
            rest: [e.acquired - e.taken],
        });
    }

   ngOnInit() {
       this.shellSrv.setTitle(this.title); // set title save as list
       this.shellSrv.setGoBackPath('..', this.route);
       this.load();
   }
}
