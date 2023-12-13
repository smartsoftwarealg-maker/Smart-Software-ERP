import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartService } from '../chart.service';
import { ShellService } from '@ss/common/ui-shell';
import { ActivatedRoute } from '@angular/router';
import { CommonUiDatepickerModule } from '@ss/common/ui-datepicker';
import { MaterialModule } from '@ss/common/api-common';
import { FormControl } from '@angular/forms';
import { CommonUiLangModule } from '@ss/common/ui-lang';

@Component({
    selector: 'ss-cmms-gantt',
    standalone: true,
    imports: [CommonModule, CommonUiDatepickerModule, MaterialModule, CommonUiLangModule],
    templateUrl: './cmms-gantt.component.html',
    styleUrls: ['./cmms-gantt.component.css'],
})
export class CmmsGanttComponent implements OnInit, AfterViewInit {
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);
    private chartSrv = inject(ChartService);

    dateFilter    = new FormControl<Date>(new Date());
    // data: (number|string|Date)[][] = [];

    options = {
        height: 800,
        gantt: {
            labelMaxWidth: 300,
            criticalPathEnabled: false,
            innerGridHorizLine: {
                stroke: '#ffe0b2',
                strokeWidth: 2
            },
            innerGridTrack: {fill: '#fff3e0'},
            innerGridDarkTrack: {fill: '#ffcc80'},
        }
    };

    // chartType = ChartType.Gantt;
    columns = [
        { type: 'string', role: 'Task ID' },
        { type: 'string', role: 'Task Name' },
        { type: 'string', role: 'Resource' },
        { type: 'date', role: 'Start Date' },
        { type: 'date', role: 'End Date' },
        { type: 'number', role: 'duration' },
        { type: 'number', role: 'Percent Complete' },
        { type: 'string', role: 'Dependencies' }
    ];

    ngOnInit() {
        this.shellSrv.setGoBackPath('..', this.route);
        this.refresh(this.dateFilter.value);
    }

    content: string;

    loaded = false;

    ngAfterViewInit(): void {
        setTimeout(() => {
            const chartComponent = document.querySelector('google-chart.google-chart');
            this.content = this.format(chartComponent?.innerHTML);
        }, 2500);
    }

    /**
     * Based on:
     * https://stackoverflow.com/a/60338028/2264081
     */
    format(html: string | undefined | null): string {
        if (!html) {
            return 'Nope.';
        }
        const tab = '\t';
        let result = '';
        let indent= '';

        html.split(/>\s*</).forEach(function(element) {
            if (element.match( /^\/\w/ )) {
                indent = indent.substring(tab.length);
            }

            result += indent + '<' + element + '>\r\n';

            if (element.match( /^<?\w[^>]*[^/]$/ ) && !element.startsWith('input')  ) {
                indent += tab;
            }
        });

        return result.substring(1, result.length-3);
    }

    refresh(date: Date) {
        // this.chartSrv
        //     .gantt(new Date(date))
        //     .subscribe(res => {
        //         this.data = res.map((g: Gantt) => [
        //             g.description.substring(0, 10),
        //             g.description,
        //             null,
        //             new Date(g.startDate || new Date()),
        //             null,
        //             Math.max(g.duration, 24) * 3600 * 1000,
        //             g.completed,
        //             null
        //         ]);
        //         this.loaded = res.length > 0;
        //     });
    }
}
