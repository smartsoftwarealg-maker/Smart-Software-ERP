import {Component, OnInit} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/ui-base-entity';
import {AgentPrice, LookupsService} from '@ss/common/api-lookup';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {AgentPriceService} from '@ss/logistics/api-agent-price';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-agent-price-detail',
    styleUrls: ['./agent-price-detail.component.scss'],
    templateUrl: './agent-price-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
    ],

})
export class AgentPriceDetailComponent extends BaseEntityDetailComponent<AgentPrice> implements OnInit {


    constructor(
        public agentPriceService: AgentPriceService,
        public override shellSrv: ShellService,
        public override snackBarSrv: SnackBarService,
        public override route: ActivatedRoute,
        public override formBuilder: UntypedFormBuilder,
        public override confirmationSrv: ConfirmationDialogService,
        public lookupsSrv: LookupsService) {
        super(agentPriceService, shellSrv, snackBarSrv, route, formBuilder, confirmationSrv, 'LOGISTICS_AGENT_PRICE');
    }



    public override setupForm(b: AgentPrice) {
        // Make sure to update the template if you edit the configuration here
        return this.formBuilder.group({
            id: [b.id],
            centerId: [b.centerId],
            description: [b.description, Validators.required],
            descriptionAr: [b.descriptionAr],
        });
    }
}
