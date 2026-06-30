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
        console.log('_______________________________________id', id);
    }
}
