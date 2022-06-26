import {Component, OnInit} from '@angular/core';
import {DbUpdaterService} from '../db-updater.service';
import {MatListOption} from '@angular/material/list';
import {catchError, concatMap, delay, from, map, Observable, of, switchMap, tap} from 'rxjs';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute, Route} from '@angular/router';
import {DBResponse} from '../db-updater-api';

@Component({
    selector: 'ss-db-updater',
    templateUrl: './db-updater.component.html',
    styleUrls: ['./db-updater.component.scss']
})
export class DbUpdaterComponent implements OnInit {
    private EMPTY_RESPONSE: DBResponse = { processing: false, info: ''};
    processing = false;
    files: string[] = [];
    output: string = '';


    constructor(private updateSrv: DbUpdaterService,
                private shellSrv: ShellService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.updateSrv.getChangeFiles().subscribe(res => this.files = res);
        this.shellSrv.setGoBackPath('../', this.route);
        this.shellSrv.setTitle('COMMON_DB_UPDATER');
    }

    update(selection: MatListOption[]) {
        this.output = '';
        this.processing = true;
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
                error: () => this.processing = false,
                complete: () => this.processing = false
            });

    }

}
