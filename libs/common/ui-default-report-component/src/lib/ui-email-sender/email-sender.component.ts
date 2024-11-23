import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {EmailData} from '../FormData';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '../../../../ui-lang/src/lib/translate.directive';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'ss-email-sender',
    templateUrl: './email-sender.component.html',
    styleUrls: ['./email-sender.component.scss'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatButton]
})
export class EmailSenderComponent implements OnInit {
    form: UntypedFormGroup = null;

    constructor(private dialogRef: MatDialogRef<EmailSenderComponent>,
                @Inject(MAT_DIALOG_DATA) public data: EmailData) {
        this.form = new UntypedFormGroup({
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
