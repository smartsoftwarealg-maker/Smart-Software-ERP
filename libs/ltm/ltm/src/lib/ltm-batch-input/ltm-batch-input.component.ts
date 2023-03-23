import {Component, OnInit} from '@angular/core';
import {Batch, LTMLine, LTMMatter} from '../ltm-api';
import {KeepOnToolbar, ShellService, SnackBarService, ToolbarButton} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LtmLineService} from '../ltm-line.service';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {LtmMatterTestService} from '../ltm-matter-test.service';
import {LtmBatchService} from '../ltm-batch.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LtmPeriodicityService} from '../ltm-periodicity.service';
import {map, Observable, of} from 'rxjs';
import {Lookup} from '@ss/common/api-lookup';

@Component({
    selector: 'ss-ltm-batch-input',
    templateUrl: './ltm-batch-input.component.html',
    styleUrls: ['./ltm-batch-input.component.scss'],
})
export class LtmBatchInputComponent implements OnInit {
    private _periodicity = 0;
    periods$: Observable<Lookup[]> = of([]);
    public saveButton: ToolbarButton = {
        icon: 'fas fa-save',
        label: 'COMMON_SAVE',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.ALWAYS, // save button is too important to hide
        click: () => this.save()
    };

    labels: string[] = [];
    selectedMatter: LTMMatter = null;
    lineLookup = new DefaultAutoCompleteModel(this.lineSrv);
    private matters: LTMMatter[] = [];

    form = this.formBuilder.group(
        {
            parentId:  [0, Validators.required],
            matterId:  [0, Validators.required],
            timeStamp: [new Date(), Validators.required],
            tests:     this.formBuilder.array([])
        }
    );

    constructor(
        public  entitySrv: LtmBatchService,
        public  shellSrv: ShellService,
        public  snackBarSrv: SnackBarService,
        public  route: ActivatedRoute,
        public  formBuilder: FormBuilder,
        public  confirmationSrv: ConfirmationDialogService,
        private lineSrv: LtmLineService,
        private matterSrv: LtmLineMatterService,
        private testSrv:    LtmMatterTestService,
        private periodSrv: LtmPeriodicityService) {
        this.lineLookup.onObjectSelected = (l) => this.onLine(l);
    }

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setButtons([this.saveButton]);
        this.shellSrv.setTitle('LTM_BATCH_TESTINGS')
        this.periods$ = this.periodSrv.getList(0, 50).pipe(map(res => res.body));
    }

    onLine(line: LTMLine) {
        this.matterSrv.setParentId(line?.id || 0);
        this.matterSrv
            .getList(0, 50)
            .subscribe(res =>
                this.matters = res.body.map(lm => {
                    return {id: lm.matterId, description: lm.description }
                })
            );
    }

    get tests(): FormArray {
        return this.form.controls['tests'] as FormArray;
    }

    private refreshData() {
        this.tests.clear();
        this.labels = [];
        this.form.controls['matterId'].setValue(this.testSrv.getParentId() || 0);
        this.saveButton.disabled = false;
        this.testSrv
            .getList(0, 50)
            .subscribe(res =>
                res.body
                    .filter(t => this._periodicity < 1 || this._periodicity === t.periodicity)
                    .forEach(t => {
                        this.labels.push(t.testDescription);
                        const testForm = this.formBuilder.group({
                            testId:   [{ value: t.testId, disabled: true}, Validators.required],
                            value:    [0,        Validators.required]
                        });
                        this.tests.push(testForm);
                    }
                ));
    }

    onMatter(m: LTMMatter) {
        this.selectedMatter = m;
        this.testSrv.setParentId(m.id);
        this.refreshData();
    }

    private save() {
        const formValue: Batch = this.form.getRawValue() as Batch;
        if (formValue.matterId && formValue.parentId) {
            this.shellSrv.setLoading(true);
            this.entitySrv
                .saveBatch(formValue)
                .subscribe({
                    next: res => {
                        this.shellSrv.setLoading(false);
                        formValue.tests.forEach(e => e.value = 0);
                        this.form.reset(formValue);
                        this.snackBarSrv.showSuccessMessage();
                    }, error: err => {
                        this.shellSrv.setLoading(false);
                        throw err;
                    }
                });
        }
    }

    onPeriod(e: number) {
        this._periodicity = e;
        if (this.testSrv.getParentId() > 0) {
            this.refreshData();
        }
    }
}
