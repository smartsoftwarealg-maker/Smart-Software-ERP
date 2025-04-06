import { Component } from "@angular/core";
import { BaseEntityDetailComponent } from "@ss/common/ui-base-entity";
import { ShellService, SnackBarService } from "@ss/common/ui-shell";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ConfirmationDialogService } from "@ss/common/ui-confirmation-dialog";
import { LookupsService } from "@ss/common/api-lookup";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@ss/common/api-common";
import { TranslateDirective } from '@ss/common/ui-lang';
import { Fund } from '../fund.api';
import { FundService } from '../funds.service';

@Component({
    selector: "ss-salary-grid-detail",
    templateUrl: "./funds-detail.component.html",
    styleUrls: ["./funds-detail.component.scss"],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective
    ]
})
export class FundsDetailComponent extends BaseEntityDetailComponent<Fund> {

    constructor(
        public detailSrv: FundService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(detailSrv, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'PAYROLL_FUNDS_DETAIL');
    }

    setupForm(b: Fund): UntypedFormGroup {
        return this.formBuilder.group({
            id: [b.id],
            description: [b.description, Validators.required],
            accountNo: [b.accountNo, Validators.required],
        });
    }

}
