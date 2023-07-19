import { RoutingDetail, RoutingPart, Work, WORK_TYPES } from './cmms-api';
import { BaseEntityDetailComponent } from '@ss/common/ui-base-entity';
import { Directive, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { DefaultAutoCompleteModel } from '@ss/common/ui-auto-complete';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { WorkflowDialogComponent } from '@ss/workflow';
import { BaseEntityService } from '@ss/common/api-base-entity';
import { DOC_WORK_REQUEST } from '@ss/logistics/api-transaction';

@Directive()
export class CMMSWorkDetail extends BaseEntityDetailComponent<Work> {
    private dialog = inject(MatDialog);
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
    private validated = false;
    private defaultType = 1;
    private sendBtn: ToolbarButton = {
        disabled: false,
        icon: 'fa-solid fa-envelope',
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        label: 'LOGISTICS_SEND_MESSAGE',
        visible: true,
        click: () => this.sendMessage(),
    };

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
    cmmsTyes = WORK_TYPES.filter(e => this.document == 12? e.id == 1: e.id > 1);

    data$: Observable<RoutingDetail[]> = of([]);
    partData$: Observable<RoutingPart[]> = of([]);
    displayedColumns = ['order', 'description', 'teamSize', 'hours', 'cost'];
    partColumns = ['reference', 'description', 'qty'];
    selectedId = 0;
    selectedPartId = 0;

    constructor(
        public override entitySrv: BaseEntityService<Work>,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        protected document: number,
        public override title: string) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, title);
        this.defaultType = this.document == 12? 1 : 2;
        this.routingPaginator.onChange = () => this.data$ = this.routingDetailSrv.getPage(this.routingPaginator);
        this.partPaginator.onChange = () => this.partData$ = this.routingPartSrv.getPage(this.partPaginator);
        this.cmmsTyes = WORK_TYPES.filter(e => this.document == 12? e.id == 1: e.id > 1);
    }

    setupForm(e: Work): UntypedFormGroup {
        if (e.id) {
            this.shellSrv.addButton(this.sendBtn);
        }
        this.isEditable = this.isEditable && !e.actualDue;
        this.saveButton.visible = this.isEditable;
        return this.formBuilder.group({
            id:           [e.id],
            document:     [e.document || this.document],
            number:       [{ value: e.number || 0, disabled: true }],
            date:         [e.date || new Date(), Validators.required],
            centerId:     [e.centerId || this.loginSrv.appCtx.center],
            description:  [e.description, Validators.required],
            assetId:      [e.assetId, Validators.required],
            requester:    [e.requester   ],
            wrType:       [{ value: e.wrType || this.defaultType, disabled: this.document == DOC_WORK_REQUEST }, Validators.required],
            priority:     [e.priority, Validators.required],
            plannedStart: [e.plannedStart, Validators.required],
            actualStart:  [e.actualStart ],
            plannedDue:   [e.plannedDue  ],
            actualDue:    [{ value: e.actualDue, disabled: e.validated }],
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
            memo:         [e.memo        ],
            status:       [e.status      ],
            userId:       [e.centerId    ]
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

    private sendMessage() {
        if (!this.sendBtn.disabled) {
            const id = this.form.controls['id'].value;
            const dialogRef = this.dialog.open(WorkflowDialogComponent, {
                width: '350px',
                height: '500px',
                data: { cmmsWorkId: id, senderId: this.loginSrv.appCtx.id, validated: this.validated }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result && result['message']) {
                    this.snackBarSrv.showSuccessMessage();
                } else {
                    this.snackBarSrv.showFailureMessage();
                }
            });
        }
    }
}
