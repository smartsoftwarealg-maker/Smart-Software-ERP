import {Component, Input, OnInit} from '@angular/core';
import {Blocking} from '../assets-api';
import { LanguageService, MaterialModule, PaginationModel } from '@ss/common/api-common';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {  ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import {DefaultReportService} from '@ss/common/ui-default-report-component';
import {of, switchMap} from 'rxjs';
import {AssetBlockingService} from '../services/asset-blocking.service';
import { CommonModule } from '@angular/common';




import { DatePickerComponent } from '@ss/common/ui-datepicker';


import { QRCodeModule } from 'angularx-qrcode';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';

@Component({
  selector: 'ss-asset-blocking-list',
  templateUrl: './asset-blocking-list.component.html',
  styleUrls: ['../asset-revaluation-list/asset-revaluation-list.component.scss'],
  standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        TranslateDirective,

        DatePickerComponent,
        RouterModule,

        QRCodeModule,
        PaginationComponent,
        TranslatePipe
    ]})
export class AssetBlockingListComponent extends BaseChildEntityListComponent<Blocking> {
    override displayedColumns = ['decision', 'date', 'fromDate', 'toDate', 'typeDescription'];


    constructor(private entitySrv: AssetBlockingService) {
        super(entitySrv, 'Blocking');
    }
    //
    // ngOnInit() {
    //     this.pagination.onChange = () => this.refresh();
    //     this.refresh();
    // }
    //
    // @Input()
    // set assetId(id: number) {
    //     this.entitySrv.setParentId(id);
    // }
    //
    // public select(id: number): void {
    //     this.selected = id;
    // }
    //
    // public deleteSelected(): void {
    //     if (this.selected && this.selected > 0) {
    //         this.confirmationSrv
    //             .confirmDelete()
    //             .pipe(switchMap(answer => {
    //                 const a = this.blockings.filter(x => x.id === this.selected)[0];
    //                 return answer && a && a.id ? this.entitySrv.remove(a.id) : of({count: 0});
    //             }))
    //             .subscribe({
    //                 next: res => {
    //                     this.snackBarSrv.showSuccessMessage();
    //                     this.refresh();
    //                 },
    //                 error: err => {
    //                     this.snackBarSrv.showFailureMessage();
    //                     throw err;
    //                 }
    //             });
    //     } else {
    //         this.snackBarSrv.showMessage('COMMON_NO_SELECTION');
    //     }
    // }
    //
    // public edit() {
    //     this.showDetail(this.selected);
    // }
    //
    // public showDetail(id: number) {
    //     this.router.navigate([id], { relativeTo: this.route }).then();
    // }
    //
    // ngOnDestroy() {
    // }
    //
    // public refresh() {
    //     this.selected = 0;
    //     this.entitySrv
    //         .getList(this.pagination.page - 1, this.pagination.pageSize)
    //         .subscribe(res => {
    //             this.blockings = res.body;
    //             this.pagination.elementCount = res.itemCount;
    //         });
    // }
    //
    // public selectReport() {
    //     this.defReportSrv
    //         .open(this.shellSrv.getApp(), this.reportForm)
    //         .subscribe(resp => {
    //             if (resp.count > 0) {
    //                 this.snackBarSrv.showSuccessMessage();
    //             }
    //         });
    // }
    // public viewReport() {
    //     this.defReportSrv
    //         .viewReport(this.reportForm, this.selected)
    //         .subscribe(res => {
    //             const fileURL = URL.createObjectURL(new Blob([res], { type: 'application/pdf' }));
    //             window.open(fileURL, '_blank');
    //         });
    // }
}
