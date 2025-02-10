import { Component, inject, Inject, OnInit } from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@ss/common/api-common';
import { TranslateDirective } from '@ss/common/ui-lang';
import { LtmEmailSenderService } from './ltm-email-sender.service';

@Component({
    selector: 'ss-email-sender',
    templateUrl: './ltm-email-sender.component.html',
    styleUrls: ['./ltm-email-sender.component.scss'],
    standalone: true,
    providers: [LtmEmailSenderService],
    imports: [MaterialModule, TranslateDirective, FormsModule, ReactiveFormsModule]
})
export class LtmEmailSenderComponent implements OnInit {
    #fb = inject(FormBuilder);
    #dialogRef = inject(MatDialogRef<LtmEmailSenderComponent>);
    #emailSenderSrv = inject(LtmEmailSenderService);
    #document = 0;
    #component: string|null = null;
    #password = new FormControl<string|null>(null);
    #subject = new FormControl<string|null>(null);
    #message = new FormControl<string|null>(null);

    form = this.#fb.group({
        subject: this.#subject,
        message: this.#message,
        password: this.#password
    });


    constructor(@Inject(MAT_DIALOG_DATA) private data: { document: number, form: string }) {
        this.#document = data.document;
        this.#component = data.form;
    }

    ngOnInit(): void {
    }

    public close() {
        this.#dialogRef.close();
    }

    public cancel() {
        this.#dialogRef.close();
    }

    public send() {
        const formValue = this.form.value;
        this.#emailSenderSrv
            .send(this.#document, this.#component, formValue.subject, formValue.message, formValue.password)
            .subscribe({
                next: _ => this.close(),
                error: err => this.#dialogRef.close(err.toString())
            });
    }
}
