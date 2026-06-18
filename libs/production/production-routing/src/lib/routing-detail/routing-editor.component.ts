import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Added MatDialog

import { Routing, RoutingOperation } from '../routing.model';
import { RoutingService } from '../routing.service';
import { OperationsListComponent } from './operations-list.component';
import { OperationDetailComponent } from './operation-detail.component';
import { RoutingHeaderModalComponent } from './routing-header-modal.component'; // Added

@Component({
    selector: 'app-routing-editor',
    standalone: true,
    imports: [
        CommonModule,
        OperationsListComponent,
        OperationDetailComponent,
        RoutingHeaderModalComponent // Added
    ],
    templateUrl: './routing-editor.component.html',
    styleUrls: ['./routing-editor.component.scss']
})
export class RoutingEditorComponent implements OnInit {
    private readonly service = inject(RoutingService);
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly dialog = inject(MatDialog); // Inject MatDialog

    routing = signal<Routing | null>(null);
    operations = signal<RoutingOperation[]>([]);
    selectedOpId = signal<string | null>(null);
    isLoading = signal(false);

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id') || 'RTG-001';
        this.loadData(id);
    }

    private loadData(id: string) {
        this.isLoading.set(true);
        Promise.all([
            this.service.getRouting(id).toPromise(),
            this.service.getOperations(id).toPromise()
        ]).then(([r, ops]) => {
            this.routing.set(r!);
            this.operations.set(ops!);
            if (ops && ops.length > 0) this.selectedOpId.set(ops[0].id);
        }).finally(() => this.isLoading.set(false));
    }

    selectOp(id: string) {
        this.selectedOpId.set(id);
    }

    // Open Edit Modal
    openEditModal() {
        const dialogRef = this.dialog.open(RoutingHeaderModalComponent, {
            width: '600px',
            maxWidth: '90vw',
            data: this.routing()
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.routing.set(result);
                // Show toast notification here in real app
            }
        });
    }

    // Open Create Modal (Navigates to new route in real app, but modal shown for demo)
    openNewModal() {
        const dialogRef = this.dialog.open(RoutingHeaderModalComponent, {
            width: '600px',
            maxWidth: '90vw',
            data: null // null indicates 'create' mode
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.router.navigate(['/routings', result.id]);
            }
        });
    }

    saveAll() {
        this.isLoading.set(true);
        setTimeout(() => {
            this.isLoading.set(false);
            alert('Routing and all operations saved successfully!');
        }, 800);
    }
}
