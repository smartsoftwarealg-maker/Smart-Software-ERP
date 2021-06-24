import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {AgentPrice, LookupsService} from '@ss/common/api-lookup';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {AgentPriceService} from '@ss/logistics/api-agent-price';


@Component({
    selector: 'ss-agent-price-detail',
    styleUrls: ['./agent-price-detail.component.scss'],
    templateUrl: './agent-price-detail.component.html'
})
export class AgentPriceDetailComponent extends BaseEntityDetailComponent<AgentPrice> implements OnInit {


    constructor(
        public agentPriceService: AgentPriceService,
        public shellSrv: ShellService,
        public snackBarSrv: SnackBarService,
        public route: ActivatedRoute,
        public formBuilder: FormBuilder,
        public confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(agentPriceService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_EDIT_AGENT_PRICE');
    }


    ngOnInit() {
        super.ngOnInit();
    }

    public setupForm(b: AgentPrice) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            centerId: [b.centerId],
            description: [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }
}
