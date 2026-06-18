import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'ss-driver-license-main',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './driver-license-main.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./driver-license-main.component.css']
})
export class DriverLicenseMainComponent {}
