import { Component } from '@angular/core';
import { BaseChildEntityListComponent } from '@ss/common/ui-base-entity';
import {
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
} from '@angular/material/table';
import { TranslateDirective, TranslatePipe } from '@ss/common/ui-lang';
import { PaginationComponent } from '@ss/common/ui-pagination';
import { Detail, MGeneration, MissionJourney, Summary } from '../journey-api.class';
import { JourneyLineService } from '../journey.service';
import { AsyncPipe, DatePipe, DecimalPipe } from '@angular/common';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import { MatCheckbox } from '@angular/material/checkbox';
import { Lookup } from '@ss/common/api-lookup';
import {zip} from "rxjs";

@Component({
    selector: 'ss-missions-expenses-line-list',
    templateUrl: './mission-expenses-line-list.component.html',
    styleUrls: ['./mission-expenses-line-list.component.scss'],
    standalone: true,
    imports: [
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatHeaderCell,
        TranslateDirective,
        MatCellDef,
        MatCell,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        PaginationComponent,
        AsyncPipe,
        MatMiniFabButton,
        TranslatePipe,
        MatTooltip,
        MatTabGroup,
        MatTab,
        MatTabLabel,
        DatePipe,
        MatCheckbox,
        MatButton,
        DecimalPipe
    ]
})
export class MissionExpensesLineListComponent extends BaseChildEntityListComponent<MissionJourney> {
    override displayedColumns = ['from', 'to'];

    constructor(protected override detailSrv: JourneyLineService) {
        super(detailSrv, 'MISSION_EXPENSES');
    }

    elementsTypes: Lookup[] = [];
    selectedTypes: number[] = [];
    tabIndex = 0; // first tab
    detailData: Detail[] = [];
    summaryData: Summary[] = [];
    detailDisplayedColumns = [ 'element','count', 'amount'];
    summaryDisplayedColumns = ['element', 'date', 'amount'];


    override ngOnInit() {
        super.ngOnInit();
        this.load();
        // this.detailSrv
        //     .getMissionElementTypes(0)
        //     .subscribe({
        //     next: (res) => {
        //         this.elementsTypes = res;
        //     },
        //     error: (err) => {
        //         throw err;
        //     },
        // });
        // this.detailSrv
        //     .getDetail()
        //     .subscribe({
        //     next: (res) => {
        //         this.detailData = res;
        //     },
        //     error: (err) => {
        //         throw err;
        //     },
        // });
        // this.detailSrv.getSummary().subscribe({
        //     next: (res) => {
        //         this.summaryData = res;
        //     },
        //     error: (err) => {
        //         throw err;
        //     },
        // });
    }

    private load() {
        zip(this.detailSrv.getMissionElementTypes(0),
            this.detailSrv.getDetail(),
            this.detailSrv.getSummary())
            .subscribe({
                next: ([types, detail, summary]) => {
                    this.elementsTypes = types;
                    this.detailData = detail;
                    this.summaryData = summary;
                },
                error: (err) => {
                    throw err;
                },
            });
    }

    addRemoveElement(isExist: boolean, id: number) {
        if (isExist) {
            this.selectedTypes.push(id);
        } else {
            this.selectedTypes = this.selectedTypes.filter((n) => n !== id);
        }
    }

    generateMissions() {
        const MG: MGeneration = {
            id: this.detailSrv.getParentId(),
            elemList: this.selectedTypes.toString(),
        };
        this.detailSrv.generateMission(MG).subscribe({
            next: () => {
                this.snackBarSrv.showSuccessMessage();
                this.load();
            },
            error: (err) => {
                this.snackBarSrv.showFailureMessage();
                throw err;
            },
        });
    }
}
