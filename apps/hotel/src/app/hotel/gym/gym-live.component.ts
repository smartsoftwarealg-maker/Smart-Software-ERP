import { Component, OnDestroy, OnInit } from '@angular/core';
import { GymService } from './gym-service';
import { Service } from '../hotel-api';
import { ymdToDmy } from '../../common/util';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayableGymService, FullServiceDataSource, gymPendingUrl } from './gym-api';
import { Right } from '../../smart-lib/common/models';
import { UserService } from '../../smart-lib/components/login/user.service';
import { HttpService } from '../../smart-lib/common/http.service';

const payModeCash = 66;

@Component({
    selector: 'app-gym-live',
    templateUrl: './gym-live.component.html',
    styleUrls: ['./gym-live.component.scss']
})
export class GymLiveComponent implements OnInit, OnDestroy {

    public accessRight: Right;

    services: DisplayableGymService[] = null;
    filter: string;

    constructor(public gymSrv: GymService,
        public httpSrv: HttpService,
        public userSrv: UserService,
        public override router: Router,
        public activatedRoute: ActivatedRoute) {
        this.gymSrv.livePagination.pageSize = 50;
    }

    ngOnInit(): void {
        // entity: null
        this.accessRight = this.userSrv.getRights(null);
        this.gymSrv.livePagination.onChange = () => this.refresh();
        this.refresh();
    }

    ngOnDestroy(): void {
        this.gymSrv.livePagination.onChange = null;
    }

    refresh(): void {
        this.services = [];
        if (!this.accessRight.read) {
            return;
        }
        this.httpSrv.getData<Service>(
            gymPendingUrl,
            this.gymSrv.livePagination.page - 1,
            this.gymSrv.livePagination.pageSize,
            this.filter
        ).subscribe(lst => {
            this.services = lst.body.map(s => {
                const ds = {
                    id: s.id,
                    time: s.time,
                    agent: s.agent,
                    bookingId: s.bookingId,
                    payMethod: s.payMethod,
                    invoiceId: s.invoiceId,
                    centerId: s.centerId,
                    timeStr: ymdToDmy(s.time),
                    agentName: ''
                };
                this.gymSrv.getAgentName(s.agent)
                    .subscribe(name => ds.agentName = name);
                return ds;
            });
            this.gymSrv.livePagination.elementCount = lst.itemCount;
        });
    }

    public setFilter(filter: string): void {
        this.filter = filter;
        this.refresh();
    }

    onClick(service: any): void {
        if (!this.accessRight.edit) {
            return;
        }
        this.router.navigate(['' + service.id], {
            relativeTo: this.activatedRoute
        });
    }

    showAdd() {
        this.router.navigate(['0'], {
            relativeTo: this.activatedRoute
        });
    }

    goToList() {
        this.router.navigate(['list'], {
            relativeTo: this.activatedRoute
        });
    }

}
