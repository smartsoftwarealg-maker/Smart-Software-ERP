import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from '@ss/common/api-common';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable,
} from '@angular/material/table';
import { MRP, MRP_URL } from '../api/mrp-api';
import { Observable } from 'rxjs';
import { ShellService } from '@ss/common/ui-shell';
import { TranslateDirective } from '@ss/common/ui-lang';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ss-mrp',
    imports: [CommonModule, MatTable, MatHeaderCell, MatColumnDef, MatCell, MatHeaderCellDef, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, TranslateDirective],
    templateUrl: './mrp.component.html',
    styleUrl: './mrp.component.scss',
    standalone: true
})
export class MrpComponent implements OnInit {
    private route = inject(ActivatedRoute);
    public data: MRP[] = [];
    displayedColumns: string[] = [
        'reference',
        'description',
        'qty',
        'purchaseOrder',
        'inventory',
        'toOrder'
    ];

    constructor(private http: HttpService, private shellSrv: ShellService) {
    }

    getData(): Observable<MRP[]> {
        return this.http.get<MRP[]>(MRP_URL);
    }

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.setTitle('Production MRP');
        this.data = [];
        this.shellSrv.setLoading(true);
        this.getData().subscribe({
            next: (data) => {
                console.log(this.data);
                this.data = data;
                this.shellSrv.setLoading(false);
            },
            error: err => {
                console.log(this.data);
                this.shellSrv.setLoading(false);
                throw err;
            }
        });
    }


    protected readonly Math = Math;
}
