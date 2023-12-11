import { Component, inject, OnInit } from '@angular/core';
import {ShellService, SnackBarService} from "@ss/common/ui-shell";
import {AgentLookupModel, AgentService} from "@ss/logistics/api-agent";
import { ReactiveFormsModule, UntypedFormControl } from "@angular/forms";
import {FlatTreeControl} from "@angular/cdk/tree";
import {MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {map, Observable, of, switchMap} from "rxjs";
import { LanguageService, MaterialModule } from "@ss/common/api-common";
import {Accounting, Debt, Payment} from "@ss/logistics/api-common";
import {ActivatedRoute} from "@angular/router";
import { CommonModule } from "@angular/common";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonUiLangModule } from "@ss/common/ui-lang";
import { UiPaginationModule } from "@ss/common/ui-pagination";
import { CommonUiAutoCompleteModule } from "@ss/common/ui-auto-complete";
import { CommonUiDatepickerModule } from "@ss/common/ui-datepicker";
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import {PaginationModel} from '@ss/common/api-common';

interface FlatPaymentNode {
    expandable: boolean;
    description: string;
    amount: number;
    paidAmount: number;
    level: number;
    id: number;
    docId?: number;
}


interface PaymentTree {
    description: string;
    amount: number;
    children?: PaymentTree[];
    id?: number;
}

@Component({
    selector: 'ss-payment-compensation',
    templateUrl: './payment-compensation.component.html',
    styleUrls: ['./payment-compensation.component.scss'],
    standalone: true,
    imports: [CommonModule,
        DragDropModule,
        MaterialModule,
        CommonUiLangModule,
        UiPaginationModule,
        CommonUiAutoCompleteModule,
        CommonUiDatepickerModule,
        ReactiveFormsModule,
        CommonUiConfirmationDialogModule
    ],
})
export class PaymentCompensationComponent implements OnInit {
    private shellSrv  = inject( ShellService);
    private agentSrv  = inject( AgentService);
    private snackBarSrv  = inject( SnackBarService);
    private route  = inject( ActivatedRoute);
    private langSrv  = inject( LanguageService);

    private AGENT    = 'COMMON_AGENT';
    private CUSTOMER = 'LOGISTICS_CUSTOMER';
    private SUPPLIER = 'LOGISTICS_SUPPLIER';

    public partner = this.AGENT;
    public pagination = PaginationModel.newInstance();
    debts: Debt[] = [];
    selectedPayment: FlatPaymentNode = null;
    selectedDebt: Debt = null;
    agentAutoCompleteModel = new AgentLookupModel(this.agentSrv);
    agent = new UntypedFormControl();
    date = new UntypedFormControl(new Date())

    treeControl = new FlatTreeControl<FlatPaymentNode>(node => node.level, node => node.expandable);

    treeFlattener = new MatTreeFlattener<PaymentTree, FlatPaymentNode, FlatPaymentNode>(
        (node: PaymentTree, level: number) => {
            return {
                expandable: !!node.children && node.children.length > 0,
                description: node.description,
                level: level,
                amount: node.amount,
                paidAmount: node.children && node.children.length > 0?
                            node.children.map(e => e.amount).reduce((a, b) => a + b): 0.0,
                id: node.id
            };
        },
        node => node.level,
        node => node.expandable,
        node => node.children);

    dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    hasChild = (_: number, node: FlatPaymentNode) => node.expandable;
    firstNode = (node: FlatPaymentNode) => node && this.dataSource.data[0].id === node?.id;
    constructor() {
        this.agentAutoCompleteModel.onValueChanged = value => this.onAgentChange(value);
        this.pagination.onChange = () => this.onAgentChange(this.agentAutoCompleteModel.cache?.id);
        this.pagination.pageSize = 50;
    }

    ngOnInit() {
        this.shellSrv.setTitle('LOGISTICS_PAYMENT_COMPENSATION');
        this.shellSrv.setGoBackPathByRelativeUrl('..');
        this.route.data.subscribe(data => {
            if (data['agents']) {
                const name = data['agents'];
                this.agentSrv.setURL(name);
                this.partner = (name === '/customers')? this.CUSTOMER :
                               (name === '/suppliers')? this.SUPPLIER : this.AGENT;
            }
        });
    }

    private paymentToTree(res: Payment[]): PaymentTree[] {
        return res.map(e => {
            const acc: PaymentTree = {
                description: e.description,
                amount: e.amount,
                id: e.id
            };
            return acc;
        });
    }

    private updatePaymentTree(next: Accounting[], ret: PaymentTree[]) {
        ret.forEach(ent => {
            ent.children = next.filter(r => r.checkInfo === ent.id)
                .map(e => {
                    return {
                        description: e.description,
                        amount: e.balance,
                        children: null,
                        id: e.id
                    };
                })
        });
    }

    private dataObs(id: number | string): Observable<PaymentTree[]> {
        return this.agentSrv
            .getDebts(+id)
            .pipe(switchMap(res => {
                    this.debts = res;
                    return this.agentSrv.getPayments(+id, this.pagination.page - 1, this.pagination.pageSize)}),
                switchMap(res => {
                    this.pagination.elementCount = res.itemCount;
                    const ret = this.paymentToTree(res.body);
                    return this.agentSrv
                        .getCompensations(+id, res.body.map(e => e.id).join(','))
                        .pipe(map(next => {
                            this.updatePaymentTree(next, ret);
                            return ret;
                        }));
                }));
    }

    onAgentChange(id: number | string) {
        this.dataSource.data = [];
        this.dataObs(id || 0)
          .subscribe(res => this.dataSource.data = res);
    }

    selectPayment(node: FlatPaymentNode) {
        this.selectedPayment = node;
    }

    selectDebt(debt: Debt) {
        this.selectedDebt = debt;
    }

    makePayment() {
        if (this.selectedPayment && this.selectedDebt && this.selectedDebt.id) {
            const date = this.date.value || new Date();
            this.agentSrv
                .makePayment(this.selectedPayment?.id, this.selectedDebt?.id, this.langSrv.formatDate(date), this.selectedDebt.balance)
                .pipe(switchMap(res => {
                    if (res.id > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        this.selectedPayment = null;
                        this.selectedDebt = null;
                        return this.dataObs(this.agentAutoCompleteModel.cache?.id)
                    } else {
                        this.snackBarSrv.showFailureMessage();
                        this.selectedPayment = null;
                        return of(this.dataSource.data);
                    }
                }))
                .subscribe(res => this.dataSource.data = res);
        }
    }

    cancelPayments() {
        if (this.selectedPayment && this.selectedPayment?.id && this.selectedPayment.level > 0) {
            this.agentSrv
                .cancelPayment(this.selectedPayment?.id)
                .pipe(switchMap(res => {
                    if (res.count > 0) {
                        this.snackBarSrv.showSuccessMessage();
                        this.selectedPayment = null;
                        this.selectedDebt = null;
                        return this.dataObs(this.agentAutoCompleteModel.cache?.id)
                    } else {
                        this.snackBarSrv.showFailureMessage();
                        return of(this.dataSource.data);
                    }
                }))
                .subscribe(res => this.dataSource.data = res);
        }
    }

    // paymentDropped(data: CdkDragDrop<Payment>) {
    //     const elem = document.elementFromPoint(data.dropPoint.x, data.dropPoint.y);
    //     console.log('paym', elem.getAttribute('id'), data.dropPoint);
    // }
    //
    // debtDropped(data: CdkDragDrop<Debt>) {
    //     const elem = document.elementFromPoint(data.dropPoint.x, data.dropPoint.y);
    //     console.log('debt', elem.getAttribute('id'), data.dropPoint);
    // }

    onDebtDrop(event: DragEvent, paymentId: number) {
        event.preventDefault();
        const debtId = +event.dataTransfer.getData("text");
        const debt = this.debts.find(d => d.id === debtId);
        this.selectedDebt = debt;
        this.selectedPayment = this.treeControl.dataNodes.find(n => n.id === paymentId);
        if (this.selectedPayment.level == 0) {
            this.makePayment();
        }
    }

    onPaymentDrop(event: DragEvent) {
        event.preventDefault();
        const id = +event.dataTransfer.getData("text");
        this.selectedPayment = this.treeControl.dataNodes.find(n => n.id === id);
        this.cancelPayments();
        // console.log('drop payment: ', id);
    }

    onOver(event: DragEvent) {
        event.preventDefault();
    }

    onOverChild(event: DragEvent, id: number) {
        this.selectedPayment = null;
        const pymnt = this.treeControl.dataNodes.find(n => n.id === id);
        const payAmount = pymnt?.amount || 0.0;
        const debt = this.selectedDebt?.balance || 0.0;
        if ((pymnt && pymnt.level === 0)) {
            event.preventDefault();
        }
    }

    onStart(event: DragEvent, id: string) {
        event.dataTransfer.setData("text", id);
    }
}
