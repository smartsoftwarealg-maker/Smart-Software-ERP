import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Work } from '../../../../cmms-api/cmms-api';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSWorkRequestService } from '../c-m-m-s-work-request.service';
import {
    CMMSFaultCauseService,
    CMMSFaultService,
    CMMSPriorityService,
    CMMSRootCauseService,
    CMMSSolutionService
} from '@ss/cmms/lookups';
import { ServiceService } from '@ss/common/api-lookup';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { AssetsService } from "@ss/assets-component";
import { EmployeeService } from "@ss/payroll/api-employee";

@Component({
    selector: 'ss-work-request-detail',
    templateUrl: './work-request-detail.component.html',
    styleUrls: ['./work-request-detail.component.css'],
})
export class WorkRequestDetailComponent extends BaseEntityDetailComponent<Work>{
    private solutionSrv = inject(CMMSSolutionService);
    private faultSrv = inject(CMMSFaultService);
    private causeSrv = inject(CMMSFaultCauseService);
    private rootCauseSrv = inject(CMMSRootCauseService);
    private prioritySrv = inject(CMMSPriorityService);
    private serviceSrv = inject(ServiceService);
    private assetSrv = inject(AssetsService);
    private personSrv = inject(EmployeeService)

    solutionLookup = new DefaultAutoCompleteModel(this.solutionSrv);
    faultLookup = new DefaultAutoCompleteModel(this.faultSrv);
    causeLookup = new DefaultAutoCompleteModel(this.causeSrv);
    rootCauseLookup = new DefaultAutoCompleteModel(this.rootCauseSrv);
    priorityLookup = new DefaultAutoCompleteModel(this.prioritySrv);
    serviceLookup = new DefaultAutoCompleteModel(this.serviceSrv);
    assetLookup = new DefaultAutoCompleteModel(this.assetSrv);

    constructor(
        public override entitySrv: CMMSWorkRequestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'CMMS_WORK_REQUEST');
    }

    setupForm(e: Work): UntypedFormGroup {
        return this.formBuilder.group({
            id: [e.id],
            description:  [e.description ],
            assetId:      [e.assetId, Validators.required],
            requester:    [e.requester   ],
            wrType:       [e.wrType, Validators.required],
            priority:     [e.priority, Validators.required],
            plannedStart: [e.plannedStart, Validators.required],
            actualStart:  [e.actualStart ],
            plannedDue:   [e.plannedDue  ],
            actualDue:    [e.actualDue   ],
            fault:        [e.fault       ],
            cause:        [e.cause       ],
            rootCause:    [e.rootCause   ],
            solution:     [e.solution    ],
            laborCost:    [e.laborCost   ],
            travelCost:   [e.travelCost  ],
            materialCost: [e.materialCost],
            otherCost:    [e.otherCost   ],
            assignee:     [e.assignee    ],
            teamSize:     [e.teamSize    ],
            memo:         [e.memo        ]

        });
    }

}
