import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'ss-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    imports: [MatProgressSpinner],
    styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
