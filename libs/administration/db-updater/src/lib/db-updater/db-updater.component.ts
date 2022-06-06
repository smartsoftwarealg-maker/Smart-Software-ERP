import {Component, OnInit} from '@angular/core';
import {DbUpdaterService} from '../db-updater.service';
import {MatListOption} from '@angular/material/list';
import {of, switchMap, tap} from 'rxjs';

@Component({
    selector: 'ss-db-updater',
    templateUrl: './db-updater.component.html',
    styleUrls: ['./db-updater.component.scss']
})
export class DbUpdaterComponent implements OnInit {
    processing = false;
    files: string[] = [];
    output: string = '';


    constructor(private updateSrv: DbUpdaterService) {
    }

    ngOnInit(): void {
        this.updateSrv.getChangeFiles().subscribe(res => this.files = res);
    }

    update(selection: MatListOption[]) {
        this.output = '';
        this.processing = true;
        const list = selection.map(e => e.value);
        let i = 0;
        this.updateSrv
            .updateDatabase(list[0])
            .pipe(tap(res => {
                    this.output = this.output + res;
                    i += 1;
                }),
                switchMap(res => i < selection.length ? this.updateSrv.updateDatabase(list[i]) : of('')))
            .subscribe({
                next: res => {
                    this.output = this.output + res + '\n*******************End';
                    this.processing = false;
                }, error: err => this.processing = false
            });
    }

    private updateDB(fileList: string[]) {
        this.updateSrv
    }
}
