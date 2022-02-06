import { Component, OnInit } from '@angular/core';
import { HttpService } from '@ss/common/api-common';
import { DIVISIONS_URL, Division, Service, Department, DEPARTMENTS_URL, SERVICES_URL } from '@ss/common/api-organizations';

interface ChartNode {
    name: string;
    type: string;
    children: ChartNode[];
}

@Component({
    selector: 'ss-organizations',
    styleUrls: ['./organizations.component.scss'],
    templateUrl: 'organizations.component.html'
})
export class OrganizationsComponent implements OnInit {

    constructor(private httpSrv: HttpService) { }

    root: ChartNode = {
        name: 'ROOT',
        type: '',
        children: []
    };


    ngOnInit() {
        const divisions = {};
        this.httpSrv.get<Division[]>(DIVISIONS_URL)
            .subscribe((divs: Division[]) => {
                this.root.children = divs.map(d => this.lookupToChartNode(d));
            });
        this.httpSrv.get<Department[]>(DEPARTMENTS_URL[0] + 0 + DEPARTMENTS_URL[1])
            .subscribe((ds: Department[]) => {
            });
        this.httpSrv.get<Service[]>(SERVICES_URL[0] + 0 + SERVICES_URL[1])
            .subscribe((services: any[]) => {
            });
    }

    lookupToChartNode(l: {description: string}): ChartNode {
        return {name: l.description, type: '', children: [] };
    }

}