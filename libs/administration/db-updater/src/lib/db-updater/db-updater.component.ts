import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {DbUpdaterService} from '../db-updater.service';
import {MatListOption} from '@angular/material/list';
import {catchError, concatMap, delay, from, map, Observable, of, switchMap, tap} from 'rxjs';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute, Route} from '@angular/router';
import {DBResponse} from '../db-updater-api';
import { FormControl } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'ss-db-updater',
    templateUrl: './db-updater.component.html',
    styleUrls: ['./db-updater.component.scss']
})
export class DbUpdaterComponent implements OnInit {
    #destroyRef = inject(DestroyRef);
    #fileList: string[] = [];

    processing = signal(false);

    files =  signal<string[]>([]);
    output: string = '';

    searchText = new FormControl<string>('');

    constructor(private updateSrv: DbUpdaterService,
                private shellSrv: ShellService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.updateSrv.getChangeFiles().subscribe(res => {
            this.#fileList = res;
            this.files.set(res);
        });
        this.shellSrv.setGoBackPath('../', this.route);
        this.shellSrv.setTitle('COMMON_DB_UPDATER');

        this.searchText
            .valueChanges
            .pipe(takeUntilDestroyed(this.#destroyRef),
                debounceTime(300),
                distinctUntilChanged(),
                map(res => res.trim()),
            ).subscribe(res => this.files.set(this.#fileList.filter(e => res.length === 0 || e.toLowerCase().includes(res.toLowerCase()))));
    }

    update(selection: MatListOption[]) {
        this.output = '';
        this.processing.set(true);
        const list: string[] = selection.map(e => e.value.toString());
        let freshOut = '';
        const loop: Observable<DBResponse> = this.updateSrv
            .info()
            .pipe(delay(3000),
                tap(res => {
                    this.output = freshOut + res.info;
                    if (!res.processing) {
                        freshOut = res.info;
                    }
                }),
                switchMap(res => res.processing? loop : of(res)));

        from(list)
            .pipe(concatMap(file => this.updateSrv
                .updateDatabase(file)
                .pipe(tap(res => {
                    freshOut +=  `*****************************${file}*******************************\n`;
                    freshOut += res.info;
                    this.output = freshOut;
                }),
                    catchError(e => {
                        freshOut +=  `*****************************${file}*******************************\n`;
                        this.output = freshOut;
                        return loop;
                    }))))
            .subscribe({
                next:     () =>  this.output += '************************************************************************\n',
                error: () => this.processing.set(false),
                complete: () => this.processing.set(false)
            });

    }

}
