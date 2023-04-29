import { Component, inject } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {LTMLineMatter, LTMTesting} from '../ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {LtmTestingService} from '../ltm-testing.service';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {DefaultAutoCompleteModel} from '@ss/common/ui-auto-complete';
import {LtmMatterTestLookupService} from '../ltm-matter-test-lookup.service';
import { LoginService } from "@ss/common/api-common";

@Component({
    selector: 'ss-ltm-testing-detail',
    templateUrl: './ltm-testing-detail.component.html',
    styleUrls: ['./ltm-testing-detail.component.scss'],
})
export class LtmTestingDetailComponent extends BaseEntityDetailComponent<LTMTesting> {
    private matterSrv =  inject(LtmLineMatterService);
    private testLookupSrv =  inject(LtmMatterTestLookupService);
    matterLookup = new DefaultAutoCompleteModel(this.matterSrv, 'matterId');
    testLookup   = new DefaultAutoCompleteModel(this.testLookupSrv);

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
        private router: Router,
        private loginSrv: LoginService) {
        super(entitySrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LTM_TESTINGS');
        this.matterLookup.onObjectSelected = (m) => this.onMatter(m);
        this.testLookupSrv.setParentId(0);
    }

    override ngOnInit() {
        if (this.entitySrv.getParentId() < 1) {
            this.router.navigate(['..'], { relativeTo: this.route }).then();
        }
        super.ngOnInit();
    }

    public override setupForm(b: LTMTesting) {
        this.testLookupSrv.setParentId(b.matterId || 0);
        return this.formBuilder.group({
            id:           [b.id],
            centerId:     [{value: b.centerId || this.loginSrv.appCtx.center, disabled: true}, Validators.required],
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
        this.testLookupSrv.setParentId(m.matterId);
    }

    // onTest(id: number) {
    //     this.selectedTestId = id;
    //     this.form.controls['testId'].setValue(id);
    // }

    override readForm(): LTMTesting {
        return this.form.getRawValue();
    }
}
