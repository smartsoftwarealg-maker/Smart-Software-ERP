import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    inject,
    Input,
    OnChanges,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentService } from '@ss/logistics/api-agent';
import { SnackBarService } from '@ss/common/ui-shell';
import { MaterialModule, dateToYmdStr } from '@ss/common/api-common';
import { Accounting, Debt } from '@ss/logistics/api-common';
import { TranslateDirective, TranslatePipe} from '@ss/common/ui-lang';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { NumberInputDialogComponent } from '../number-input-dialog/number-input-dialog.component';
import {of, switchMap, tap} from "rxjs"; // Import the new dialog component

@Component({
    selector: 'ss-compensation-panel',
    templateUrl: './compensation-panel.component.html',
    styleUrls: ['./compensation-panel.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MaterialModule, TranslateDirective, TranslatePipe]
})
export class CompensationPanelComponent implements OnChanges {
    private agentSrv = inject(AgentService);
    private snackBarSrv = inject(SnackBarService);
    private cdr = inject(ChangeDetectorRef);
    private dialog = inject(MatDialog); // Inject MatDialog

    @Input() paymentId: number;
    @Input() agentId: number;
    loaded = signal(false)

    compensations: Accounting[] = [];
    debts: Debt[] = [];
    checkedCompensationIds = new Set<number>();

    ngOnChanges() {
        if (this.paymentId > 0 && this.agentId > 0) {
            this.load();
        }
    }

    private load() {
        this.loaded.set(false)
        this.agentSrv.getDebts(this.agentId).subscribe(res => {
            this.debts = res.map(d => ({...d, document: d.document.substring(d.document.indexOf(', ') + 1)}));
            this.cdr.markForCheck();
            this.loaded.set(true)
        });
        this.agentSrv.getCompensations(this.agentId, this.paymentId.toString()).subscribe(res => {
            this.compensations = res.filter(c => c.checkInfo === this.paymentId);
            this.checkedCompensationIds = new Set(this.compensations.map(c => c.id));
            this.cdr.markForCheck();
        });
    }

    onDebtCheck(debtId: number) {
        const debt = this.debts.find(d => d.id === debtId);
        if (!debt) return;
        this.agentSrv
            .makePayment(this.paymentId, debt.id, dateToYmdStr(new Date()), debt.balance)
            .subscribe(res => {
                if (res.id > 0) this.snackBarSrv.showSuccessMessage();
                else this.snackBarSrv.showFailureMessage();
                this.load();
            });
    }

    onCompensationCheck(compensationId: number) {
        this.agentSrv
            .cancelPayment(compensationId)
            .subscribe(res => {
                if (res.count > 0) this.snackBarSrv.showSuccessMessage();
                else this.snackBarSrv.showFailureMessage();
                this.load();
            });
    }

    edit(id: number) {
        this.openNumberInputDialog(id);
    }

    openNumberInputDialog(compensationId: number): void {
        const compensation = this.compensations.find(c => c.id === compensationId);
        const initialValue = compensation ? compensation.balance : 0;

        const dialogRef = this.dialog.open(NumberInputDialogComponent, {
            width: '300px',
            data: {
                title: 'COMMON_AMOUNT', // You'll need to add this key to your i18n files
                label: 'COMMON_AMOUNT',
                initialValue: initialValue,
                minValue: 0.01 // Example: minimum amount
            }
        });

        dialogRef.afterClosed()
            .pipe(switchMap(res => typeof res === 'number'?
                this.agentSrv.updatePayment(compensationId, res).pipe(tap(() => this.compensations.find(c => c.id === compensationId)!.balance = res)) :
                of({ count: 0}))) // Update the payment if a number is returned
            .subscribe(result => {
                if (result.count > 0) {
                    this.snackBarSrv.showSuccessMessage();
                    this.cdr.markForCheck();
                }
            });
    }
}
