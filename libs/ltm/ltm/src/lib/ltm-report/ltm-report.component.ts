import { Component, OnDestroy, OnInit } from '@angular/core';
import {ShellService} from '@ss/common/ui-shell';
import {ActivatedRoute} from '@angular/router';
import { filter, map, Observable, of, Subscription } from "rxjs";
import {Data, LTMLineMatter} from '../ltm-api';
import {FormControl} from '@angular/forms';
import {LtmLineService} from '../services/ltm-line.service';
import {LtmLineMatterService} from '../services/ltm-line-matter.service';
import {Chart, ChartItem, registerables} from 'chart.js';
import {LtmTestingService} from '../services/ltm-testing.service';
import {ChartConfiguration} from 'chart.js/dist/types';
import {LtmMatterTestService} from '../services/ltm-matter-test.service';
import {LanguageService} from '@ss/common/api-common';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
    selector: 'ss-ltm-report',
    templateUrl: './ltm-report.component.html',
    styleUrls: ['./ltm-report.component.scss'],
})
export class LtmReportComponent implements OnInit, OnDestroy {
    private subscription: Subscription = null;
    private chartList: Chart[] = null;
    private _matters$: Observable<LTMLineMatter[]> = of([]);
    processing = false;
    anomaly = new FormControl<boolean>(false);
    searchText = new FormControl<string>({ value: '', disabled: this.processing });
    selectedMatter: LTMLineMatter = null;
    charts: string[] = [];
    matters$ = this._matters$;
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
        this.shellSrv.setTitle(this.langSrv.translate('COMMON_CHARTS'));
        this._matters$ = this.matterSrv.getList(0, 50).pipe(map(res => res.body));
        this.matters$ = this._matters$;
        this.subscription = this.searchText
            .valueChanges
            .pipe(
                debounceTime(300),
                filter(() => !this.processing),
                distinctUntilChanged()
            ).subscribe(res => this.matters$ = this._matters$
                .pipe(map(e => e.filter(d => !res || d.description?.toLowerCase().indexOf(res.toLowerCase()) >= 0))));
    }

    onMatter(m: LTMLineMatter) {
        this.selectedMatter = m;
        this.testingSrv.setParentId(m?.centerId);
        this.testSrv.setParentId(m?.matterId);
        if (m) {
            this.processing = true;
            this.testSrv.setParentId(m?.id);
            this.testingSrv.getData(m?.matterId, this.anomaly.value, this.from.value, this.to.value)
                .subscribe({
                    next: res => {
                        this.buildCharts(res);
                    }, error: err => {
                        this.processing = false;
                        throw err;
                    }
                });
        }
    }

    onLine() {
        this.selectedMatter = null;
    }

    private buildCharts(data: Data[]) {
        this.charts = data
            .map(e => e.description)
            .filter((value, index, array) => value != null && array.indexOf(value) === index);
        setTimeout(() => this.onCanvas(data), 1000);
    }

    onCanvas(data: Data[]) {
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
        this.processing = false;
    }

    private getTitle() {
        const now  = new Date();
        const from = Date.parse((this.from.value || now).toString());
        const to   = Date.parse((this.to.value || now).toString());
        const days = (to - from) / (1000 * 60 * 60 * 72);
        const msg = days < 4? 'HOURS': days < 32? 'DAYS' : 'MONTHS';
        return this.langSrv.translate('COMMON_' + msg);
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
                        title: {
                            display: true,
                            text: this.getTitle()
                        },
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


    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }
}
