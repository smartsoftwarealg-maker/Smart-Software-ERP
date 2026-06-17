import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
    ReactiveFormsModule,
    FormBuilder,
    FormGroup,
    Validators, UntypedFormGroup, UntypedFormBuilder
} from '@angular/forms';
import { zip } from 'rxjs';


// Angular Material Modules (MatIconModule intentionally omitted for Font Awesome)
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ProductionRoutingService} from "../production-routing-services/production-routing.service";
import {Routing, RoutingOperation} from "../production-routing-services/production-routing-api";
import {BaseEntityDetailComponent} from "@ss/common/ui-base-entity";
import * as console from "node:console";
import {error} from "@capacitor/assets/dist/util/log";
import {PaymentTermsService} from "../../../../../crm/payment-terms/src/lib/payment-terms/payment-terms.service";
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {ConfirmationDialogService} from "@ss/common/ui-confirmation-dialog";
import {FinalProductService} from "@ss/master-data/api-article";
import {DefaultAutoCompleteModel, UiAutoCompleteComponent} from "@ss/common/ui-auto-complete";
import {TranslateDirective, TranslatePipe} from "@ss/common/ui-lang";


@Component({
    selector: 'app-routing-detail',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTableModule,
        MatButtonModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        TranslateDirective,
        UiAutoCompleteComponent,
        TranslatePipe
    ],
    templateUrl: './routing-detail.component.html',
    styleUrls: ['./routing-detail.component.scss']
})
export class RoutingDetailComponent extends BaseEntityDetailComponent<Routing>{
    private readonly fb = inject(FormBuilder);
    protected readonly finalProductSrv = inject(FinalProductService);

    routing = signal<Routing|null>(null);
    operations = signal<RoutingOperation[]>([]);
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
            'PROD_ROUTING',
        );
    }


    // Table Configuration
    displayedOpColumns: string[] = ['sequence', 'name', 'workCenter', 'time', 'cost', 'actions'];

    // Reactive Form


    setupForm(e: Routing): UntypedFormGroup {
        this.routing.set(e);
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
}
