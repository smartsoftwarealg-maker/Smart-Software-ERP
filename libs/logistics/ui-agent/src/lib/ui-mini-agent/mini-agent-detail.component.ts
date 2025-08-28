import {Component} from '@angular/core';
import {AgentDetailComponent} from '../agent-detail/agent-detail.component';

import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';


import { TranslateDirective } from '@ss/common/ui-lang';
import { UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';


@Component({
    selector: 'ss-mini-agent-detail',
    styleUrls: ['./mini-agent-detail.component.scss'],
    templateUrl: './mini-agent-detail.component.html',
    standalone: true,
    imports: [
    MaterialModule,
    TranslateDirective,
    ReactiveFormsModule,
    UiAutoCompleteComponent
]
})
export class MiniAgentDetailComponent extends AgentDetailComponent {
}
