import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PayrollMonthService} from '@ss/remuneration/payroll-month';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationDialogService} from '@ss/common/ui-confirmation-dialog';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {LanguageService} from '@ss/common/api-common';
import {ArchiveGeneratorService} from '../archive-generator.service';

@Component({
  selector: 'ss-archive-generator',
  templateUrl: './archive-generator.component.html',
  styleUrls: ['./archive-generator.component.scss']
})
export class ArchiveGeneratorComponent implements OnInit {
    form: FormGroup = null;
    processing = false;

    constructor(private selectorSrv: PayrollMonthService,
                private formBuilder: FormBuilder,
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
