import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-crm-email-sender',
    templateUrl: './crm-email-sender.component.html',
    styleUrls: ['./crm-email-sender.component.scss'],
    standalone: true,
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateDirective
    ],
})
export class CrmEmailSenderComponent {

    #fb = inject(FormBuilder);
    #dialogRef = inject(MatDialogRef<CrmEmailSenderComponent>);
    #httpSrv = inject(HttpService);
    #snackBar = inject(MatSnackBar);

    form = this.#fb.group({
        subject: new FormControl<string | null>(null, Validators.required),
        message: new FormControl<string | null>(null, Validators.required)
    });

    constructor(@Inject(MAT_DIALOG_DATA) private data: { id: number , form: string }) {}

    public send() {

        const body = {
            id: this.data.id,
            form: this.data.form,
            subject: this.form.value.subject,
            message: this.form.value.message
        };

        this.#httpSrv.put(`/reports/email`, body).subscribe({
            next: () => {
                this.#snackBar.open('Email sent successfully', 'OK', { duration: 3000 });
                this.#dialogRef.close(true);
            },
            error: (err) => {
                console.error(err);
                this.#snackBar.open('Failed to send email', 'OK', { duration: 3000 });
            }
        });
    }


    public cancel() {
        this.#dialogRef.close();
    }
}
