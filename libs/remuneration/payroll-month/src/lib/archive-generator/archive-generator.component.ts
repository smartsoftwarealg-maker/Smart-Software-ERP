import {Component, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {LanguageService} from '@ss/common/api-common';
import {ArchiveGeneratorService} from '../archive-generator.service';
import { NgIf } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { TranslateDirective } from '@ss/common/ui-lang';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TranslatePipe } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-archive-generator',
    templateUrl: './archive-generator.component.html',
    styleUrls: ['./archive-generator.component.scss'],
    standalone: true,
    imports: [NgIf, MatCard, MatCardContent, FormsModule, ReactiveFormsModule, MatFormField, MatLabel, TranslateDirective, MatInput, MatButton, MatProgressBar, TranslatePipe]
})
export class ArchiveGeneratorComponent implements OnInit {
    form: UntypedFormGroup = null;
    processing = false;

    constructor(private selectorSrv: PayrollMonthService,
                private formBuilder: UntypedFormBuilder,
                private shellSrv: ShellService,
                private route: ActivatedRoute,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService,
                private snackBarSrv: SnackBarService,
                private langSrv: LanguageService,
                private generatorSrv: ArchiveGeneratorService) {
    }

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.selectorSrv
            .maxMonth()
            .subscribe(res => {
                this.form = this.formBuilder
                    .group({
                        year: [+(res.month / 100).toFixed(0), Validators.required],
                        month: [+(res.month % 100).toFixed(0), Validators.required],
                    })
            })
    }

    cancel() {
        this.router.navigate(['../'], {relativeTo: this.activatedRoute});
    }

    generate() {
        this.processing = true;
        const period = this.form.value.year * 100 + this.form.value.month;
        this.generatorSrv
            .generate(period)
            .subscribe({
                next: res => {
                    this.processing = false;
                    this.snackBarSrv.showSuccessMessage();
                },
                error: err => {
                    this.processing = false;
                    throw err;
                }
            });
    }

    public canDeactivate(): boolean {
        if (this.processing) {
            window.confirm(this.langSrv.translate('COMMON_BUSY'));
        }
        return !this.processing;
    }
}
