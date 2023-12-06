import {Component, HostBinding, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';
import {
    CItem, CKey,
    CLineDirectItem,
    CLineOHItem, CostCenter,
    CostingHttpService,
    CostingResult,
    CPool,
    CPoolDetail, CProduct,
    CProductLine,
    CProject,
    OH,
    ReportList,
    SafeDomObject,
    slideToRight
} from '@ss/costing/costing-utils';
import { CommonModule } from '@angular/common';
import { LanguageService, LoginService, MaterialModule } from '@ss/common/api-common';
import { CommonUiConfirmationDialogModule } from '@ss/common/ui-confirmation-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@ss/web-arch/ui';
import { CommonUiLangModule } from '@ss/common/ui-lang';

interface PoolDetail extends CPoolDetail {
    keyAcDescription: string;
}

interface Pool extends CPool {
    costCenterAcDescription: string;
    detailsList: { data: PoolDetail[], loaded: boolean, hidden: boolean };
}

interface LineOverhead extends CLineOHItem {
    keyAcDescription: string;
}

interface LineDirect extends CLineDirectItem {
    itemAcDescription: string;
}

interface ProductLine extends CProductLine {
    productAcDescription: string;
    overheadList: { data: LineOverhead[], loaded: boolean, hidden: boolean };
    directList: { data: LineDirect[], loaded: boolean, hidden: boolean };
    hidden: boolean; // this cat works like a list (cat refers to ProductLine)
}

interface Project extends CProject {
    overheadList: { data: OH[], loaded: boolean, hidden: boolean };
    productLineList: { data: ProductLine[], loaded: boolean, hidden: boolean };
    poolList: { data: Pool[], loaded: boolean, hidden: boolean };
}


@Component({
    selector: 'ss-costing-project-detail',
    templateUrl: './costing-project-detail.component.html',
    styleUrls: ['./costing-project-detail.component.scss'],
    animations: [slideToRight],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        CommonUiConfirmationDialogModule,
        CommonUiLangModule
    ]
})
export class CostingProjectDetailComponent implements OnInit, OnDestroy {
    @HostBinding('@routeAnimation') routeAnimation = true;

    resultTableColumns: string[] = ['product', 'cost', 'cost2', 'percent'];

    SIMPLE_REPORTS_FOLDER = 'Simple';
    ACTIVITY_REPORTS_FOLDER = 'Activite';
    STEP_DOWN_REPORTS_FOLDER = 'Cascade';

    OBJ_TYPE_LOADING = 0;
    OBJ_TYPE_PROJECT = 1000;

    OBJ_TYPE_OVERHEAD_LIST = 2000;
    OBJ_TYPE_OVERHEAD = 2100;

    OBJ_TYPE_PRODUCT_LINE_LIST = 3000;
    OBJ_TYPE_PRODUCT_LINE = 3100;

    OBJ_TYPE_PRODUCT_LINE_OH_LIST = 3110;
    OBJ_TYPE_PRODUCT_LINE_OH = 3111;

    OBJ_TYPE_PRODUCT_LINE_DIRECT_LIST = 3120;
    OBJ_TYPE_PRODUCT_LINE_DIRECT = 3121;

    OBJ_TYPE_POOL_LIST = 4000;
    OBJ_TYPE_POOL = 4100;
    OBJ_TYPE_POOL_DETAIL = 4110;

    //
    OBJ_TYPE_RESULT_SIMPLE = 5000;
    OBJ_TYPE_RESULT_STEP_DOWN = 5001;
    OBJ_TYPE_RESULT_ACTIVITY = 5002;

    //
    project: Project = null;
    //
    activeObject: any;
    activeObjectType = this.OBJ_TYPE_LOADING;
    activeObjectIndex: number; // if the object is in an array
    activeObjectIndex2: number; // if the object is in an array in an array

    readOnly = false;
    //
    simpleKeyId: number = null;
    result: CostingResult[];
    //
    REPORT_TYPE_HTML = 1;
    REPORT_TYPE_PDF = 2;

    fullReportsList: ReportList[] = null;
    reportsList: ReportList;

    selectedReport = -1;
    reportParamActual = false;

    reportType = 0;
    reportObject: SafeDomObject = null;

    @ViewChild('form') form: FormGroup;

    constructor(private route: ActivatedRoute,
    private router: Router,
    private userSrv: LoginService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private languageSrv: LanguageService,
    public httpSrv: CostingHttpService) {}

    ngOnInit(): void {
        this.readOnly = this.route.snapshot.data['readOnly'];
        this.loadProject();
    }

    ngOnDestroy(): void {
        this.closeReport();
    }

    getId(): number {
        return +this.route.snapshot.params['id'];
    }

    isFormValid() {
        return this.form && this.form.valid;
    }

    // project

    public saveProject(): void {
        if (this.isFormValid()) {
            const obj: CProject = {
                id: this.project.id,
                to: this.project.to,
                centerId: this.project.centerId,
                from: this.project.from,
                description: this.project.description,
                code: this.project.code
            };
            const o = this.project.id ?
                this.httpSrv.updateProject(obj)
                : this.httpSrv.addProject(obj).pipe(map(id => this.project.id = +id));
            o.subscribe(() => {
                if (!this.getId()) {
                    this.router.navigate(['../' + this.project.id], {relativeTo: this.route});
                }
                this.showSavedMsg();
            });
        }
    }

    public onReloadProjectBtnClick(): void {
        if (this.wasObjectModified()) {
            this.confirm('CANCEL_EDIT', 'CONFIRM_CANCELLATION', () => {
                this.resetForm();
                this.loadProject();
            });
        } else {
            this.loadProject();
        }
    }

    public loadProject(onFinish?: () => void): void {
        this.project = {
            id: 0,
            code: null,
            description: null,
            from: null,
            to: null,
            centerId: this.userSrv.appCtx.center,
            overheadList: {
                data: [], loaded: false, hidden: true
            },
            productLineList: {
                data: [], loaded: false, hidden: true
            },
            poolList: {
                data: [], loaded: false, hidden: true
            }
        };
        const id = this.getId();
        if (id === 0) {
            this.project.productLineList.loaded = true;
            this.project.overheadList.loaded = true;
            this.project.poolList.loaded = true;
            this.activeObject = this.project;
            this.activeObjectType = this.OBJ_TYPE_PROJECT;
            this.activeObjectIndex = null;
            this.activeObjectIndex2 = null;
            this.resetForm();
            if (onFinish) {
                onFinish();
            }
        } else {
            this.httpSrv.getProjectById(id)
                .pipe(
                    tap<CProject>(r => {
                        this.project = {
                            id: r.id,
                            description: r.description,
                            code: r.code,
                            to: r.to,
                            from: r.from,
                            centerId: r.centerId,
                            productLineList: {data: [], loaded: false, hidden: true},
                            overheadList: {data: [], loaded: false, hidden: true},
                            poolList: {data: [], loaded: false, hidden: true}
                        };
                        this.activeObject = this.project;
                        this.activeObjectType = this.OBJ_TYPE_PROJECT;
                        this.activeObjectIndex = null;
                        this.activeObjectIndex2 = null;
                        this.resetForm();
                    }),
                    switchMap(() => this.httpSrv.listPools(this.project.id, 0, 50)),
                    tap<CPool[]>(pools => {
                        this.project.poolList.data.push(...pools.map(poo => this.cPoolToPool(poo)));
                        this.project.poolList.loaded = true;
                    }),
                    switchMap(() => this.httpSrv.listProductLines(this.project.id, 0, 50)),
                    tap<CProductLine[]>(plines => {
                        this.project.productLineList.data.push(...plines.map(pl => this.cProductLineToProductLine(pl)));
                        this.project.productLineList.loaded = true;
                    }),
                    switchMap(() => this.httpSrv.listOH(this.project.id, 0, 50))
                )
                .subscribe(oh => {
                    this.project.overheadList.data.push(...oh);
                    this.project.overheadList.loaded = true;
                    if (onFinish) {
                        onFinish();
                    }
                });

        }
    }

    // common utils

    public setActiveObject(obj: any, type: number, index?: number, index2?: number): void {
        if (type !== this.activeObjectType) {
            this.result = null; // to keep this shit up to date & shit
            //
            if (type === this.OBJ_TYPE_RESULT_STEP_DOWN) {
                this.filterReports(this.STEP_DOWN_REPORTS_FOLDER);
                this.getStepDownResult();
            } else if (type === this.OBJ_TYPE_RESULT_SIMPLE) {
                this.filterReports(this.SIMPLE_REPORTS_FOLDER);
                if (this.simpleKeyId) {
                    this.onSimpleKeyChanged({id: this.simpleKeyId, code: null, description: null});
                }
            } else if (type === this.OBJ_TYPE_RESULT_ACTIVITY) {
                this.filterReports(this.ACTIVITY_REPORTS_FOLDER);
                this.getActivityResult();
            }
        }
        if (this.wasObjectModified() || (this.activeObject != null && this.activeObject.id === 0)) {
            this.confirm('CANCEL_EDIT', 'CONFIRM_CANCELLATION', () => {
                this.resetForm();
                if (this.activeObject.id > 0) {
                    this.reloadThenSetActiveObject(obj, type, index, index2);
                } else {
                    if (this.activeObjectType === this.OBJ_TYPE_POOL) {
                        this.deletePool(true);
                    } else if (this.activeObjectType === this.OBJ_TYPE_POOL_DETAIL) {
                        this.deletePoolDetail(true);
                    } else if (this.activeObjectType === this.OBJ_TYPE_OVERHEAD) {
                        this.deleteOverhead(true);
                    } else if (this.activeObjectType === this.OBJ_TYPE_PRODUCT_LINE) {
                        this.deleteProductLine(true);
                    } else if (this.activeObjectType === this.OBJ_TYPE_PRODUCT_LINE_DIRECT) {
                        this.deleteProductionLineDirect(true);
                    } else if (this.activeObjectType === this.OBJ_TYPE_PRODUCT_LINE_OH) {
                        this.deleteProductionLineOverhead(true);
                    }
                    this.doSetActiveObject(obj, type, index, index2);
                }
            });
        } else {
            this.resetForm();
            this.doSetActiveObject(obj, type, index, index2);
        }
    }

    private reloadThenSetActiveObject(obj: any, type: number, index?: number, index2?: number): void {
        let func: (p: any) => void = null;
        switch (this.activeObjectType) {
        case this.OBJ_TYPE_PROJECT: {
            func = this.loadProject;
            break;
        }
        case this.OBJ_TYPE_OVERHEAD: {
            func = this.reloadOverhead;
            break;
        }
        case this.OBJ_TYPE_PRODUCT_LINE: {
            func = this.reloadProductLine;
            break;
        }
        case this.OBJ_TYPE_PRODUCT_LINE_DIRECT: {
            func = this.reloadProductionLineDirect;
            break;
        }
        case this.OBJ_TYPE_PRODUCT_LINE_OH: {
            func = this.reloadProductionLineOverhead;
            break;
        }
        case this.OBJ_TYPE_POOL: {
            func = this.reloadPool;
            break;
        }
        case this.OBJ_TYPE_POOL_DETAIL: {
            func = this.reloadPoolDetail;
            break;
        }
        }
        func = func.bind(this);
        func(() => this.doSetActiveObject(obj, type, index, index2));
    }

    private doSetActiveObject(obj: any, type: number, index?: number, index2?: number): void {
        // set shit
        this.activeObject = null;
        this.activeObjectType = null;
        this.activeObjectIndex = null;
        this.activeObjectIndex2 = null;
        // remove the form and create a new one!
        setTimeout(() => {
            this.activeObject = obj;
            this.activeObjectType = type;
            this.activeObjectIndex = index;
            this.activeObjectIndex2 = index2;
        });
        // open the tree
        if (type === this.OBJ_TYPE_OVERHEAD) {
            this.project.overheadList.hidden = false;
        } else if (this.OBJ_TYPE_PRODUCT_LINE <= type && type <= this.OBJ_TYPE_PRODUCT_LINE + 99) {
            this.project.productLineList.hidden = false;
            if (type === this.OBJ_TYPE_PRODUCT_LINE_DIRECT) {
                this.project.productLineList.data[index].directList.hidden = false;
            } else if (type === this.OBJ_TYPE_PRODUCT_LINE_OH) {
                this.project.productLineList.data[index].overheadList.hidden = false;
            }
        } else if (this.OBJ_TYPE_POOL <= type && type <= this.OBJ_TYPE_POOL + 99) {
            this.project.poolList.hidden = false;
            if (type === this.OBJ_TYPE_POOL_DETAIL) {
                this.project.poolList.data[index].detailsList.hidden = false;
            }
        }
    }

    private wasObjectModified(): boolean {
        return this.form && this.form.dirty;
        // if (this.form) {
        //     const controls = this.form.controls;
        //     for (const k in controls) {
        //         if (controls.hasOwnProperty(k)) {
        //             if (controls[k].dirty) {
        //                 return true;
        //             }
        //         }
        //     }
        // }
        // return false;
    }

    // view

    public confirm(title: string, msg: string, fn: () => void): void {
        const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {disableClose: true});
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = msg;
        dialogRef.afterClosed().subscribe(result => {
            if (result === 'yes') {
                fn();
            }
        });
    }

    public leave(): void {
        this.route.queryParams.subscribe(params => {
            const cmd = params['referer'];
            if (cmd) {
                this.router.navigate([cmd]);
            } else {
                this.router.navigate(['../'], {relativeTo: this.route});
            }
        });
    }

    private resetForm(): void {
        this.form?.reset();
        // if (this.form) {
        //     const controls = this.form.controls;
        //     for (const k in controls) {
        //         if (controls.hasOwnProperty(k)) {
        //             controls[k].markAsUntouched();
        //             controls[k].markAsPristine();
        //         }
        //     }
        // }
    }

    private openSnackBar(message: string): void {
        this.snackBar.open(this.languageSrv.translate(message), null, {duration: 2000});
    }

    private showSavedMsg(): void {
        this.resetForm();
        this.openSnackBar('RECORD_SAVED');
    }

    private showDeletedMsg(): void {
        this.openSnackBar('RECORD_DELETED');
    }

    // overhead

    public updateKeyDescription(o: LineOverhead | PoolDetail, k: CKey): void {
        o.keyAcDescription = k == null ? null : '(' + k.code + ') ' + k.description;
    }

    public onKeySelectionChanged(k: CKey): void {
        this.updateKeyDescription(this.activeObject, k);
        if (this.activeObjectType === this.OBJ_TYPE_POOL_DETAIL) {
            this.activeObject.key = k == null ? null : k.id;
        } else {
            this.activeObject.keyId = k == null ? null : k.id;
        }
    }

    public onCostCenterChanged(c: CostCenter): void {
        this.updateCostCenterDescription(this.activeObject, c);
        this.activeObject.costCenterId = c == null ? null : c.id;
    }

    public onOverheadKeyLoaded(k: CKey): void {
        this.updateKeyDescription(this.activeObject, k);
    }

    public onCostCenterLoaded(c: CostCenter): void {
        this.updateCostCenterDescription(this.activeObject, c);
    }

    public saveOverhead(): void {
        const o = this.activeObject.id > 0 ? this.httpSrv.updateOH(this.activeObject) : this.httpSrv.addOH(this.activeObject);
        o.subscribe(() => this.showSavedMsg());
    }

    public savePool(): void {
        const p: CPool = {
            id: this.activeObject.id,
            keyId: this.activeObject.keyId,
            costCenterId: this.activeObject.costCenterId,
            projectId: this.activeObject.projectId,
            isSupport: this.activeObject.isSupport
        };
        const o = p.id > 0 ? this.httpSrv.updatePool(p) : this.httpSrv.addPool(p).pipe(tap(id => this.activeObject.id = +id));
        o.subscribe(() => this.showSavedMsg());
    }

    public savePoolDetail(): void {
        const o = this.activeObject.id > 0 ? this.httpSrv.updatePoolDetail(this.activeObject)
            : this.httpSrv.addPoolDetail(this.activeObject);
        o.subscribe(() => this.showSavedMsg());
    }

    public saveProductionLineOverhead(): void {
        const o = this.activeObject.id > 0 ?
            this.httpSrv.updateProductLineOH(this.activeObject) : this.httpSrv.addProductLineOH(this.activeObject);
        o.subscribe(() => this.showSavedMsg());
    }

    public deleteOverhead(skipSelect?: boolean): void {
        const o: OH = this.activeObject;
        if (o.id > 0) {
            this.confirm('DELETE_RECORD', 'DELETE_CONFIRMATION', () => {
                this.httpSrv.deleteOH(this.project.id, o.id)
                    .subscribe(() => {
                        this.project.overheadList.data.splice(this.activeObjectIndex, 1);
                        if (!skipSelect) {
                            this.setActiveObject(this.project.overheadList, this.OBJ_TYPE_OVERHEAD_LIST);
                        }
                        this.showDeletedMsg();
                    });
            });
        } else {
            this.resetForm();
            this.project.overheadList.data.splice(this.activeObjectIndex, 1);
            if (!skipSelect) {
                this.setActiveObject(this.project.overheadList, this.OBJ_TYPE_OVERHEAD_LIST);
            }
        }
    }

    public deletePoolDetail(skipSelect?: boolean): void {
        if (this.activeObject.id > 0) {
            this.confirm('DELETE_RECORD', 'DELETE_CONFIRMATION', () => {
                this.httpSrv.deletePoolDetail(this.project.poolList.data[this.activeObjectIndex].id, this.activeObject.id)
                    .subscribe(() => {
                        this.project.poolList.data[this.activeObjectIndex].detailsList.data.splice(this.activeObjectIndex2, 1);
                        if (!skipSelect) {
                            this.setActiveObject(
                                this.project.poolList.data[this.activeObjectIndex],
                                this.OBJ_TYPE_POOL, this.activeObjectIndex
                            );
                        }
                        this.showDeletedMsg();
                    });
            });
        } else {
            this.resetForm();
            this.project.poolList.data[this.activeObjectIndex].detailsList.data.splice(this.activeObjectIndex2, 1);
            if (!skipSelect) {
                this.setActiveObject(
                    this.project.poolList.data[this.activeObjectIndex],
                    this.OBJ_TYPE_POOL, this.activeObjectIndex
                );
            }
        }
    }

    public deleteProductionLineOverhead(skipSelect?: boolean) {
        const o: CLineOHItem = this.activeObject;
        if (o.id > 0) {
            this.confirm('DELETE_RECORD', 'DELETE_CONFIRMATION', () => {
                this.httpSrv.deleteProductLineOH(o.productLineId, o.id)
                    .subscribe(() => {
                        this.project.productLineList.data[this.activeObjectIndex].overheadList.data.splice(this.activeObjectIndex2, 1);
                        if (!skipSelect) {
                            this.setActiveObject(
                                this.project.productLineList.data[this.activeObjectIndex].overheadList,
                                this.OBJ_TYPE_PRODUCT_LINE_OH_LIST,
                                this.activeObjectIndex
                            );
                        }
                        this.showDeletedMsg();
                    });
            });
        } else {
            this.resetForm();
            this.project.productLineList.data[this.activeObjectIndex].overheadList.data.splice(this.activeObjectIndex2, 1);
            if (!skipSelect) {
                this.setActiveObject(
                    this.project.productLineList.data[this.activeObjectIndex].overheadList,
                    this.OBJ_TYPE_PRODUCT_LINE_OH_LIST,
                    this.activeObjectIndex
                );
            }
        }
    }

    public onReloadOverheadBtnClick() {
        if (this.wasObjectModified()) {
            this.confirm('CANCEL_EDIT', 'CONFIRM_CANCELLATION', () => {
                this.resetForm();
                this.reloadOverhead();
            });
        } else {
            this.reloadOverhead();
        }
    }

    public reloadOverhead(onFinish?: () => void): void {
        const id = this.activeObject.id;
        this.project.overheadList.data[this.activeObjectIndex] = {
            id: id,
            projectId: this.project.id,
            keyId: null,
            scale: null,
            amount: null,
            actual: null,
            description: null,
            accountNo: null
        };
        this.activeObject = this.project.overheadList.data[this.activeObjectIndex];
        this.httpSrv.getOHById(this.project.id, id)
            .subscribe(oh => {
                // this.project.overheadList.data[this.activeObjectIndex] = this.ohToOverhead(oh);
                this.project.overheadList.data[this.activeObjectIndex] = oh;
                this.activeObject = this.project.overheadList.data[this.activeObjectIndex];
                this.resetForm();
                if (onFinish) {
                    onFinish();
                }
            });
    }

    public onReloadPoolDetailBtnClick() {
        if (this.wasObjectModified()) {
            this.confirm('CANCEL_EDIT', 'CONFIRM_CANCELLATION', () => {
                this.resetForm();
                this.reloadPoolDetail();
            });
        } else {
            this.reloadPoolDetail();
        }
    }

    public reloadPoolDetail(onFinish?: () => void): void {
        const id = this.activeObject.id;
        const pool: Pool = this.project.poolList.data[this.activeObjectIndex];
        pool.detailsList.data[this.activeObjectIndex2] = {
            id: id, poolId: pool.id, key: null, keyAcDescription: null, value: null
        };
        this.activeObject = pool.detailsList.data[this.activeObjectIndex2];
        this.httpSrv.getPoolDetails(pool.id, id)
            .subscribe(pooDetail => {
                pool.detailsList.data[this.activeObjectIndex2] = this.cPoolDetailToPoolDetail(pooDetail);
                this.activeObject = pool.detailsList.data[this.activeObjectIndex2];
                this.resetForm();
                if (onFinish) {
                    onFinish();
                }
            });
    }

    public onReloadPoolBtnClick() {
        if (this.wasObjectModified()) {
            this.confirm('CANCEL_EDIT', 'CONFIRM_CANCELLATION', () => {
                this.resetForm();
                this.reloadPool();
            });
        } else {
            this.reloadPool();
        }
    }

    public reloadPool(onFinish?: () => void): void {
        const id: number = this.activeObject.id;
        this.project.poolList.data[this.activeObjectIndex] = {
            id: id,
            costCenterId: null,
            costCenterAcDescription: null,
            projectId: this.project.id,
            keyId: null,
            isSupport: false,
            detailsList: {data: [], loaded: false, hidden: false}
        };
        this.activeObject = this.project.poolList.data[this.activeObjectIndex];
        this.httpSrv.getPool(this.project.id, id)
            .subscribe(poo => {
                this.project.poolList.data[this.activeObjectIndex] = this.cPoolToPool(poo);
                this.activeObject = this.project.poolList.data[this.activeObjectIndex];
                this.resetForm();
                if (onFinish) {
                    onFinish();
                }
            });
    }

    public onReloadProductionLineOverheadBtnClick() {
        if (this.wasObjectModified()) {
            this.confirm('CANCEL_EDIT', 'CONFIRM_CANCELLATION', () => {
                this.resetForm();
                this.reloadProductionLineOverhead();
            });
        } else {
            this.reloadProductionLineOverhead();
        }
    }

    public reloadProductionLineOverhead(onFinish?: () => void): void {
        const id = this.activeObject.id;
        const plid = this.project.productLineList.data[this.activeObjectIndex].id;
        this.project.productLineList.data[this.activeObjectIndex].overheadList.data[this.activeObjectIndex2] = {
            id: id,
            productLineId: plid,
            keyId: null,
            actual: null,
            value: null,
            keyAcDescription: null
        };
        this.activeObject = this.project.productLineList.data[this.activeObjectIndex].overheadList.data[this.activeObjectIndex2];
        if (id > 0) {
            this.httpSrv.getProductLineOHById(plid, id)
                .subscribe(oh => {
                    this.project.productLineList
                        .data[this.activeObjectIndex]
                        .overheadList.data[this.activeObjectIndex2] = this.cLineOHItemToLineOverhead(oh);
                    this.activeObject = oh;
                    this.resetForm();
                    if (onFinish) {
                        onFinish();
                    }
                });
        }
    }

    public addOverhead(): void {
        const i = this.project.overheadList.data.length;
        this.project.overheadList.data.push({
            id: 0, projectId: this.project.id, description: null, amount: null, scale: null, actual: null, keyId: null, accountNo: null
        });
        this.setActiveObject(this.project.overheadList.data[i], this.OBJ_TYPE_OVERHEAD, i);
    }

    public addPoolDetail(): void {
        const i = this.activeObject.detailsList.data.length;
        this.activeObject.detailsList.data.push({
            id: 0,
            poolId: this.activeObject.id,
            key: null,
            value: null,
            actual: null,
            keyDescription: null
        });
        this.setActiveObject(this.activeObject.detailsList.data[i], this.OBJ_TYPE_POOL_DETAIL, this.activeObjectIndex, i);
    }

    public addProductionLineOverhead(): void {
        const lineOverhead = this.project.productLineList.data[this.activeObjectIndex].overheadList.data;
        const i = lineOverhead.length;
        lineOverhead.push({
            id: 0,
            productLineId: this.project.productLineList.data[this.activeObjectIndex].id,
            keyId: null,
            value: null,
            actual: null, keyAcDescription: null
        });
        this.setActiveObject(lineOverhead[i], this.OBJ_TYPE_PRODUCT_LINE_OH, this.activeObjectIndex, i);
    }

    // product lines

    public updateProductDescription(obj: ProductLine | CostingResult, p: CProduct): void {
        obj.productAcDescription = p == null ? null : '(' + p.code + ') ' + p.description;
    }

    public onProductSelectionChanged(p: CProduct): void {
        this.updateProductDescription(this.activeObject, p);
        this.activeObject.productId = p == null ? null : p.id;
    }

    public onProductLoaded(p: CProduct): void {
        this.updateProductDescription(this.activeObject, p);
    }

    public cPoolDetailToPoolDetail(pd: CPoolDetail): PoolDetail {
        const p: PoolDetail = {
            id: pd.id,
            poolId: pd.poolId,
            key: pd.key,
            value: pd.value,
            keyAcDescription: null
        };
        this.httpSrv.keysSetterFn(pd.key)
            .subscribe(k => this.updateKeyDescription(p, k));
        return p;
    }

    public updateCostCenterDescription(p: Pool, c: CostCenter): void {
        p.costCenterAcDescription = c == null ? null : ('(' + c.code + ') ' + c.description);
    }

    public cPoolToPool(poo: CPool): Pool {
        const pool: Pool = {
            id: poo.id,
            costCenterId: poo.costCenterId,
            costCenterAcDescription: poo.ccDescription,
            projectId: poo.projectId,
            keyId: poo.keyId,
            isSupport: poo.isSupport,
            detailsList: {data: [], loaded: false, hidden: true},
        };
        this.httpSrv.costCentersSetterFn(pool.costCenterId)
            .pipe(
                tap<CostCenter>(c => this.updateCostCenterDescription(pool, c)),
                switchMap(() => this.httpSrv.listPoolDetails(poo.id, 0, 50))
            )
            .subscribe(pd => pool.detailsList.data.push(...pd.map(p => this.cPoolDetailToPoolDetail(p))));
        return pool;
    }

    public cProductLineToProductLine(pl: CProductLine): ProductLine {
        const tempLine: ProductLine = {
            id: pl.id,
            productId: pl.productId,
            projectId: pl.projectId,
            units: pl.units,
            productAcDescription: null,
            directList: {data: [], loaded: false, hidden: true},
            overheadList: {data: [], loaded: false, hidden: true},
            hidden: true
        };
        this.httpSrv.productsSetterFn(tempLine.productId)
            .pipe(
                tap<CProduct>(p => this.updateProductDescription(tempLine, p)),
                switchMap(() => this.httpSrv.listProductLineDirect(pl.id, 0, 50)),
                tap<CLineDirectItem[]>(lineDirectArr => {
                    tempLine.directList.data.push(...lineDirectArr.map(lnDr => this.cLineDirectItemToLineDirect(lnDr)));
                    tempLine.directList.loaded = true;
                }),
                switchMap(() => this.httpSrv.listProductLineOH(pl.id, 0, 50))
            )
            .subscribe((lnOv: CLineOHItem[]) => {
                tempLine.overheadList.data.push(...lnOv.map(o => this.cLineOHItemToLineOverhead(o)));
                tempLine.overheadList.loaded = true;
            });
        return tempLine;
    }

    public cLineDirectItemToLineDirect(lnDr: CLineDirectItem) {
        const tempDirect: LineDirect = {
            id: lnDr.id, scale: lnDr.scale, actual: lnDr.actual,
            productLineId: lnDr.productLineId, amount: lnDr.amount,
            item: lnDr.item, itemAcDescription: null
        };
        this.httpSrv.itemsSetterFn(tempDirect.item)
            .subscribe(i => this.updateDirectItemDescription(tempDirect, i));
        return tempDirect;
    }

    public cLineOHItemToLineOverhead(o: CLineOHItem): LineOverhead {
        const tempOver: LineOverhead = {
            id: o.id, actual: o.actual, value: o.value, productLineId: o.productLineId,
            keyId: o.keyId, keyAcDescription: null,
        };
        this.httpSrv.keysSetterFn(o.keyId).subscribe(k => this.updateKeyDescription(tempOver, k));
        return tempOver;
    }

    public saveProductLine(): void {
        const obj: CProductLine = {
            id: this.activeObject.id,
            units: this.activeObject.units,
            projectId: this.activeObject.projectId,
            productId: this.activeObject.productId
        };
        const o = this.activeObject.id > 0 ?
            this.httpSrv.updateProductLine(obj) :
            this.httpSrv.addProductLine(obj).pipe(tap(id => this.activeObject.id = +id));
        o.subscribe(() => this.showSavedMsg());
    }

    public deleteProductLine(skipSelect?: boolean): void {
        const p: CProductLine = this.activeObject;
        if (p.id > 0) {
            this.confirm('DELETE_RECORD', 'DELETE_CONFIRMATION', () => {
                this.httpSrv.deleteProductLine(this.project.id, p.id)
                    .subscribe(() => {
                        this.project.productLineList.data.splice(this.activeObjectIndex, 1);
                        if (!skipSelect) {
                            this.setActiveObject(this.project.productLineList, this.OBJ_TYPE_PRODUCT_LINE_LIST);
                        }
                        this.showDeletedMsg();
                    });
            });
        } else {
            this.resetForm();
            this.project.productLineList.data.splice(this.activeObjectIndex, 1);
            if (!skipSelect) {
                this.setActiveObject(this.project.productLineList, this.OBJ_TYPE_PRODUCT_LINE_LIST);
            }
        }
    }

    public addPool(): void {
        const i = this.project.poolList.data.length;
        this.project.poolList.data.push({
            id: 0,
            projectId: this.project.id,
            keyId: null,
            isSupport: false,
            costCenterAcDescription: null,
            costCenterId: null,
            detailsList: {data: [], loaded: false, hidden: false}
        });
        this.setActiveObject(this.project.poolList.data[i], this.OBJ_TYPE_POOL, i);
    }

    public deletePool(skipSelect?: boolean): void {
        if (this.activeObject.id > 0) {
            this.confirm('DELETE_RECORD', 'DELETE_CONFIRMATION', () => {
                this.httpSrv.deletePool(this.project.id, this.activeObject.id)
                    .subscribe(() => {
                        this.project.poolList.data.splice(this.activeObjectIndex, 1);
                        if (!skipSelect) {
                            this.setActiveObject(this.project.poolList, this.OBJ_TYPE_POOL_LIST);
                        }
                        this.showDeletedMsg();
                    });
            });
        } else {
            this.resetForm();
            this.project.poolList.data.splice(this.activeObjectIndex, 1);
            if (!skipSelect) {
                this.setActiveObject(this.project.poolList, this.OBJ_TYPE_POOL_LIST);
            }
        }
    }

    public onReloadProductLineBtnClick() {
        if (this.wasObjectModified()) {
            this.confirm('CANCEL_EDIT', 'CONFIRM_CANCELLATION', () => {
                this.resetForm();
                this.reloadProductLine();
            });
        } else {
            this.reloadProductLine();
        }
    }

    public reloadProductLine(onFinish?: () => void): void {
        const id = this.activeObject.id;
        this.project.productLineList.data[this.activeObjectIndex] = {
            id: id,
            projectId: this.project.id,
            productId: null,
            units: null, productAcDescription: null,
            overheadList: {data: [], loaded: false, hidden: true},
            directList: {data: [], loaded: false, hidden: true},
            hidden: true
        };
        this.activeObject = this.project.productLineList.data[this.activeObjectIndex];
        if (id > 0) {
            this.httpSrv.getProductLineById(this.project.id, id)
                .subscribe(pl => {
                    this.project.productLineList.data[this.activeObjectIndex] = this.cProductLineToProductLine(pl);
                    this.activeObject = this.project.productLineList.data[this.activeObjectIndex];
                    this.resetForm();
                    if (onFinish) {
                        onFinish();
                    }
                });
        }
    }

    public addProductLine(): void {
        const i = this.project.productLineList.data.length;
        this.project.productLineList.data.push({
            id: 0, projectId: this.project.id, units: null, productId: null, productAcDescription: null,
            overheadList: {data: [], loaded: false, hidden: true},
            directList: {data: [], loaded: false, hidden: true},
            hidden: true
        });
        this.setActiveObject(this.project.productLineList.data[i], this.OBJ_TYPE_PRODUCT_LINE, i);
    }

    // direct items

    public updateDirectItemDescription(ldi: LineDirect, itm: CItem) {
        ldi.itemAcDescription = itm == null ? null : '(' + itm.code + ') ' + itm.description;
    }

    public addProductionLineDirect(): void {
        const productLine = this.project.productLineList.data[this.activeObjectIndex];
        const direct = productLine.directList.data;
        const i = direct.length;
        direct.push({
            id: 0, productLineId: productLine.id, item: null, actual: null, amount: null, scale: null,
            itemAcDescription: null
        });
        this.setActiveObject(direct[i], this.OBJ_TYPE_PRODUCT_LINE_DIRECT, this.activeObjectIndex, i);
    }

    public onItemSelectionChanged(i: CItem): void {
        this.updateDirectItemDescription(this.activeObject, i);
        this.activeObject.item = i == null ? null : i.id;
    }

    public onItemLoaded(i: CItem): void {
        this.updateDirectItemDescription(this.activeObject, i);
    }

    public saveProductionLineDirect(): void {
        const x = this.activeObject.id > 0 ?
            this.httpSrv.updateProductLineDirect(this.activeObject) : this.httpSrv.addProductLineDirect(this.activeObject);
        x.subscribe(() => this.showSavedMsg());
    }

    public deleteProductionLineDirect(skipSelect?: boolean): void {
        const o: CLineDirectItem = this.activeObject;
        if (o.id > 0) {
            this.confirm('DELETE_RECORD', 'DELETE_CONFIRMATION', () => {
                this.httpSrv.deleteProductLineDirect(o.productLineId, o.id)
                    .subscribe(() => {
                        this.project.productLineList.data[this.activeObjectIndex].directList.data.splice(this.activeObjectIndex2, 1);
                        if (!skipSelect) {
                            this.setActiveObject(
                                this.project.productLineList.data[this.activeObjectIndex].directList,
                                this.OBJ_TYPE_PRODUCT_LINE_DIRECT_LIST, this.activeObjectIndex
                            );
                        }
                        this.showDeletedMsg();
                    });
            });
        } else {
            this.resetForm();
            this.project.productLineList.data[this.activeObjectIndex].directList.data.splice(this.activeObjectIndex2, 1);
            if (!skipSelect) {
                this.setActiveObject(
                    this.project.productLineList.data[this.activeObjectIndex].directList,
                    this.OBJ_TYPE_PRODUCT_LINE_DIRECT_LIST, this.activeObjectIndex
                );
            }
        }
    }

    public onReloadProductionLineDirectBtnClick(): void {
        if (this.wasObjectModified()) {
            this.confirm('CANCEL_EDIT', 'CONFIRM_CANCELLATION', () => {
                this.resetForm();
                this.reloadProductionLineDirect();
            });
        } else {
            this.reloadProductionLineDirect();
        }
    }

    public reloadProductionLineDirect(onFinish?: () => void): void {
        const id = this.activeObject.id;
        const plid = this.project.productLineList.data[this.activeObjectIndex].id;
        this.project.productLineList.data[this.activeObjectIndex].directList.data[this.activeObjectIndex2] = {
            id: id, productLineId: plid, item: null, actual: null, amount: null,
            scale: null, itemAcDescription: null
        };
        this.activeObject = this.project.productLineList.data[this.activeObjectIndex].directList.data[this.activeObjectIndex2];
        if (id > 0) {
            this.httpSrv.getProductLineDirectById(plid, id)
                .subscribe(drt => {
                    this.project.productLineList
                        .data[this.activeObjectIndex]
                        .directList.data[this.activeObjectIndex2] = this.cLineDirectItemToLineDirect(drt);
                    this.activeObject = drt;
                    this.resetForm();
                    if (onFinish) {
                        onFinish();
                    }
                });
        }
    }

    // lists & shit

    public toggleListTree(tree: any) {
        tree.hidden = !tree.hidden;
    }

    // more shit *Results*

    public getStepDownResult(): void {
        this.httpSrv.getResultStepDown(this.project.id)
            .subscribe(rawResult => {
                this.result = rawResult.map(r => {
                    this.updateProductDescription(r, r.product);
                    return r;
                });
            });
    }

    public getActivityResult(): void {
        this.httpSrv.getResultActivity(this.project.id)
            .subscribe((rawResult: CostingResult[]) => {
                this.result = rawResult.map(r => {
                    this.updateProductDescription(r, r.product);
                    return r;
                });
            });
    }

    public onSimpleKeyChanged(key: CKey): void {
        if (key) {
            this.simpleKeyId = key.id;
            this.httpSrv.getResultSimple(this.project.id, key.id)
                .subscribe(rawResult => {
                    this.result = rawResult.map(r => {
                        this.updateProductDescription(r, r.product);
                        return r;
                    });
                });
        } else {
            this.result = null;
            this.simpleKeyId = null;
        }
    }

    // more more shit *Reports*

    private filterReports(filter: string): void {
        this.reportsList = null;
        this.selectedReport = -1;
        if (this.fullReportsList) {
            const list = this.fullReportsList.filter(r => r.name === filter);
            if (list.length > 0) {
                this.reportsList = list[0];
            }
        } else {
            this.httpSrv.getReportList()
                .subscribe({
                    next: lst => {
                        if (lst) {
                            this.fullReportsList = lst.map(rLst => {
                                rLst.files = rLst.files.map(file => file.replace('.jasper', ''));
                                return rLst;
                            });
                            this.filterReports(filter);
                        }
                    },
                    error: err => {
                        this.reportsList = { name: null, files: [] };
                        throw err;
                    }
                });
        }
    }


    public closeReport() {
        if (this.reportObject != null) {
            this.httpSrv.releaseReportObject(this.reportObject);
        }
        this.reportObject = null;
        this.reportType = 0;
    }

    public saveReport() {
        // for now there is only pdf
        // saveAs(this.reportObject.blob, this.reportsList.files[this.selectedReport] + '.pdf');
    }

}
