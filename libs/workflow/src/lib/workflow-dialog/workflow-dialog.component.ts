import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UserMessageService} from '../user-message.service';
import {LoginService} from '@ss/common/api-common';
import {map, Observable, tap} from 'rxjs';
import {MailBox, UserMessage} from '../workflow-api';
import {MailBoxService} from '../mail-box.service';

type MBData = {
    amount: number;
    transacId?: number;
    payOrderId?: number;
    assetRecepId?: number;
    assetAppointmentId?: number;
};

@Component({
    selector: 'ss-workflow-dialog',
    templateUrl: './workflow-dialog.component.html',
    styleUrls: ['./workflow-dialog.component.scss'],
})
export class WorkflowDialogComponent implements OnInit {
    selectedId = 0;
    userMessages$: Observable<UserMessage[]> | null = null;
    constructor(private dialogRef: MatDialogRef<WorkflowDialogComponent>,
                private messageSrv: UserMessageService,
                private mailboxSrv: MailBoxService,
                private loginSrv: LoginService,
                @Inject(MAT_DIALOG_DATA) private data: MBData ) {}

    ngOnInit(): void {
        this.messageSrv.setParentId(this.loginSrv.appCtx.id);
        this.userMessages$ = this.messageSrv
            .getList(0, 100, this.data.amount + '')
            .pipe(map(res => res.body));
    }

    public send() {
        const ent: MailBox = {
            id: 0,
            assetRecepId: this.data.assetRecepId,
            payOrderId: this.data.payOrderId,
            transacId: this.data.transacId,
            assetAppointmentId: this.data.assetAppointmentId,
            messageId: this.selectedId,
            centerId: this.loginSrv.appCtx.center,
            timeStamp: new Date(),
            senderId: this.loginSrv.appCtx.id,
            receiverId: this.loginSrv.appCtx.id
        };
        this.mailboxSrv.setParentId(this.loginSrv.appCtx.id);
        this.mailboxSrv
            .save(ent)
            .pipe(tap(_ => this.dialogRef.close({ message: this.selectedId })))
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
}
