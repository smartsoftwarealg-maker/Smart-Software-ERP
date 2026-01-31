import { Component, inject, OnInit } from '@angular/core';

import { HttpService } from '@ss/common/api-common';
import { ShellService } from '@ss/common/ui-shell';
import { Observable, of, switchMap } from 'rxjs';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from '@angular/material/table';
import { TranslateDirective } from '@ss/common/ui-lang';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import {TransactionLine} from "@ss/logistics/api-transaction";

@Component({
    selector: 'ss-mrp-reservations',
    imports: [MatTable, MatHeaderCell, MatColumnDef, MatHeaderCellDef, MatCellDef, MatCell, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef, TranslateDirective],
    templateUrl: './reservations.component.html',
    styleUrl: './reservations.component.scss',
    standalone: true
})
export class ReservationsComponent implements OnInit {
    private http = inject(HttpService);
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);

    public data: TransactionLine[] = [];
    displayedColumns: string[] = [
        'reference',
        'description',
        'qtySatisfied',
        'storeName',
        'unitsDescription'
    ];


    getData(id:number |null, lineId?:number): Observable<any[]> {
        let p = new HttpParams() ;
        if (id){p = p.set('transacId', id);}
        if (lineId){p = p.set('lineId', lineId);}
        return this.http.get<TransactionLine[]>('/production/mrp/reservations', p);
    }

    ngOnInit(): void {
        this.data = [];
        this.shellSrv.setLoading(true);
        this.route.queryParams.pipe(
            switchMap(param => {
                const prodId = +param['prodId'];
                const prodDetail = +param['prodDetail'];

                if (prodId) {
                    return this.getData(prodId);
                } else if (prodDetail) {
                    return this.getData(null, prodDetail);
                }
                return of([]);
            })
        ).subscribe({
            next: (data) => {
                this.data = data;
                this.shellSrv.setLoading(false);
            },
            error: err => {
                this.shellSrv.setLoading(false);
                throw err;
            }
        });
    }


    protected readonly Math = Math;
}
