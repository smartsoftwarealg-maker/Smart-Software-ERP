import {Component} from '@angular/core';
import {AgentDetailComponent} from '../agent-detail/agent-detail.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { AppArchiveModule } from '@ss/common/app-archive';
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
        CommonUiLangModule,
        UiPaginationModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule,

        AppArchiveModule,
        CommonUiAutoCompleteModule,
        CustomAttributesModule,
        DocInfoComponent
    ],
})
export class MiniAgentDetailComponent extends AgentDetailComponent {
}
