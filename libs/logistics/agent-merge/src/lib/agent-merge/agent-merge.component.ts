import { Component, inject, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Agent, AgentService } from '@ss/logistics/api-agent';
import {
    DefaultAutoCompleteModel,
    UiAutoCompleteComponent,
} from '@ss/common/ui-auto-complete';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { MatFormField } from '@angular/material/input';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { finalize, of, switchMap } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
    selector: 'ss-agent-merge',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        TranslateDirective,
        UiAutoCompleteComponent,
        MatFormField,
        TranslatePipe,
    ],
    templateUrl: './agent-merge.component.html',
    styleUrl: './agent-merge.component.scss',
    standalone: true,
})
export class AgentMergeComponent implements OnInit {
    #shellSrv = inject(ShellService);
    #route = inject(ActivatedRoute);
    #fb = inject(FormBuilder);
    #agentSrv = inject(AgentService);
    #conformationSrv = inject(ConfirmationDialogService);
    #snackBarSrv = inject(SnackBarService);
    #router = inject(Router);
    #activatedRoute = inject(ActivatedRoute);
    #httpSrv = inject(HttpService);

    oldAgentLookup = new DefaultAutoCompleteModel<Agent>(
        this.#agentSrv,
        'id',
        'denomination',
    );
    newAgentLookup = new DefaultAutoCompleteModel<Agent>(
        this.#agentSrv,
        'id',
        'denomination',
    );

    form = this.#fb.group({
        oldId: [0],
        newId: [0],
    });

    requiredFileType = input('.xlsx');
    fileName = '';
    uploadProgress = 0;

    reset() {
        this.uploadProgress = null;
    }

    cancel() {
        this.#router
            .navigate(['../'], { relativeTo: this.#activatedRoute })
            .then();
    }

    ngOnInit() {
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.#shellSrv.setTitle('LOGISTICS_AGENT_MERGE');
    }

    protected merge() {
        this.#conformationSrv
            .confirm('LOGISTICS_AGENT_MERGE', 'LOGISTICS_AGENT_MERGE')
            .pipe(
                switchMap((res) =>
                    res
                        ? this.#agentSrv.merge(this.form.getRawValue())
                        : of({ count: 0 }),
                ),
            )
            .subscribe((res) => {
                if (res.count) {
                    this.#snackBarSrv.showSuccessMessage();
                    this.form.reset({ oldId: 0, newId: 0 });
                }
            });
    }

    onChange(e: any) {
        this.fileName = e[0]?.name;
    }

    onFileSelected(files: any) {
        const file: File = files[0];
        if (file) {
            this.fileName = file.name;
            const formData = new FormData();
            formData.append('file', file);
            this.#httpSrv
                .upload('/agents/merge-xls', formData)
                .pipe(finalize(() => this.reset()))
                .subscribe({
                    next: (res: any) => {
                        if (res.type == HttpEventType.UploadProgress) {
                            this.uploadProgress = Math.round(
                                100 * (res.loaded / res.total),
                            );
                        } else if (res.type == HttpEventType.Response) {
                            this.#snackBarSrv.showSuccessMessage();
                        }
                    },
                    error: (err) => {
                        throw err;
                    },
                });
        }
    }
}
