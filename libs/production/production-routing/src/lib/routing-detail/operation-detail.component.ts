import { Component, input, computed, inject, ChangeDetectionStrategy, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, UntypedFormGroup, UntypedFormBuilder} from '@angular/forms';

// Material Modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductionRoutingService} from "../production-routing-services/production-routing.service";
import { RoutingOperation} from "../production-routing-services/production-routing-api";
import { BaseEntityDetailComponent} from "@ss/common/ui-base-entity";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute } from "@angular/router";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { ProductionRoutingOperationService } from "../production-routing-services/production-routing-operation.service";


@Component({
    selector: 'app-operation-detail',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, MatTabsModule, MatCardModule,
        MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
        MatTableModule, MatButtonModule, MatTooltipModule
    ],
    templateUrl: './operation-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./operation-detail.component.scss']
})
export class OperationDetailComponent extends BaseEntityDetailComponent<RoutingOperation> {
    private readonly fb = inject(FormBuilder);
    private readonly service = inject(ProductionRoutingService);

    operationId = input.required<number>();
    operations = input.required<RoutingOperation[]>();
    activeTab = signal<{id: string}>({ id: 'general'});

    tabs = [
        { id: 'general', label: 'General', icon: 'fa-solid fa-sliders' },
        { id: 'materials', label: 'Materials', icon: 'fa-solid fa-boxes-stacked' },
        { id: 'activities', label: 'Activities', icon: 'fa-solid fa-bolt' },
        { id: 'instructions', label: 'Instructions', icon: 'fa-solid fa-clipboard-list' },
        { id: 'costing', label: 'Costing', icon: 'fa-solid fa-coins' }
    ];

    currentOp = signal<RoutingOperation|null>(null);

    opForm: FormGroup = this.fb.nonNullable.group({
        setupTime: [0], runTimePerUnit: [0], teardownTime: [0],
        queueTime: [0], moveTime: [0], waitTime: [0],
        opType: ['PROCESS'], laborCrewSize: [1], machineCount: [1],
        overlapType: ['NONE'], overlapQty: [0],
        isMilestone: [false], isCritical: [false],
        requiresInspection: [false], allowsBackflush: [false]
    });

    displayedMaterialColumns = ['component', 'sku', 'qty', 'scrap', 'type', 'point'];
    displayedActivityColumns = ['activity', 'category', 'baseUnit', 'factor', 'rate', 'cost'];

    constructor(
        public override entitySrv: ProductionRoutingOperationService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PROD_ROUTING_OPERATIONS');
    }


    saveOp() {
        const op = this.currentOp();
        if (op && this.opForm.valid) {
            const updatedOp = { ...op, ...this.opForm.getRawValue() };
            this.service.saveRoutingHeader(updatedOp as any).subscribe(() => {
                alert('Operation saved successfully!');
            });
        }
    }

    override setupForm(e:RoutingOperation):UntypedFormGroup {
        const op: RoutingOperation = {
            workCenterId: 0,
            id: 0,
            parentId: this.entitySrv.getParentId(),
            operationSequence: 10,
            materials: [],
            activities: []
        };
        this.currentOp.set(op);
        return this.opForm;
    }
}
