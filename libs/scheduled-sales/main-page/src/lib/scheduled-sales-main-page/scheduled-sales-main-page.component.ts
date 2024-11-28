import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

import { RouterLink, RouterOutlet } from '@angular/router';
import { LanguageService } from '@ss/common/api-common';

@Component({
    selector: 'ss-scheduled-sales-main-page',
    standalone: true,
    imports: [CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatButton,  MatCardFooter, RouterOutlet, RouterLink],
    templateUrl: './scheduled-sales-main-page.component.html',
    styleUrl: './scheduled-sales-main-page.component.scss',
})
export class ScheduledSalesMainPageComponent {
    languageSrv = inject(LanguageService);
}
