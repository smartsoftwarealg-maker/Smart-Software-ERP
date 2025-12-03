import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {
    AppArchiveMainComponent,
    AppArchiveService,
    GENERIC_ARCHIVES,
} from '@ss/common/app-archive';
import { ActivatedRoute } from '@angular/router';
import { ShellService } from '@ss/common/ui-shell';

@Component({
    selector: 'ss-generic-archive',
    imports: [AppArchiveMainComponent],
    templateUrl: './app-generic-archive.component.html',
    styleUrl: './app-generic-archive.component.scss',
    standalone: true,
})
export class AppGenericArchiveComponent implements OnInit {
    public archiveSrv = inject(AppArchiveService);
    private shellSrv = inject(ShellService);
    private route = inject(ActivatedRoute);

    ngOnInit() {
        this.shellSrv.setTitle('COMMON_GENERIC_ARCHIVE');
        this.shellSrv.setGoBackPath('..', this.route);
        this.archiveSrv.appId = GENERIC_ARCHIVES;
        this.archiveSrv.setParentId(14);
    }

    protected readonly GENERIC_ARCHIVES = GENERIC_ARCHIVES;
}
