import {Component} from '@angular/core';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {BaseEntityDetailComponent} from '@ss/common/api-base-entity';
import {
    Activity,
    AgentPrice,
    AgentType,
    City,
    CompanyType,
    Country,
    Currency,
    LookupsService,
    PayMode
} from '@ss/common/api-lookup';
import {Agent, AgentService} from '@ss/logistics/api-agent';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {MatExpansionPanel} from '@angular/material/expansion';
import {FormValidators, UserService} from '@ss/common/api-common';
import {Bank} from '@ss/administration/api-bank';
import {AgentDetailComponent} from '../agent-detail.component';


@Component({
    selector: 'ss-mini-agent-detail',
    styleUrls: ['./mini-agent-detail.component.scss'],
    templateUrl: './mini-agent-detail.component.html'
})
export class MiniAgentDetailComponent extends AgentDetailComponent {
}
