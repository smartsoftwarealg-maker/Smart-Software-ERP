import {Component} from '@angular/core';
import {AgentDetailComponent} from '../agent-detail/agent-detail.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';


import { ReactiveFormsModule } from '@angular/forms';


import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CustomAttributesModule } from '@ss/custom-attributes';
import { DocInfoComponent } from '@ss/logistics/ui-doc-info';


@Component({
    selector: 'ss-mini-agent-detail',
    styleUrls: ['./mini-agent-detail.component.scss'],
    templateUrl: './mini-agent-detail.component.html',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,


        ReactiveFormsModule,



        CommonUiAutoCompleteModule,
        CustomAttributesModule,
        DocInfoComponent
    ],
})
export class MiniAgentDetailComponent extends AgentDetailComponent {
}
