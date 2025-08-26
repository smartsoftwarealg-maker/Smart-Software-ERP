import { Component, inject, OnInit } from '@angular/core';

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShellService, SnackBarService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { PassEncodingService } from './pass-encoding.service';
import { TranslateDirective } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-pass-encoding',
    imports: [
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    TranslateDirective
],
    templateUrl: './pass-encoding.component.html',
    styleUrl: './pass-encoding.component.scss',
    standalone: true,
})
export class PassEncodingComponent implements OnInit {
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private passEncodeSrv = inject(PassEncodingService);
    public snackBarSrv = inject(SnackBarService);
    password = new FormControl('', [Validators.required]);
    code = new FormControl('');

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('ADMINISTRATION_PASSWORD_ENCODING');
    }

    public encode(): void {
         this.passEncodeSrv.encode(this.password.value).subscribe({
            next: data => {
                this.code.setValue(data.password)
            },
            error: err => {
                this.snackBarSrv.showFailureMessage(err);
            }
        })

    }

    public decode(): void {
         this.passEncodeSrv.decode(this.password.value).subscribe({
            next: data => {
                this.code.setValue(data.password)
            },
            error: err => {
                this.snackBarSrv.showFailureMessage();
                throw err
            }
        })

    }

}
