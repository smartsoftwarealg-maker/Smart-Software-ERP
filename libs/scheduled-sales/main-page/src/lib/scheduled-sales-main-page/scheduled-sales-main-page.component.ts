import { Component, inject } from '@angular/core';

import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

import { RouterLink, RouterOutlet } from '@angular/router';
import { LanguageService } from '@ss/common/api-common';

@Component({
    selector: 'ss-scheduled-sales-main-page',
    standalone: true,
    imports: [MatCard, MatCardContent],
    templateUrl: './scheduled-sales-main-page.component.html',
    styleUrl: './scheduled-sales-main-page.component.scss',
})
export class ScheduledSalesMainPageComponent {
}
