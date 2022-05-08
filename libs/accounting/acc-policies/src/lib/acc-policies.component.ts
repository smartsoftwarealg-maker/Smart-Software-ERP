import { Component, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LookupsService} from '@ss/common/api-lookup';
import {LoginService} from '@ss/common/api-common';
import {Observable, of} from 'rxjs';
import {MatExpansionPanel} from '@angular/material/expansion';
import {AccountAutocompleteModel} from '@ss/accounting/api-accounts';
import {AccJournalsService, AccPoliciesService} from '@ss/accounting/accounting-api';
import {ACCPolicy} from '@ss/accounting/accounting-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
    selector: 'ss-acc-policies',
    templateUrl: './acc-policies.component.html',
    styleUrls: ['./acc-policies.component.scss']
})
export class AccPoliciesComponent extends BaseEntityDetailComponent<ACCPolicy> {
    journalLookup = new DefaultAutoCompleteModel(this.journalSrv);

    constructor(
        public detailSrv: AccPoliciesService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: FormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService,
        private loginSrv: LoginService,
        private journalSrv: AccJournalsService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'COMMON_OPTIONS');
        detailSrv.setParentId(this.loginSrv.appCtx.center);
        this.id = this.loginSrv.appCtx.center;
    }

    protected override getRouteParam(): Observable<any> {
        return this.loadEntity(this.loginSrv.appCtx.center);
    }

    public setupForm(e: ACCPolicy): FormGroup {
        return this.formBuilder.group({
            id: [e.id],
            showFolio: [e.showFolio, Validators.required],
            analyzeAccounts: [e.analyzeAccounts, Validators.required],
            resetPieceNumbers: [e.resetPieceNumbers, Validators.required],
            showBudget: [e.showBudget, Validators.required],
            openingJournal: [e.openingJournal, Validators.required],
            bankAccount: [e.bankAccount],
            analyzeChecks: [e.analyzeChecks],
            cashAccount: [e.cashAccount],
            investAccount: [e.investAccount],
            depreciationAccount: [e.depreciationAccount],
            assetsAccount: [e.assetsAccount],
            headquarterAccounts: [e.headquarterAccounts],
            proportionalAccounts: [e.proportionalAccounts],
            modifyClosedPeriods: [e.modifyClosedPeriods],
            restorable: [e.restorable],
            financialAccount: [e.financialAccount],
            paymentAccount: [e.paymentAccount],
            finBankAccount: [e.finBankAccount],
            showProjects: [e.showProjects, Validators.required],
            manualCashFlow: [e.manualCashFlow, Validators.required],
            openPeriods: [{ value: e.openPeriods, disabled: e.modifyClosedPeriods }, [Validators.required, Validators.min(0), Validators.max(12)]],
        });
    }
    public getPanelHeaderClass(section: string, panel: MatExpansionPanel): string {
        // if expanded return primary background class
        if (panel.expanded)
            return 'b-primary-expansion-panel';
        else
            return '';
    }

    updateOptionChanged(event: MatCheckboxChange) {
        const ctrl = this.form.controls['openPeriods'];
        ctrl.setValue(event.checked? 12: 0);
        if (event.checked) {
            ctrl.disable({onlySelf: true});
        } else {
            ctrl.enable({ onlySelf: true });
        }
    }

    override readForm(): ACCPolicy {
        const value = super.readForm();
        value.openPeriods = value.modifyClosedPeriods? 12 : value.openPeriods || 0;
        return value;
    }
}
