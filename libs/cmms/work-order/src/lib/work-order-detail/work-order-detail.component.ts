import { Component, inject } from '@angular/core';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { RoutingDetail, RoutingPart, Work, WORK_TYPES } from '../../../../cmms-api/cmms-api';
import {
    CMMSFaultCauseService,
    CMMSFaultService, CMMSPriorityService, CMMSRootCauseService,
    CMMSRoutingDetailService,
    CMMSRoutingPartService,
    CMMSRoutingService,
    CMMSSolutionService
} from '@ss/cmms/lookups';
import { LoginService, PaginationModel } from '@ss/common/api-common';
import { ServiceService } from '@ss/common/api-lookup';
import { AssetsService } from '@ss/assets-component';
import { EmployeeService, PersonAutocompleteClass } from '@ss/employee-services/employee-services';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { Observable, of } from 'rxjs';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { CMMSWorkOrderService } from '../c-m-m-s-work-order.service';

@Component({
    selector: 'ss-work-order-detail',
    templateUrl: './work-order-detail.component.html',
    styleUrls: ['./work-order-detail.component.css'],
})
export class WorkOrderDetailComponent extends BaseEntityDetailComponent<Work>{
    private routingPartSrv = inject(CMMSRoutingPartService);
    private routingDetailSrv = inject(CMMSRoutingDetailService);
    private loginSrv = inject(LoginService);
    private routingSrv = inject(CMMSRoutingService);
    private solutionSrv = inject(CMMSSolutionService);
    private faultSrv = inject(CMMSFaultService);
    private causeSrv = inject(CMMSFaultCauseService);
    private rootCauseSrv = inject(CMMSRootCauseService);
    private prioritySrv = inject(CMMSPriorityService);
    private serviceSrv = inject(ServiceService);
    private assetSrv = inject(AssetsService);
    private personSrv = inject(EmployeeService);

    solutionLookup = new DefaultAutoCompleteModel(this.solutionSrv);
    faultLookup = new DefaultAutoCompleteModel(this.faultSrv);
    causeLookup = new DefaultAutoCompleteModel(this.causeSrv);
    rootCauseLookup = new DefaultAutoCompleteModel(this.rootCauseSrv);
    priorityLookup = new DefaultAutoCompleteModel(this.prioritySrv);
    serviceLookup = new DefaultAutoCompleteModel(this.serviceSrv);
    assetLookup = new DefaultAutoCompleteModel(this.assetSrv);
    personLookup = new PersonAutocompleteClass(this.personSrv);
    routingLookup = new DefaultAutoCompleteModel(this.routingSrv);

    routingPaginator = PaginationModel.newInstance();
    partPaginator = PaginationModel.newInstance();
    cmmsTyes = WORK_TYPES.filter(e => e.id > 1);

    data$: Observable<RoutingDetail[]> = of([]);
    partData$: Observable<RoutingPart[]> = of([]);
    displayedColumns = ['order', 'description', 'teamSize', 'hours', 'cost'];
    partColumns = ['reference', 'description', 'qty'];
    selectedId = 0;
    selectedPartId = 0;

    constructor(
        public override entitySrv: CMMSWorkOrderService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'CMMS_WORK_ORDER');
        this.routingPaginator.onChange = () => this.data$ = this.routingDetailSrv.getPage(this.routingPaginator);
        this.partPaginator.onChange = () => this.partData$ = this.routingPartSrv.getPage(this.partPaginator);
    }

    setupForm(e: Work): UntypedFormGroup {
        return this.formBuilder.group({
            id:           [e.id],
            document:     [e.document || 15],
            centerId:     [e.centerId || this.loginSrv.appCtx.center],
            description:  [e.description ],
            assetId:      [e.assetId, Validators.required],
            requester:    [e.requester   ],
            wrType:       [{ value: e.wrType || 2 }, Validators.required],
            priority:     [e.priority, Validators.required],
            plannedStart: [e.plannedStart, Validators.required],
            actualStart:  [e.actualStart ],
            plannedDue:   [e.plannedDue  ],
            actualDue:    [e.actualDue   ],
            fault:        [e.fault       ],
            routingId:    [e.routingId   ],
            cause:        [e.cause       ],
            rootCause:    [e.rootCause   ],
            solution:     [e.solution    ],
            laborCost:    [e.laborCost   ],
            travelCost:   [e.travelCost  ],
            materialCost: [e.materialCost],
            otherCost:    [e.otherCost   ],
            assignee:     [e.assignee    ],
            teamSize:     [e.teamSize|| 1],
            memo:         [e.memo        ]
        });
    }


    override finishLoading(e: Work) {
        this.routingDetailSrv.setParentId(e?.routingId || 0);
        this.routingPartSrv.setParentId(e?.routingId || 0);
        this.data$ = this.routingDetailSrv.getPage(this.routingPaginator);
        this.partData$ = this.routingPartSrv.getPage(this.partPaginator);
        super.finishLoading(e);
    }

    select(id: number) {
        this.selectedId = id;
    }
    selectPart(id: number) {
        this.selectedId = id;
    }
}

