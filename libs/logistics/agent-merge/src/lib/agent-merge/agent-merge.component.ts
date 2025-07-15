import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Agent, AgentService } from '@ss/logistics/api-agent';
import { DefaultAutoCompleteModel, UiAutoCompleteComponent } from '@ss/common/ui-auto-complete';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatFormField } from '@angular/material/input';
import { MaterialModule } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { of, switchMap } from 'rxjs';

@Component({
    selector: 'ss-agent-merge',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateDirective,
        UiAutoCompleteComponent,
        MatFormField,
        TranslatePipe
    ],
    templateUrl: './agent-merge.component.html',
    styleUrl: './agent-merge.component.scss',
})
export class AgentMergeComponent implements OnInit {
    #shellSrv = inject(ShellService);
    #route = inject(ActivatedRoute);
    #fb = inject(FormBuilder);
    #agentSrv = inject(AgentService);
    #conformationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);

    oldAgentLookup = new DefaultAutoCompleteModel<Agent>(this.#agentSrv, 'id', 'denomination');
    newAgentLookup = new DefaultAutoCompleteModel<Agent>(this.#agentSrv, 'id', 'denomination');

    form = this.#fb.group({
        oldId: [0],
        newId: [0],
    });

    ngOnInit() {
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.#shellSrv.setTitle('LOGISTICS_AGENT_MERGE');
    }

    protected merge() {
        this.#conformationSrv
            .confirm('LOGISTICS_AGENT_MERGE', 'LOGISTICS_AGENT_MERGE')
            .pipe(switchMap(res => res? this.#agentSrv.merge(this.form.getRawValue()) : of({count: 0})))
            .subscribe(res => {
                if (res.count) {
                    this.#snackBarSrv.showSuccessMessage();
                    this.form.reset({ oldId: 0, newId: 0 });
                }
            });
    }
}
