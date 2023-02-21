import { Component, OnInit } from '@angular/core';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {map, Observable, of} from 'rxjs';
import {LTMLine, LTMLineMatter, LTMTesting} from '../ltm-api';
import {FormControl} from '@angular/forms';
import {LtmLineService} from '../ltm-line.service';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Chart, ChartItem, ChartType, LineController} from 'chart.js';
import {LtmTestingService} from '../ltm-testing.service';
import {ChartConfiguration} from 'chart.js/dist/types';

@Component({
    selector: 'ss-ltm-report',
    templateUrl: './ltm-report.component.html',
    styleUrls: ['./ltm-report.component.scss'],
})
export class LtmReportComponent implements OnInit {
    selectedMatter: LTMLineMatter = null;
    matters$: Observable<LTMLineMatter[]> = of([]);
    lines$: Observable<LTMLine[]> = null;

    charts: string[] = [];

    lineCtrl = new FormControl<number>(0);
    from     = new FormControl<Date>(new Date());
    to       = new FormControl<Date>(new Date());

    constructor(private shellSrv: ShellService,
                private lineSrv: LtmLineService,
                private matterSrv: LtmLineMatterService,
                private testingSrv: LtmTestingService,
                private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.shellSrv.setGoBackPath('..', this.route);
        this.lines$ = this.lineSrv
            .getList(0, 50)
            .pipe(map(_ => _.body));

        this.lineCtrl
            .valueChanges
            .pipe(
                debounceTime(300),
                distinctUntilChanged())
            .subscribe(v => {
                this.matterSrv.setParentId(v || 0);
                this.matters$ = this.matterSrv.getList(0, 50).pipe(map(res => res.body));
            })
    }

    onMatter(m: LTMLineMatter) {
        this.selectedMatter = m;
        this.testingSrv.setParentId(m?.parentId);
        this.testingSrv
            .getList(0, 10000)
            .pipe(map(res => res.body.filter(e => e.matterId === m?.id && e.test !== null)))
            .subscribe(res => this.buildCharts(res));
    }

    private buildCharts(tests: LTMTesting[]) {
        this.charts = tests
            .map(e => e.test)
            .filter((value, index, array) => value != null && array.indexOf(value) === index);
        setTimeout(()=> this.onCanvas(tests), 1000);
    }

    onCanvas(tests: LTMTesting[]) {
        this.charts
            .forEach(c => {
                const ctx = <ChartItem>document.getElementById(c);
                const test = tests.filter(t => t.test === c);
                if (test.length > 0) {
                    const data = this.chartData(test);
                    new Chart(ctx, data);
                    console.log(test, data);
                }
            });
    }

    private chartData(tests: LTMTesting[]): ChartConfiguration {
        return {
            type: <ChartType>'line' ,
            data: {
                labels: tests.map(_ => _.timeStamp),
                datasets: [
                    {
                        label: tests[0].test,
                        data: tests.map(_ => _.value)
                    }
                ]
            }
        };
    }
}
