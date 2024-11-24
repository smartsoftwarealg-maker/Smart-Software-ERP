import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {BudgetTransfer, PlanningInfo} from '../budget-movement-api';
import { DecimalPipe, NgIf } from '@angular/common';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Agent, SupplierService} from '@ss/logistics/api-agent';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterEvent, RouterOutlet } from '@angular/router';
import { UntypedFormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LanguageService, LoginService} from '@ss/common/api-common';
import {BudgetTransferService} from '../budget-transfer.service';
import {BudgetPlanningService} from '@ss/budget/budget-planning';
import {BudgetService} from '@ss/budget/budget';
import {filter} from 'rxjs';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../../common/ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { DatePickerComponent } from '../../../../../common/ui-datepicker/src/lib/date-picker.component';

@Component({
    selector: 'ss-budget-transfer-detail',
    templateUrl: './budget-transfer-detail.component.html',
    styleUrls: ['./budget-transfer-detail.component.scss'],
    standalone: true,
    imports: [
        MatCard,
        MatCardContent,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        MatFormField,
        MatLabel,
        TranslateDirective,
        MatInput,
        MatError,
        DatePickerComponent,
        RouterOutlet,
    ],
})
export class BudgetTransferDetailComponent extends BaseEntityDetailComponent<BudgetTransfer> {
    private activatedRoute = inject(ActivatedRoute);
    private langSrv = inject(LanguageService);
    private router = inject(Router);
    private budgetSrv = inject(BudgetService);
    private loginSrv = inject(LoginService);
    private numberPipe: DecimalPipe = new DecimalPipe(this.langSrv.defaultLanguage);
    private planningInfo: PlanningInfo = null;
    private supplierSrv = inject(SupplierService);
    public supplierLookup = new DefaultAutoCompleteModel<Agent>(this.supplierSrv, 'id', 'denomination');


    constructor(
        public override entitySrv: BudgetTransferService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'BUD_TRANSFERS');
    }


    override finishLoading(e: BudgetTransfer) {
        this.entitySrv
            .getInfo(e.planningId || this.entitySrv.getParentId())
            .subscribe({
                next: res => {
                    this.planningInfo = res;
                    super.finishLoading(e);
                },
                error: e => super.finishLoading(e)
            });
    }

    public override setupForm(b: BudgetTransfer) {
        return this.formBuilder.group({
            id:          [b.id, Validators.required],
            description: [b.description, Validators.required],
            budgetId:    [b.budgetId || this.budgetSrv.budget?.id, Validators.required],
            planningId:  [b.planningId || this.entitySrv.getParentId(), Validators.required],
            transferDate:[b.transferDate, Validators.required],
            amount:      [b.amount, Validators.required],
            userId:      [b.userId || this.loginSrv.appCtx.id, Validators.required],
            decisionInfo:[b.decisionInfo],
            planning:    [{ value: this.numberPipe.transform(this.planningInfo?.amount||0, '1.2-2'), disabled: true}],
            complement:  [{ value: this.numberPipe.transform(this.planningInfo?.complement||0, '1.2-2'), disabled: true}],
            transfer:    [{ value: this.numberPipe.transform(this.planningInfo?.transfer||0, '1.2-2'), disabled: true}],
            commitment:  [{ value: this.numberPipe.transform(this.planningInfo?.commitment||0, '1.2-2'), disabled: true}],
            balance:     [{ value: this.numberPipe.transform(this.planningInfo?.balance||0, '1.2-2'), disabled: true}],
        });
    }

    override ngOnInit() {
        this.saveButton.visible = this.router.url.indexOf('/detail') < 0;
        super.ngOnInit();
        if (this.entitySrv.getParentId() < 1) {
            this.router.navigate(['..'], {relativeTo: this.activatedRoute}).then();
        }
        const sub = this.router.events.pipe(
            filter((e: any): e is RouterEvent => e instanceof RouterEvent)
        ).subscribe((e: RouterEvent) => {
            this.saveButton.visible = e.url.indexOf('/detail') < 0;
        });
        this.subscriptions.push(sub);
    }
}
