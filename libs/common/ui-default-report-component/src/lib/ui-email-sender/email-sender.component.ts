import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {EmailData} from '../FormData';

@Component({
    selector: 'ss-email-sender',
    templateUrl: './email-sender.component.html',
    styleUrls: ['./email-sender.component.scss']
})
export class EmailSenderComponent implements OnInit {
    form: UntypedFormGroup = new UntypedFormGroup({
        from: new UntypedFormControl(this.data['from'], Validators.required),
        to: new UntypedFormControl(this.data['to'], Validators.required),
        password: new UntypedFormControl('', Validators.required),
        subject: new UntypedFormControl(''),
        message: new UntypedFormControl('')
    });

    constructor(private dialogRef: MatDialogRef<EmailSenderComponent>,
                @Inject(MAT_DIALOG_DATA) public data: EmailData) {
        new UntypedFormGroup({
            from: new UntypedFormControl(this.data['from'], Validators.required),
            to: new UntypedFormControl(this.data['to'], Validators.required),
            password: new UntypedFormControl('', Validators.required),
            subject: new UntypedFormControl(''),
            message: new UntypedFormControl('')
        });
    }

    ngOnInit(): void {
        this.form.controls['from'].setValue(this.data.from);
        this.form.controls['to'].setValue(this.data.to);
    }

    onClose() {
        this.dialogRef.close();
    }

    onSubmit() {
        this.dialogRef.close(this.form.value);
    }
}
