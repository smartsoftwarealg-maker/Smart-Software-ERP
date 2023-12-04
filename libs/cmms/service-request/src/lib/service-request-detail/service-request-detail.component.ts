import { Component, inject } from '@angular/core';
import { CMMSWorkDetail, INSPECTION, IS_NOT_INSPECTION, Work, WORK_TYPES } from '@ss/cmms/cmms-api';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { DOC_WORK_ORDER } from '@ss/logistics/api-transaction';
import { CMMSServiceRequestService } from '../c-m-m-s-service-request.service';
import { CMMSWorkOrderService } from '@ss/cmms/work-order';

@Component({
    selector: 'ss-service-request-detail',
    templateUrl: './service-request-detail.component.html',
    styleUrls: ['./service-request-detail.component.css'],
})
export class ServiceRequestDetailComponent extends CMMSWorkDetail {
    private router = inject(Router);
    private woSrv = inject(CMMSWorkOrderService);
    cmmsTypes = WORK_TYPES.filter(e => e.id !== INSPECTION);
    orderForm: UntypedFormGroup|null = null;
    activePanel = -1;
    private URLS = ['articles', 'works'];
    readonly ARTICLE_PANEL = 0;
    readonly WORK_PANEL = 1;

    constructor(
        public override entitySrv: CMMSServiceRequestService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, DOC_WORK_ORDER, 'CMMS_SERVICE_REQUEST', IS_NOT_INSPECTION);
    }

    private loadOrderForm(e: Work) {
        this.orderForm = this.formBuilder.group({
            id:                   [e.id],
            document:             [e.document || this.document],
            number:               [{ value: e.number || 0, disabled: true }],
            date:                 [e.date || new Date()],
            centerId:             [e.centerId || 0],
            description:          [e.description],
            assetId:              [e.assetId],
            requester:            [e.requester   ],
            wrType:               [{ value: e.wrType || INSPECTION, disabled: this.isInspection }],
            priority:             [e.priority],
            plannedStart:         [e.plannedStart],
            scheduledStart:       [e.scheduledStart],
            actualStart:          [e.actualStart ],
            plannedDue:           [{ value: e.plannedDue , disabled: e.validated && typeof e.plannedDue != 'undefined' }],
            scheduledDue:         [e.scheduledDue  ],
            actualDue:            [{ value: e.actualDue || null, disabled: e.validated && typeof e.actualDue != 'undefined' }],
            fault:                [e.fault       ],
            routingId:            [e.routingId   ],
            cause:                [e.cause       ],
            rootCause:            [e.rootCause   ],
            solution:             [e.solution    ],
            laborCost:            [e.laborCost   ],
            travelCost:           [e.travelCost  ],
            materialCost:         [e.materialCost],
            otherCost:            [e.otherCost   ],
            assignee:             [e.assignee    ],
            teamSize:             [e.teamSize|| 1],
            memo:                 [e.memo        ],
            status:               [e.status      ],
            userId:               [e.centerId    ],
            sourceId:             [e.sourceId    ],
            closureDate:          [e.closureDate],
            creatorDescription:   [{ value: e.creatorDescription, disabled: true }],
            statusDescription:    [{ value: e.statusDescription, disabled: true }],
            executorDescription:  [{ value: e.executorDescription, disabled: true }],
            schedulerDescription: [{ value: e.schedulerDescription, disabled: true }],
            closerDescription:    [{ value: e.closerDescription }],
            failsInspection:      [e.failsInspection || false]
        });
        this.orderForm.disable();
    }

    override finishLoading(e: Work) {
        if (e.destinationId) {
            this.woSrv
                .get(e.destinationId)
                .subscribe(res => this.loadOrderForm(res));
        }
        super.finishLoading(e);
    }

    showPanel(index: 0|1) {
        this.activePanel = index;
        const url = this.URLS[index];
        if (this.router.url.indexOf(url) < 0) {
            this.router.navigate([url], { relativeTo: this.route }).then();
        }
    }

    // openWorkOrder() {
    //     const url = this.router.url;
    //     console.log(this.orderForm?.controls['number'].value, url);
    //     this.router.navigate(['../..', 'cur-orders', this.orderForm?.controls['number'].value], { relativeTo: this.route }).then();
    // }
}


