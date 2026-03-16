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
import { AnswersCount } from '@ss/scheduleds-sales/poll-charts';
import { SATISFACTION, YES_NO, COLORS } from '../common';

@Component({
    selector: 'ss-question-pie-chart',
    standalone: true,
    imports: [],
    templateUrl: './pie-chart.component.html',
    styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements OnInit, OnDestroy {
    @ViewChild('pieCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

    private chart?: Chart;
    private COLORS = COLORS;
    private langSrv = inject(LanguageService);
    private yesNo = YES_NO;
    private satis = SATISFACTION;

    type = input<'satisfaction' | 'boolean'>();
    data = input<AnswersCount>(null);
    index = input<number>(0);

    constructor() {
        effect(() => {
            const chartData = this.data();
            // Added check to ensure data exists before trying to render
            if (chartData && chartData.question) {
                // Small delay to ensure the @for loop has finished rendering the canvas
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
            type: 'pie',
            data: {
                labels: [
                    this.langSrv.translate(this.satis[0]) +
                        ' : ' +
                        d.verySatisfied,
                    this.langSrv.translate(this.satis[1]) + ' : ' + d.satisfied,
                    this.langSrv.translate(this.satis[2]) +
                        ' : ' +
                        d.unSatisfied,
                ],
                datasets: [
                    {
                        label: d.question,
                        data: [d.verySatisfied, d.satisfied, d.unSatisfied],
                        backgroundColor: [
                            this.COLORS[0],
                            this.COLORS[1],
                            this.COLORS[2],
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Helps with fitting inside mat-card
                plugins: {
                    legend: { position: 'bottom' },
                    title: {
                        display: true,
                        text: d.question,
                        font: { weight: 'bold', size: 14 },
                        position: 'bottom',
                    },
                },
            },
        };
    }

    private getBoolConfig(): ChartConfiguration {
        const d = this.data()!;
        return {
            type: 'pie',
            data: {
                labels: [
                    this.langSrv.translate(this.yesNo[0]) + ' : ' + d.yes,
                    this.langSrv.translate(this.yesNo[1]) + ' : ' + d.no,
                ],
                datasets: [
                    {
                        label: this.langSrv.translate(d.question),
                        data: [d.yes, d.no],
                        backgroundColor: [this.COLORS[3], this.COLORS[4]],
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
                    },
                },
            },
        };
    }

    ngOnDestroy(): void {
        this.chart?.destroy();
    }
}
