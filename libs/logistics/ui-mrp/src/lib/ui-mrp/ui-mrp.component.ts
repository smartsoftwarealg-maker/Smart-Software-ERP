import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MRP, MRP_URL } from '../../../../../production/mrp/src/lib/api/mrp-api';
import { HttpService } from '@ss/common/api-common';
import { ShellService } from '@ss/common/ui-shell';
import { Observable } from 'rxjs';
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

@Component({
    selector: 'ss-ui-mrp',
    imports: [CommonModule, MatTable, MatHeaderCell, MatColumnDef, MatHeaderCellDef, MatCellDef, MatCell, MatHeaderRow, MatRow, MatHeaderRowDef, MatRowDef ,TranslateDirective],
    templateUrl: './ui-mrp.component.html',
    styleUrl: './ui-mrp.component.scss',
    standalone: true
})
export class UiMrpComponent implements OnInit {
    @Input() prodId?: number;
    @Input() prodDetail?: number;
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

    getData(): Observable<MRP[]> {
        return this.http.get<MRP[]>(MRP_URL);
    }

    ngOnInit(): void {
        this.data = [];
        this.shellSrv.setLoading(true);
        this.route.queryParams.subscribe(param => {
            const prodId = +param['prodId'];
            const prodDetail = +param['prodDetail'];

            if (prodId) {
               param.id=this.prodId;
            }else if (prodDetail){
                param.id=this.prodDetail
            }
        });

        this.getData().subscribe({
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
