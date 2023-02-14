import { Component } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LTMLine, LTMLineMatter, LTMMatterTest, LTMTesting} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Event, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LtmTestingService} from '../ltm-testing.service';
import {LtmLineService} from '../ltm-line.service';
import {LtmMatterTestService} from '../ltm-matter-test.service';
import {map, Observable} from 'rxjs';
import {MatSelectChange} from '@angular/material/select';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';

@Component({
    selector: 'ss-ltm-testing-detail',
    templateUrl: './ltm-testing-detail.component.html',
    styleUrls: ['./ltm-testing-detail.component.scss'],
})
export class LtmTestingDetailComponent extends BaseEntityDetailComponent<LTMTesting> {
    lineLookup   = new DefaultAutoCompleteModel(this.lineSrv);
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv, 'matterId');
    testLookup   = new DefaultAutoCompleteModel(this.testSrv, 'testId', 'testDescription');

    selectedTestId   = 0;
    selectedMatterId = 0;
    // lines$: Observable<LTMLine[]> = null;
    // matters$: Observable<LTMLineMatter[]> = null;
    // tests$: Observable<LTMMatterTest[]> = null;

    constructor(
        public override entitySrv: LtmTestingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        private lineSrv: LtmLineService,
        private matterSrv: LtmLineMatterService,
        private testSrv: LtmMatterTestService,
        private router: Router) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_TESTINGS');
        this.matterLookup.onObjectSelected = (m) => this.onMatter(m);
        this.testSrv.setParentId(0);
    }

    override ngOnInit() {
        if (this.entitySrv.getParentId() < 1) {
            this.router.navigate(['..'], { relativeTo: this.route }).then();
        }
        super.ngOnInit();
    }

    public override setupForm(b: LTMTesting) {
        this.testSrv.setParentId(b.matterId || 0);
        this.matterSrv.setParentId(b.parentId || this.entitySrv.getParentId());
        return this.formBuilder.group({
            id:           [b.id],
            parentId:     [{value: b.parentId || this.entitySrv.getParentId(), disabled: true}, Validators.required],
            matterId:     [b.matterId, Validators.required],
            testId:       [b.testId, Validators.required],
            timeStamp:    [b.timeStamp || new Date(), Validators.required],
            creationTime: [b.creationTime || new Date(), Validators.required],
            value:        [b.value || 0, Validators.required],
        });
    }

    // onLine(id: number) {
    //     this.matterSrv.setParentId(id);
    //     console.log('*****************id', id);
    // }

    onMatter(m: LTMLineMatter) {
        this.testSrv.setParentId(m.matterId);
    }

    // onTest(id: number) {
    //     this.selectedTestId = id;
    //     this.form.controls['testId'].setValue(id);
    // }

    override readForm(): LTMTesting {
        return this.form.getRawValue();
    }
}
