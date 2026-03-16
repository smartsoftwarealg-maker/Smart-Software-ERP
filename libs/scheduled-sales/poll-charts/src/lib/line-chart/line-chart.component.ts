import {
    Component,
    inject,
    input,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    effect,
} from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { LanguageService } from '@ss/common/api-common';
import { AnswersHistoricCount } from '@ss/scheduleds-sales/poll-charts';
import { SATISFACTION, YES_NO, COLORS } from '../common';

@Component({
    selector: 'ss-question-line-chart',
    standalone: true,
    imports: [],
    templateUrl: './line-chart.component.html',
    styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnInit, OnDestroy {
    @ViewChild('lineCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    private chart?: Chart;
    private COLORS = COLORS;
    private langSrv = inject(LanguageService);
    private yesNo = YES_NO;
    private satis = SATISFACTION;

    type = input<'satisfaction' | 'boolean'>();
    data = input<AnswersHistoricCount>();
    index = input<number>();

    constructor() {
        effect(() => {
            const chartData = this.data();
            // Only attempt to render if we have data and the canvas exists
            if (chartData && chartData.question) {
                // The timeout ensures the DOM is ready for the @for loop
                setTimeout(() => this.renderChart(), 0);
            }
        });
    }

    ngOnInit(): void {
        Chart.register(...registerables);
    }

    private renderChart() {
        if (!this.canvasRef) return;

        if (this.chart) {
            this.chart.destroy();
        }

        const ctx = this.canvasRef.nativeElement;
        const config =
            this.type() === 'satisfaction'
                ? this.getSatisfactionConfig()
                : this.getBoolConfig();

        this.chart = new Chart(ctx, config);
    }

    private getSatisfactionConfig(): ChartConfiguration {
        const d = this.data()!;
        return {
            type: 'line',
            data: {
                labels: d.years,
                datasets: [
                    {
                        label: this.langSrv.translate(this.satis[0]),
                        data: d.verySatisfied,
                        backgroundColor: this.COLORS[0],
                        borderColor: this.COLORS[0],
                    },
                    {
                        label: this.langSrv.translate(this.satis[1]),
                        data: d.satisfied,
                        backgroundColor: this.COLORS[1],
                        borderColor: this.COLORS[1],
                    },
                    {
                        label: this.langSrv.translate(this.satis[2]),
                        data: d.unSatisfied,
                        backgroundColor: this.COLORS[2],
                        borderColor: this.COLORS[2],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { ticks: { autoSkip: true } },
                },
                plugins: {
                    legend: { position: 'bottom' },
                    title: {
                        display: true,
                        text: d.question,
                        font: { weight: 'bold', size: 14 },
                        position: 'bottom',
                        fullSize: true,
                    },
                },
            },
        };
    }

    private getBoolConfig(): ChartConfiguration {
        const d = this.data()!;
        return {
            type: 'line',
            data: {
                labels: d.years,
                datasets: [
                    {
                        label: this.langSrv.translate(this.yesNo[0]),
                        data: d.yes,
                        backgroundColor: this.COLORS[3],
                        borderColor: this.COLORS[3],
                    },
                    {
                        label: this.langSrv.translate(this.yesNo[1]),
                        data: d.no,
                        backgroundColor: this.COLORS[4],
                        borderColor: this.COLORS[4],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    title: {
                        display: true,
                        text: d.question,
                        font: { weight: 'bold', size: 14 },
                        position: 'bottom',
                        fullSize: true,
                    },
                },
            },
        };
    }

    ngOnDestroy(): void {
        if (this.chart) {
            this.chart.destroy();
        }
    }
}
