import { Component, ChangeDetectionStrategy } from '@angular/core';

import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'ss-driver-vehicles-main',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './driver-vehicles-main.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./driver-vehicles-main.component.css']
})
export class DriverVehiclesMainComponent {}
