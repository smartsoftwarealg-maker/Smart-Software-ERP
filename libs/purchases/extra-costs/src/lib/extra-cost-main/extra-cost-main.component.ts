import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'ss-extra-cost-main',
    templateUrl: './extra-cost-main.component.html',
    styleUrls: ['./extra-cost-main.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterOutlet],
})
export class ExtraCostMainComponent {}
