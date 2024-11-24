import { Component } from '@angular/core';
import { VCenterDirective } from '../../common/v-center.directive';

@Component({
    selector: 'ss-fatal-error',
    templateUrl: './fatal-error.component.html',
    styleUrls: ['./fatal-error.component.scss'],
    standalone: true,
    imports: [VCenterDirective]
})
export class FatalErrorComponent {

    constructor() {
    }

}
