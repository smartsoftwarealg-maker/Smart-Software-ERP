import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators, UntypedFormGroup, UntypedFormBuilder
} from '@angular/forms';
import { zip } from 'rxjs';


// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs'; // Added MatTabsModule
import { MatDividerModule } from '@angular/material/divider'; // Added MatDividerModule

import {ProductionRoutingService} from "../production-routing-services/production-routing.service";
import {Routing, RoutingOperation} from "../production-routing-services/production-routing-api";
import {BaseEntityDetailComponent} from "@ss/common/ui-base-entity";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {FinalProductService} from "@ss/master-data/api-article";
import {DefaultAutoCompleteModel, UiAutoCompleteComponent} from "@ss/common/ui-auto-complete";
import {TranslateDirective, TranslatePipe} from "@ss/common/ui-lang";
import {DatePickerComponent} from "@ss/common/ui-datepicker";
import {MaterialModule} from "@ss/common/api-common";
import {ProductionRoutingOperationService} from "../production-routing-services/production-routing-operation.service";


@Component({
    selector: 'app-routing-detail',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatTabsModule, // Added
        MatDividerModule, // Added
        TranslateDirective,
        TranslatePipe
    ],
    templateUrl: './routing-detail.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./routing-detail.component.scss']
})
export class RoutingDetailComponent extends BaseEntityDetailComponent<Routing>{
    #router = inject(Router);
    #route = inject(ActivatedRoute);
    #operationSrv = inject(ProductionRoutingOperationService);

    private readonly fb = inject(FormBuilder);
    protected readonly finalProductSrv = inject(FinalProductService);

    routing = signal<Routing|null>(null);
    operations = signal<RoutingOperation[]>([]);
    selectedOperation = signal<RoutingOperation|null>(null); // Added
    selectedTab = signal<string>('general'); // Added
    productLookup = new DefaultAutoCompleteModel(this.finalProductSrv, 'id', 'description2');


    constructor(
        public override entitySrv: ProductionRoutingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override confirmationSrv: ConfirmationDialogService,
        public override formBuilder: UntypedFormBuilder,
    ) {
        super(
            entitySrv,
            shellSrv,
            snackBarSrv,
            route,
            formBuilder,
            confirmationSrv,
            'PROD_PRODUCTION_ROUTING',
        );
    }


    // Table Configuration
    displayedOpColumns: string[] = ['sequence', 'name', 'workCenter', 'time', 'cost', 'actions'];

    // Reactive Form


    setupForm(e: Routing): UntypedFormGroup {
        this.routing.set(e);
        // Select the first operation by default if available
        if (e.operations && e.operations.length > 0) {
            this.operations.set(e.operations);
            this.selectedOperation.set(e.operations[0]);
        }
        return this.fb.group({
            id:            [e.id||0],
            routingNumber: [{ value: e.routingNumber, disabled: true }],
            description:   [e.description],
            revision:      [{ value: e.revision, disabled: true }],
            status:        [e.status||'DRAFT', Validators.required],
            productId:     [e.productId, Validators.required],
            validFrom:     [e.validFrom, Validators.required],
            validTo:       [e.validTo],
            changeReason:  [e.changeReason]
        });
    }

    // Added methods
    selectOperation(op: RoutingOperation): void {
        this.selectedOperation.set(op);
        this.selectedTab.set('general'); // Reset to general tab when a new operation is selected
    }

    switchTab(tab: string): void {
        this.selectedTab.set(tab);
    }

    editOperation(op: RoutingOperation): void {
        const routingId = this.form?.controls['id'].value;
        this.#operationSrv.setParentId(routingId);
        this.#router.navigate(['/app/manufacturing/operations/', op.id], { relativeTo: this.#route }).then();
    }

    deleteOperation(op: RoutingOperation): void {
        // Implement delete logic here, e.g., using confirmationSrv
        console.log('Delete operation:', op);
        this.confirmationSrv.confirmDelete().subscribe(result => {
            if (result) {
                // Call service to delete operation
                // this.#operationSrv.delete(op.id).subscribe(() => {
                //     this.snackBarSrv.success('PROD_OPERATION_DELETED');
                //     // Refresh operations list
                // });
                this.snackBarSrv.showMessage('Delete operation functionality not yet implemented.');
            }
        });
    }

     add(): void {
        const id = this.form?.controls['id'].value;
        this.#operationSrv.setParentId(id);
        this.#router.navigate(['/app/manufacturing/operations/', 0], { relativeTo: this.#route }).then();
    }

    addOperation() {
        console.log('Add operation button clicked')
    }
}
