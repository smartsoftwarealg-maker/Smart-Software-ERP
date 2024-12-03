import {Component} from '@angular/core';
import {AgentDetailComponent} from '../agent-detail/agent-detail.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { ReactiveFormsModule } from '@angular/forms';


import { TranslateDirective } from '@ss/common/ui-lang';


@Component({
    selector: 'ss-mini-agent-detail',
    styleUrls: ['./mini-agent-detail.component.scss'],
    templateUrl: './mini-agent-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        ReactiveFormsModule,
    ],
})
export class MiniAgentDetailComponent extends AgentDetailComponent {
}
