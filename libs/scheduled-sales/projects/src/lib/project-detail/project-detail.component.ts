import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {Activity, ActivityService, LookupsService, WilayaService} from '@ss/common/api-lookup';
import {SSProject} from '@ss/scheduled-sales/api-scheduled-sales';
import {ProjectService} from '../project.service';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {Agent, CustomerService} from '@ss/logistics/api-agent';
import { CommonUiAutoCompleteModule, DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import {WorkMasterService, SectorService} from '@ss/common/api-lookup';
import { CommonModule } from '@angular/common';


import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
  selector: 'ss-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        ReactiveFormsModule,
        CommonUiDatepickerModule,
        CommonUiAutoCompleteModule
    ],
})
export class ProjectDetailComponent extends BaseEntityDetailComponent<SSProject> {
    private customerSrv  = inject( CustomerService);
    private activitySrv  = inject( ActivityService);
    private sectorSrv  = inject( SectorService);
    private wilayaSrv  = inject( WilayaService)
    private workMasterSrv  = inject( WorkMasterService);
    private loginSrv  = inject( LoginService);

    public customerLookup = new DefaultAutoCompleteModel<Agent>(this.customerSrv, 'id', 'denomination');
    public activityLookup = new DefaultAutoCompleteModel<Activity>(this.activitySrv);
    public sectorLookup = new DefaultAutoCompleteModel<Activity>(this.sectorSrv);
    public wilayaLookup = new DefaultAutoCompleteModel<Activity>(this.wilayaSrv);
    public workMasterLookup = new DefaultAutoCompleteModel<Activity>(this.workMasterSrv);

    constructor(
        public override entitySrv: ProjectService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_PROJECTS');
    }


    public override setupForm(b: SSProject) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id:               [b.id],
            centerId:         [b.centerId || this.loginSrv.appCtx.center],
            parentId:         [b.parentId || this.entitySrv.getParentId(), Validators.required],
            project_code:     [b.project_code],
            description:      [b.description, Validators.required],
            start_date:       [b.start_date, Validators.required],
            finish_date:      [b.finish_date, Validators.required],
            qty:              [b.qty, Validators.required],
            monthly_rate:     [b.monthly_rate, Validators.required],
            activity:         [b.activity],
            sector:           [b.sector],
            wilaya:           [b.wilaya],
            master_work:      [b.master_work],
            contract_number:  [b.contract_number],
            contract_date:    [b.contract_date],
            ods:              [b.ods],
            representative:   [b.representative],
            represent_status: [b.represent_status],
            requested_qty:    [b.requested_qty],
        });
    }

}
