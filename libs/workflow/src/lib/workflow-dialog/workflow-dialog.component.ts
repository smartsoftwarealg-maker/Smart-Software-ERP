import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserMessageService} from '../user-message.service';
import { LoginService, MaterialModule } from '@ss/common/api-common';
import { map, Observable, of, switchMap, tap } from "rxjs";
import {MailBox, UserMessage} from '../workflow-api';
import {MailBoxService} from '../mail-box.service';
import {FormControl} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { RemunerationPaymonthEditorModule } from '@ss/remuneration/paymonth-editor';


import { OrgChartModule } from 'angular13-organization-chart';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

type MBData = {
    amount: number;
    documentId: number,
    transacId?: number;
    validated?: boolean;
};

@Component({
    selector: 'ss-workflow-dialog',
    templateUrl: './workflow-dialog.component.html',
    styleUrls: ['./workflow-dialog.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,
        TranslatePipe,
        CommonUiAutoCompleteModule,
        RemunerationPaymonthEditorModule,
        OrgChartModule,
    ],
})
export class WorkflowDialogComponent implements OnInit {
    canceled = new FormControl<boolean>(false);
    selectedId = 0;
    userMessages$: Observable<UserMessage[]> | null = null;
    responsible = false;

    constructor(private dialogRef: MatDialogRef<WorkflowDialogComponent>,
                private messageSrv: UserMessageService,
                private mailboxSrv: MailBoxService,
                private loginSrv: LoginService,
                @Inject(MAT_DIALOG_DATA) private data: MBData ) {}

    ngOnInit(): void {
        this.messageSrv.setParentId(this.loginSrv.appCtx.id);
        this.responsible = this.loginSrv.appCtx.manager || this.loginSrv.appCtx.responsible;

        this.userMessages$ = this.messageSrv
            .getList(0, 100, (this.data.amount || 0) + '')
            .pipe(map(res => {
                const data: UserMessage[] = [];
                res.body.forEach(e => {
                    if (data.find(d => d.messageId === e.messageId) === undefined &&
                        (this.data.validated || !e.isPostFinal)) {
                        data.push(e);
                    }
                });
                return data;
            }));
    }

    public send() {
        const ent: MailBox = {
            id: 0,
            transacId: this.data.transacId,
            documentId: this.data.documentId,
            messageId: this.selectedId,
            centerId: this.loginSrv.appCtx.center,
            timeStamp: new Date(),
            senderId: this.loginSrv.appCtx.id || 1,
            canceled: this.canceled.value,
            receiverId: this.loginSrv.appCtx.id
        };

        this.mailboxSrv.setParentId(this.loginSrv.appCtx.id || 1);
        this.mailboxSrv
            .save(ent)
            .pipe(tap(_ => this.dialogRef.close({ message: this.selectedId })),
                switchMap(id => id>0? this.mailboxSrv.broadcast(id) : of(0)))
            .subscribe({
                next: res => this.dialogRef.close({ message: this.selectedId }),
                error: err => {
                    this.dialogRef.close({ message: 0 });
                    throw err;
                }
            });
    }

    public cancel() {
        this.dialogRef.close();
    }

    selectId(id: number) {
        this.selectedId = id;
    }

    broadcast(id: number) {
        this.mailboxSrv.broadcast(id);
    }
}
