import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellService } from '@ss/common/ui-shell';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MatInput, MatLabel } from '@angular/material/input';
import { TranslateDirective } from '@ss/common/ui-lang';
import { debounceTime, map, switchMap } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpService, MaterialModule } from '@ss/common/api-common';
import { HttpParams } from '@angular/common/http';

@Component({
    selector: 'ss-irg',
    imports: [CommonModule, MaterialModule, MatCard, ReactiveFormsModule, MatInput, MatLabel, TranslateDirective],
    templateUrl: './irg.component.html',
    styleUrl: './irg.component.scss',
})
export class IrgComponent implements OnInit {
    #destroyRef = inject(DestroyRef);
    #shellSrv = inject(ShellService);
    #route = inject(ActivatedRoute);
    #httpSrv = inject(HttpService);
    #fb = inject(FormBuilder);

    form = this.#fb.group ({
        base:     [0.0],
        absence:  [0],
        irg:      [0],
    });

    ngOnInit(): void {
        this.#shellSrv.setTitle('REMUN_IRG_CALCULATOR');
        this.#shellSrv.setGoBackPath('..', this.#route);
        this.form
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                takeUntilDestroyed(this.#destroyRef),
                switchMap(() => {
                    const formValue = this.form.getRawValue();
                    const params = new HttpParams()
                        .set('base', (formValue.base||0).toFixed(2))
                        .set('absence', (formValue.absence||0).toFixed(2));
                    return this.#httpSrv.get<{irg: number}>('/payroll/irg', params);
                }),
                map(res => res.irg),
            ).subscribe(v => this.form.controls.irg.setValue(v, { emitEvent: false }));
    }
}
