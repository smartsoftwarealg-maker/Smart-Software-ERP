import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'ss-driver-license-main',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './driver-license-main.component.html',
    styleUrls: ['./driver-license-main.component.css']
})
export class DriverLicenseMainComponent {}
