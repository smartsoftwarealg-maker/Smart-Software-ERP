import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RPrivilege } from './report-privilege.api';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { ReportPrivilegeService } from './report-privilege.service';
import { CommonUiLangModule } from '@ss/common/ui-lang';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UiPaginationModule } from '@ss/common/ui-pagination';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReportNode, ReportTreeService } from '@ss/common/api-reports';
import { map, Observable, switchMap, zip } from 'rxjs';

@Component({
    selector: 'lib-common-report-privileges',
    standalone: true,
    imports: [CommonModule, CommonUiLangModule, MatSortModule, MatTableModule, UiPaginationModule, MatCheckboxModule],
    templateUrl: './report-privileges.component.html',
    styleUrls: ['./report-privileges.component.css'],
})
export class ReportPrivilegesComponent implements OnInit, OnDestroy {
    private snackBarSrv = inject(SnackBarService);
    private route = inject(ActivatedRoute);
    private shellSrv = inject(ShellService);
    private entitySrv = inject(ReportPrivilegeService);
    private reportsSrv = inject(ReportTreeService);
    public refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => {
            this.refresh(this.shellSrv.getSearchText());
        }
    };


    displayedColumns = [
        'folder',
        'manager'
    ];
    data$: Observable<RPrivilege[]> = null;
    selectedRow: RPrivilege = null;

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.shellSrv.enableSearch('SEARCH_APP', (obs) => obs.subscribe(str => this.refresh(str)));
        this.refresh('');
        this.shellSrv.setButtons([this.refreshButton]);
        this.shellSrv.setTitle('COMMON_REPORT_PRIVILEGES');
    }

    refresh(str: string) {
        this.data$ = this.route
            .data
            .pipe(switchMap(res =>
                zip(this.reportsSrv.getReportsTree(res['reportBase'] || ''),
                    this.entitySrv.getList(0, 1000, str))),
            map(res => {
                const data = res[0];
                const list = res[1].body;
                return this.getFolders(data.list)
                    .sort()
                    .filter(s => !str || s.toLowerCase().indexOf(str.toLowerCase()) >= 0)
                    .map(f => {
                        return { folder: f, manager: list.find(p => p.folder === f && p.manager)?.manager, hidden: false, id: 0};
                    });
            }));
    }

    selectRow(row: RPrivilege) {
        this.selectedRow = row;
    }

    updateAdmin(item: RPrivilege, e: boolean) {
        this.selectedRow = item;
        this.selectedRow.manager = e;
        this.entitySrv
            .updatePrivilege(this.selectedRow)
            .subscribe(res => {
                if (res.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                }
            });
    }

    private getFolders(list: ReportNode[]): string[] {
        const res =  list
            .filter(l => l.name !== 'forms' &&l.name !== 'subreports' && l.list?.length > 0)
            .map(l => [l.name, ...this.getFolders(l.list)]);
        return  res.length == 0? [] : res.reduce((a, b) => [...a, ...b]);
        // return list
        //     .filter(l => l.name !== 'forms' &&l.name !== 'subreports' && l.list?.length > 0)
        //     .flatMap(l => [l.name, ...this.getFolders(l.list)]);
    }

    sort(event: Sort) {
        this.entitySrv.sortColumn = event;
        this.refresh(this.shellSrv.getSearchText());
    }

    ngOnDestroy(): void {
        this.shellSrv.reset();
    }
}
