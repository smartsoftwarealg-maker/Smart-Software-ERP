import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {FurnitureTransaction} from '../furniture-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import { ConsumerService, SupplierService } from '@ss/logistics/api-agent';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import {filter} from 'rxjs';
import {FurnitureAssignmentsService} from '../furniture-assignments.service';
import { MatCard, MatCardContent } from '@angular/material/card';

import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-furniture-assignment-detail',
    templateUrl: './furniture-assignment-detail.component.html',
    styleUrls: ['./furniture-assignment-detail.component.scss'],
    standalone: true,
    imports: [
    MaterialModule,
    MatCardContent,
    FormsModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    TranslateDirective,
    MatInput,
    MatError,
    DatePickerComponent,
    UiAutoCompleteComponent,
    RouterOutlet
],
})
export class FurnitureAssignmentDetailComponent extends BaseEntityDetailComponent<FurnitureTransaction> implements OnInit {
    private router = inject(Router);
    private supplierSrv = inject(ConsumerService);
    private loginSrv = inject(LoginService);

    supplierLookup = new DefaultAutoCompleteModel(this.supplierSrv, 'id', 'denomination');

    constructor(
        public override entitySrv: FurnitureAssignmentsService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'ASSET_APPOINTMENTS');
    }


    public override setupForm(b: FurnitureTransaction) {
        const sub = this.router.events.pipe(
            filter((e: any): e is RouterEvent => e instanceof RouterEvent)
        ).subscribe((e: RouterEvent) => {
            this.saveButton.visible = e.url.indexOf('/detail') < 0;
        });
        this.subscriptions.push(sub);

        return this.formBuilder.group({
            id:        [b.id],
            centerId:  [b.centerId || this.loginSrv.appCtx.center],
            document:  [b.document || 514, Validators.required],
            number:    [b.number, Validators.required],
            date:      [b.date,   Validators.required],
            supplier:  [b.supplier],
            requester: [b.requester],
            orderNo:   [b.orderNo],
            invoiceNo: [b.invoiceNo],
        });
    }

    override ngOnInit() {
        this.saveButton.visible = this.router.url.indexOf("/detail") < 0;
        super.ngOnInit();
    }
}
