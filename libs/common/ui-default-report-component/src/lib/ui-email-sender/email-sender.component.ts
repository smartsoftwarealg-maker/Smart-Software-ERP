import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmailData} from '../FormData';

@Component({
    selector: 'ss-email-sender',
    templateUrl: './email-sender.component.html',
    styleUrls: ['./email-sender.component.scss']
})
export class EmailSenderComponent implements OnInit {
    form: FormGroup = new FormGroup({
        from: new FormControl(this.data['from'], Validators.required),
        to: new FormControl(this.data['to'], Validators.required),
        password: new FormControl('', Validators.required),
        subject: new FormControl(''),
        message: new FormControl('')
    });

    constructor(private dialogRef: MatDialogRef<EmailSenderComponent>,
                @Inject(MAT_DIALOG_DATA) public data: EmailData) {
        new FormGroup({
            from: new FormControl(this.data['from'], Validators.required),
            to: new FormControl(this.data['to'], Validators.required),
            password: new FormControl('', Validators.required),
            subject: new FormControl(''),
            message: new FormControl('')
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
