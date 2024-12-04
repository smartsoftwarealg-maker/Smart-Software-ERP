import { Component, inject, OnInit } from '@angular/core';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import { LTMLineMatter, LTMTesting } from '@ltm/ltm-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterOutlet } from "@angular/router";
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from "@angular/forms";
import {  ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import {LtmTestingService} from '@ltm/ltm-api';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import {LtmMatterTestLookupService} from '@ltm/ltm-api';
import { LoginService, MaterialModule } from "@ss/common/api-common";
import { LtmLineMatterService } from '@ltm/ltm-api';
import { LtmLineMatterLookup } from '@ltm/ltm-api';
import { CommonModule } from "@angular/common";
import { DatePickerComponent } from '@ss/common/ui-datepicker';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-ltm-testing-detail',
    templateUrl: './ltm-testing-detail.component.html',
    styleUrls: ['./ltm-testing-detail.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        DatePickerComponent,
        TranslateDirective,
        UiAutoCompleteComponent
    ]
})
export class LtmTestingDetailComponent extends BaseEntityDetailComponent<LTMTesting> implements OnInit {
    private router  = inject(Router);
    private loginSrv  = inject(LoginService);
    private matterSrv =  inject(LtmLineMatterService);
    private testLookupSrv =  inject(LtmMatterTestLookupService);
    matterLookup = new LtmLineMatterLookup(this.matterSrv);
    testLookup   = new DefaultAutoCompleteModel(this.testLookupSrv);

    constructor(
        public override entitySrv: LtmTestingService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService) {
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
        this.testLookupSrv.setParentId(b.parentId || 0);
        return this.formBuilder.group({
            id:           [b.id],
            centerId:     [{value: b.centerId || this.loginSrv.appCtx.center, disabled: true}, Validators.required],
            parentId:     [{ value: b.parentId || this.entitySrv.getParentId(), disabled: true }, Validators.required],
            timeStamp:    [b.timeStamp || new Date(), Validators.required],
            creationTime: [b.creationTime || new Date(), Validators.required],
            userId:       [b.userId || this.loginSrv.appCtx.id, Validators.required]
        });
    }

    // onLine(id: number) {
    //     this.matterSrv.setParentId(id);
    //     console.log('*****************id', id);
    // }

    onMatter(m: LTMLineMatter) {
        this.testLookupSrv.setParentId(m.matterId);
    }

    override readForm(): LTMTesting {
        return this.form.getRawValue();
    }
}
