import {Component, OnInit} from '@angular/core';
import {Asset} from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {AssetsService} from '../services/assets.service';
import {Sort} from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@ss/common/api-common';
import { CommonUiLangModule } from '@ss/common/ui-lang';

import { UiPaginationModule } from '@ss/common/ui-pagination';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { CommonUiAutoCompleteModule } from '@ss/common/ui-auto-complete';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { CustomAttributesModule } from '@ss/custom-attributes';

import { QRCodeModule } from 'angularx-qrcode';

@Component({
    selector: 'ss-agent-assets-list',
    templateUrl: './agent-assets-list.component.html',
    styleUrls: ['./agent-assets-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        CommonUiLangModule,

        UiPaginationModule,
        CommonUiConfirmationDialogModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        RouterModule,
        CustomAttributesModule,

        QRCodeModule
    ]})
export class AgentAssetsListComponent implements OnInit {
    agentId = 0;
    selected = 0;
    data: Asset[] = [];
    displayedColumns = [
            'reference',
            'description',
            'accountno',
            'acquisitionDate',
            'serviceDate',
            'acquisitionValue',
            'depreciationRate',
            'useful_life',
            'residualValue',
        ];

    constructor(private shellSrv: ShellService,
                private snackBarSrv: SnackBarService,
                private route: ActivatedRoute,
                private router: Router,
                private assetSrv: AssetsService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(param => {
            this.agentId = +param['agentId'] || 0;
            this.refresh();
        });
    }

    select(id: number) {
        this.selected = id || 0;
    }

    private refresh() {
        this.assetSrv
            .getAgentAssets(this.agentId)
            .subscribe(res => this.data = res);
    }

    sort(event: Sort) {
        this.assetSrv.sortColumn = event;
        this.refresh();
    }
}
