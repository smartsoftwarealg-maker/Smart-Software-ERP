import { Component, OnInit } from '@angular/core';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import {map, Observable, of, zip} from 'rxjs';
import {Data, LTMLine, LTMLineMatter, LTMMatterTest, LTMTesting} from '../ltm-api';
import {FormControl} from '@angular/forms';
import {LtmLineService} from '../ltm-line.service';
import {LtmLineMatterService} from '../ltm-line-matter.service';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {Chart, ChartItem, registerables} from 'chart.js';
import {LtmTestingService} from '../ltm-testing.service';
import {ChartConfiguration} from 'chart.js/dist/types';
import {LtmMatterTestService} from '../ltm-matter-test.service';
import {LanguageService} from '@ss/common/api-common';

@Component({
    selector: 'ss-ltm-report',
    templateUrl: './ltm-report.component.html',
    styleUrls: ['./ltm-report.component.scss'],
})
export class LtmReportComponent implements OnInit {
    private chartList: Chart[] = null;
    anomaly = new FormControl<boolean>(false);
    selectedMatter: LTMLineMatter = null;
    matters$: Observable<LTMLineMatter[]> = of([]);
    lines$: Observable<LTMLine[]> = null;

    charts: string[] = [];

    lineCtrl = new FormControl<number>(0);
    from     = new FormControl<Date>(new Date());
    to       = new FormControl<Date>(new Date());

    constructor(private shellSrv:   ShellService,
                private lineSrv:    LtmLineService,
                private matterSrv:  LtmLineMatterService,
                private testingSrv: LtmTestingService,
                private testSrv:    LtmMatterTestService,
                private langSrv:    LanguageService,
                private route:      ActivatedRoute) {
        Chart.register(...registerables);
    }

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
        this.testSrv.setParentId(m?.matterId);
        if (m) {
            zip(this.testSrv.getList(0, 100),
                this.testingSrv.getData(m?.parentId, m?.matterId, this.anomaly.value, this.from.value, this.to.value))
                .subscribe(res => {
                    const tests = res[0].body;
                    const data = res[1];
                    this.buildCharts(data, tests);
                });
        }
    }

    onLine() {
        this.selectedMatter = null;
    }
    private buildCharts(data: Data[], tests: LTMMatterTest[]) {
        this.charts = data
            .map(e => e.description)
            .filter((value, index, array) => value != null && array.indexOf(value) === index);
        setTimeout(()=> this.onCanvas(data, tests), 1000);
    }

    onCanvas(data: Data[], tests: LTMMatterTest[]) {
        this.chartList?.forEach(c => c?.destroy());
        this.chartList = this.charts
            .map(c => {
                const ctx = <ChartItem>document.getElementById(c);
                const test = data.filter(t => t.description === c);
                if (test.length > 0) {
                    const data = this.chartData(test);
                    return new Chart(ctx, data);
                } else {
                    return null;
                }
            });
    }

    private chartData(data: Data[]): ChartConfiguration {
        return {
            type: 'line' ,
            data: {
                labels: data.map(_ => _.key),
                datasets: [
                    {
                        label: this.langSrv.translate('LTM_LOW'),
                        data: data.map(_ => _.minValue),
                        backgroundColor: ['blue'],
                        borderColor: ['blue']
                    },
                    {
                        label: data[0].description,
                        data: data.map(e => e.value),
                        backgroundColor: ['green'],
                        borderColor: ['green']
                    },
                    {
                        label: this.langSrv.translate('LTM_HIGH'),
                        data: data.map(_ => _.maxValue),
                        backgroundColor: ['red'],
                        borderColor: ['red']
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        labels: {
                            color: 'white',
                            boxHeight: 18,
                        },
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 45
                        }

                    }
                }
            }
        };
    }
}
