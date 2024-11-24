import { Component } from '@angular/core';
import { VCenterDirective } from '../../common/v-center.directive';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'ss-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.scss'],
    standalone: true,
    imports: [VCenterDirective, MatProgressSpinner]
})
export class LoadingSpinnerComponent {

    constructor() {
    }

}
