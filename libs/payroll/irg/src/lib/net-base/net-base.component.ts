import { Component, DestroyRef, inject, OnInit, ChangeDetectionStrategy, signal, effect} from '@angular/core';

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
import {form, FormField, readonly} from "@angular/forms/signals";

interface Net {
    base: string;
    ss: string;
    irg: string;
    net: number;
};

@Component({
    selector: 'ss-net-base',
    imports: [MaterialModule, MatCard, ReactiveFormsModule, MatInput, MatLabel, TranslateDirective, FormField],
    templateUrl: './net-base.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './net-base.component.scss',
})
export class NetBaseComponent implements OnInit {
    #shellSrv = inject(ShellService);
    #route = inject(ActivatedRoute);
    #httpSrv = inject(HttpService);
    #fb = inject(FormBuilder);

    simulation = signal<Net>({ base: '0', ss: '0', irg: '0', net: 0 });

    form = form(this.simulation, path => {
       readonly(path.base),
           readonly(path.ss),
             readonly(path.irg)
    });

    effect1 = effect(() => {
        const base = +(this.form.base().value()||'0');
        const params = new HttpParams()
            .set('base', base)
            .set('absence', '0');
        this.#httpSrv
            .get<{irg: number}>('/payroll/irg', params)
            .subscribe(res => {
                this.form.irg().value.set((res.irg||0).toFixed(2));
                const ss = +(base * 0.09).toFixed(2);
                this.form.ss().value.set(ss.toFixed(2));
            });

    });

    effect2 = effect(() => {
        const net = this.form.net().value()||0;
        const params = new HttpParams()
            .set('base', net)
        this.#httpSrv
            .get<{base: number}>('/payroll/base-for', params)
            .subscribe(res => this.form.base().value.set((res.base||0).toFixed(2)));
    });

    ngOnInit(): void {
        this.#shellSrv.setTitle('REMUN_BASE_SALARY_CALCULATOR');
        this.#shellSrv.setGoBackPath('..', this.#route);
    }
}
