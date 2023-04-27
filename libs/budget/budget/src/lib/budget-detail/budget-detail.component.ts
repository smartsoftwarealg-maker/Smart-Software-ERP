import { Component, inject } from "@angular/core";
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {Budget} from '../budget-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {BudgetService} from '../budget.service';
import {ACCFile, AccFileService} from '@ss/accounting/accounting-api';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

@Component({
    selector: 'ss-budget-detail',
    templateUrl: './budget-detail.component.html',
    styleUrls: ['./budget-detail.component.scss'],
})
export class BudgetDetailComponent extends BaseEntityDetailComponent<Budget> {
    private fileSrv = inject(AccFileService);
    fileLookup = new DefaultAutoCompleteModel(this.fileSrv);

    constructor(
        public override entitySrv: BudgetService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'BUD_BUDGETS');
        this.fileLookup.onObjectSelected = f => this.onFile(f);
    }


    public override setupForm(b: Budget) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id, Validators.required],
            description: [b.description, Validators.required],
        });
    }
    public override save() {
        this.form.markAllAsTouched();
        if (!this.form.valid) {
            this.snackBarSrv.showFailureMessage('COMMON_FORM_NOT_VALID');
            return;
        }
        const val: Budget = this.readForm();
        let obs: Observable<any> = this.id === 0
            ? this.entitySrv.add(val).pipe(tap(i => this.id = i ))
            : this.entitySrv.update(val);
        obs = obs.pipe(switchMap(() => this.uploadAttachments(val.id)));
        this.shellSrv.setLoading(true);
        obs.subscribe({
            next: () => {
                this.shellSrv.setLoading(false);
                this.goBack();
                this.form.markAsUntouched();
                this.snackBarSrv.showSuccessMessage();
            },
            error: err => {
                this.snackBarSrv.showFailureMessage();
                this.shellSrv.setLoading(false);
                this.form?.reset(val);
                throw err;
            }
        })
    }

    onFile(f: ACCFile) {
        if (f && this.form) {
            this.form.controls['description'].setValue(f.description);
        }
    }
}
