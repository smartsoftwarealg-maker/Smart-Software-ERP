import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppArchiveMainComponent, CMMS_ROUTING_ARCHIVES } from '@ss/common/app-archive';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ss-rounting-archive',
    standalone: true,
    imports: [CommonModule, AppArchiveMainComponent],
    templateUrl: './cmms-routing-archive.component.html',
    styleUrls: ['./cmms-routing-archive.component.css'],
})
export class CMMSRoutingArchiveComponent implements OnInit {
    private router = inject(ActivatedRoute);

    protected readonly CMMS_ROUTING_ARCHIVES = CMMS_ROUTING_ARCHIVES;
    id = 0;

    ngOnInit() {
        this.router
            .parent
            .paramMap
            .subscribe(map => this.id = +map.get('id') || 0);
    }
}
