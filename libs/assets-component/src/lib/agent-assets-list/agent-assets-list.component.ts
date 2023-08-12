import {Component, OnInit} from '@angular/core';
import {Asset} from '../assets-api';
import {ShellService, SnackBarService} from '@ss/common/ui-shell';
import {ActivatedRoute, Router} from '@angular/router';
import {AssetsService} from '../services/assets.service';
import {Sort} from '@angular/material/sort';

@Component({
    selector: 'ss-agent-assets-list',
    templateUrl: './agent-assets-list.component.html',
    styleUrls: ['./agent-assets-list.component.scss'],
})
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
