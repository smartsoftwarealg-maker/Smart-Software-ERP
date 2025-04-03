import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MRP, MRP_URL } from '../../../../../production/mrp/src/lib/api/mrp-api';
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

@Component({
    selector: 'ss-ui-mrp',
    imports: [CommonModule, MatTable, MatHeaderCell, MatColumnDef, MatHeaderCellDef, MatCellDef, MatCell, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef ,TranslateDirective],
    templateUrl: './ui-mrp.component.html',
    styleUrl: './ui-mrp.component.scss',
    standalone: true
})
export class UiMrpComponent implements OnInit {
    public data: MRP[] = [];
    displayedColumns: string[] = [
        'reference',
        'description',
        'qty',
        'purchaseOrder',
        'inventory',
        'toOrder'
    ];

    constructor(private http: HttpService, private shellSrv: ShellService, private route:ActivatedRoute) {
    }

    getData(id:number |null, lineId?:number): Observable<MRP[]> {
        let p = new HttpParams() ;
        if (id){p = p.set('id', id);}
        if (lineId){p = p.set('lineId', lineId);}
        return this.http.get<MRP[]>(MRP_URL, p);
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
