import {Injectable, Injector} from '@angular/core';
import {Observable, forkJoin} from 'rxjs';
import {
    CItem,
    CKey,
    CLineDirectItem,
    CLineOHItem,
    CostCenter,
    CPool,
    CPoolDetail,
    CProduct,
    CProductLine,
    CProject,
    OH, ScalaCostingResult, CostingResult, ReportList
} from './costing-api';
import {delay, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {TypesUtil} from './types-util';
import {DomSanitizer} from '@angular/platform-browser';
import { HttpService } from '@ss/common/api-common';

export interface SafeDomObject {
    dom_url: string;
    blob: Blob;
    safeObject: any;
}

export interface ReportParameter {
    name: string;
    value: number | string;
}

@Injectable({ providedIn: 'root' })
export class CostingHttpService {

    public appName = 'costing';

    public accountsUrl = '/accounting/accounts';

    public itemUrl = '/costing/items';
    public keyUrl = '/costing/keys';

    public projectUrl = '/costing/projects';
    public productUrl = '/costing/products';

    public productLineParentUrl = '/costing/projects/';
    public productLineChildUrl = '/products';

    public ohParentUrl = '/costing/projects/';
    public ohChildUrl = '/oh';

    public plOHParentUrl = '/costing/products/';
    public plOHChildUrl = '/oh';

    public plDirectParentUrl = '/costing/products/';
    public plDirectChildUrl = '/direct';

    public injectionParentUrl = '/costing/';
    public injectionChildUrl = '/injection';
    public injectionActChildUrl = '/actInjection';

    public poolParentUrl = '/costing/project/';
    public poolChildUrl = '/pools';

    public poolDetailParentUrl = '/costing/pool/';
    public poolDetailChildUrl = '/details';

    public costCentersUrl = '/costCenters';

    public simpleUrl = '/costing/simple';
    public simpleUrlParamProject = 'project';
    public simpleUrlParamKey = 'key';
    public simpleUrlParamActual = 'actual';

    public stepDownUrl = '/costing/stepdown';
    public stepDownUrlParamProject = 'project';
    public stepDownUrlParamActual = 'actual';

    public activityUrl = '/costing/activity';
    public activityUrlParamProject = 'project';
    public activityUrlParamActual = 'actual';

    public cloneUrl = '/costing/clone';
    public cloneUrlParamId = 'id';
    public cloneUrlParamCode = 'code';
    public cloneUrlParamDescription = 'description';

    public reportsListUrl = '/reports';
    public reportsListUrlFilterParam = 'filter=costing';

    public reportsViewUrl = '/reports/view';
    //

    public accountsFilterFn = this.accountsFilter.bind(this);
    public accountsGetterFn = this.accountsGetter.bind(this);
    public accountsSetterFn = this.accountsSetter.bind(this);
    //
    public productsFilterFn = this.productsFilter.bind(this);
    public productsGetterFn = this.productsGetter.bind(this);
    public productsSetterFn = this.productsSetter.bind(this);
    //
    public keysFilterFn = this.keysFilter.bind(this);
    public keysGetterFn = this.keysGetter.bind(this);
    public keysSetterFn = this.keysSetter.bind(this);
    //
    public itemsFilterFn = this.itemsFilter.bind(this);
    public itemsGetterFn = this.itemsGetter.bind(this);
    public itemsSetterFn = this.itemsSetter.bind(this);
    //
    public costCentersFilterFn = this.costCentersFilter.bind(this);
    public costCentersGetterFn = this.costCentersGetter.bind(this);
    public costCentersSetterFn = this.costCentersSetter.bind(this);

    private productsCache: any = {};
    private keysCache: any = {};
    private itemsCache: any = {};
    private accountsCache: any = {};

    constructor(public httpSrv: HttpService,
                private sanitizer: DomSanitizer,
                private injector: Injector,
                private router: Router) {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.clearCache();
            }
        });
    }

    //

    public deleteItem(id: number): Observable<any> {
        return this.httpSrv.remove(this.itemUrl + '/' + id);
    }

    public deleteKey(id: number): Observable<any> {
        return this.httpSrv.remove(this.keyUrl + '/' + id);
    }

    public deleteProject(id: number): Observable<any> {
        return this.httpSrv.remove(this.projectUrl + '/' + id);
    }

    public deleteProduct(id: number): Observable<{count: number}> {
        return this.httpSrv.remove(this.productUrl + '/' + id);
    }

    public deleteOH(pid: number, id: number): Observable<{count: number}> {
        return this.httpSrv.remove(this.ohParentUrl + pid + this.ohChildUrl + '/' + id);
    }

    public deleteProductLine(pid: number, id: number): Observable<{count: number}> {
        return this.httpSrv.remove(this.productLineParentUrl + pid + this.productLineChildUrl + '/' + id);
    }

    public deleteProductLineOH(plid: number, id: number): Observable<{count: number}> {
        return this.httpSrv.remove(this.plOHParentUrl + plid + this.plOHChildUrl + '/' + id);
    }

    public deleteProductLineDirect(plid: number, id: number): Observable<{count: number}> {
        return this.httpSrv.remove(this.plDirectParentUrl + plid + this.plDirectChildUrl + '/' + id);
    }

    public deletePool(pid: number, id: number): Observable<{count: number}> {
        return this.httpSrv.remove(this.poolParentUrl + pid + this.poolChildUrl + '/' + id);
    }

    public deletePoolDetail(pid: number, id: number): Observable<{count: number}> {
        return this.httpSrv.remove(this.poolDetailParentUrl + pid + this.poolDetailChildUrl + '/' + id);
    }

    public deleteCostCenter(id: number): Observable<any> {
        return this.httpSrv.remove(this.costCentersUrl + '/' + id);
    }

    //

    private add(url: string, obj: any): Observable<number> {
        return this.httpSrv.post(url, obj)
            .pipe(map(id => {
                obj.id = +id;
                return id;
            }));
    }

    //

    public addItem(obj: CItem): Observable<number> {
        return this.add(this.itemUrl, obj);
    }

    public addKey(obj: CKey): Observable<number> {
        return this.add(this.keyUrl, obj);
    }

    public addProject(obj: CProject): Observable<number> {
        return this.add(this.projectUrl, obj);
    }

    public addProduct(obj: CProduct): Observable<number> {
        return this.add(this.productUrl, obj);
    }

    public addOH(obj: OH): Observable<number> {
        return this.add(this.ohParentUrl + obj.projectId + this.ohChildUrl, obj);
    }

    public addProductLine(obj: CProductLine): Observable<number> {
        return this.add(this.productLineParentUrl + obj.projectId + this.productLineChildUrl, obj);
    }

    public addProductLineOH(obj: CLineOHItem): Observable<number> {
        return this.add(this.plOHParentUrl + obj.productLineId + this.plOHChildUrl, obj);
    }

    public addProductLineDirect(obj: CLineDirectItem): Observable<number> {
        return this.add(this.plDirectParentUrl + obj.productLineId + this.plDirectChildUrl, obj);
    }

    public addPool(obj: CPool): Observable<number> {
        return this.add(this.poolParentUrl + obj.projectId + this.poolChildUrl, obj);
    }

    public addPoolDetail(obj: CPoolDetail): Observable<number> {
        return this.add(this.poolDetailParentUrl + obj.poolId + this.poolDetailChildUrl, obj);
    }

    public addCostCenters(obj: CostCenter): Observable<number> {
        return this.add(this.costCentersUrl, obj);
    }

    // update

    public updateItem(obj: CItem): Observable<any> {
        return this.httpSrv.put(this.itemUrl, obj);
    }

    public updateKey(obj: CKey): Observable<any> {
        return this.httpSrv.put(this.keyUrl, obj);
    }

    public updateProject(obj: CProject): Observable<any> {
        return this.httpSrv.put(this.projectUrl, obj);
    }

    public updateProduct(obj: CProduct): Observable<any> {
        return this.httpSrv.put(this.productUrl, obj);
    }

    public updateOH(obj: OH): Observable<any> {
        return this.httpSrv.put(this.ohParentUrl + obj.projectId + this.ohChildUrl, obj);
    }

    public updateProductLine(obj: CProductLine): Observable<any> {
        return this.httpSrv.put(this.productLineParentUrl + obj.projectId + this.productLineChildUrl, obj);
    }

    public updateProductLineOH(obj: CLineOHItem): Observable<any> {
        return this.httpSrv.put(this.plOHParentUrl + obj.productLineId + this.plOHChildUrl, obj);
    }

    public updateProductLineDirect(obj: CLineDirectItem): Observable<any> {
        return this.httpSrv.put(this.plDirectParentUrl + obj.productLineId + this.plDirectChildUrl, obj);
    }

    public updatePool(obj: CPool): Observable<any> {
        return this.httpSrv.put(this.poolParentUrl + obj.projectId + this.poolChildUrl, obj);
    }

    public updatePoolDetail(obj: CPoolDetail): Observable<any> {
        return this.httpSrv.put(this.poolDetailParentUrl + obj.poolId + this.poolDetailChildUrl, obj);
    }

    public updateCostCenter(obj: CostCenter): Observable<any> {
        return this.httpSrv.put(this.costCentersUrl, obj);
    }

    // list

    public listItems(page: number, pageSize: number, filter?: string): Observable<CItem[]> {
        return this.httpSrv
            .getData<CItem>(this.itemUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    public listKeys(page: number, pageSize: number, filter?: string): Observable<CKey[]> {
        return this.httpSrv
            .getData<CKey>(this.keyUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    public listProject(page: number, pageSize: number, filter?: string): Observable<CProject[]> {
        return this.httpSrv
            .getData<CProject>(this.projectUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    public listProducts(page: number, pageSize: number, filter?: string): Observable<CProduct[]> {
        return this.httpSrv
            .getData<CProduct>(this.productUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    public listProductLines(projectId: number, page: number, pageSize: number, filter?: string): Observable<CProductLine[]> {
        return this.httpSrv
            .getData<CProductLine>(this.productLineParentUrl + projectId + this.productLineChildUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    public listOH(projectId: number, page: number, pageSize: number, filter?: string): Observable<OH[]> {
        return this.httpSrv
            .getData<OH>(this.ohParentUrl + projectId + this.ohChildUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    public listProductLineOH(plid: number, page: number, pageSize: number, filter?: string): Observable<CLineOHItem[]> {
        return this.httpSrv
            .getData<CLineOHItem>(this.plOHParentUrl + plid + this.plOHChildUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    public listProductLineDirect(plid: number, page: number, pageSize: number, filter?: string): Observable<CLineDirectItem[]> {
        return this.httpSrv
            .getData<CLineDirectItem>(this.plDirectParentUrl + plid + this.plDirectChildUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    public listPools(pid: number, page: number, pageSize: number, filter?: string): Observable<CPool[]> {
        return this.httpSrv
            .getData<CPool>(this.poolParentUrl + pid + this.poolChildUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    public listPoolDetails(pid: number, page: number, pageSize: number, filter?: string): Observable<CPoolDetail[]> {
        return this.httpSrv
            .getData<CPoolDetail>(this.poolDetailParentUrl + pid + this.poolDetailChildUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    public listCostCenters(page: number, pageSize: number, filter?: string) {
        return this.httpSrv
            .getData<CostCenter>(this.costCentersUrl, page, pageSize, filter)
            .pipe(map(res => res.body));
    }

    // getById

    public getItemById(id: number): Observable<CItem> {
        return this.httpSrv.get<CItem>(this.itemUrl + '/' + id);
    }

    public getKeyById(id: number): Observable<CKey> {
        return this.httpSrv.get<CKey>(this.keyUrl + '/' + id);
    }

    public getProjectById(id: number): Observable<CProject> {
        return this.httpSrv.get<CProject>(this.projectUrl + '/' + id);
    }

    public getProductById(id: number): Observable<CProduct> {
        return this.httpSrv.get<CProduct>(this.productUrl + '/' + id);
    }

    public getOHById(pid: number, id: number): Observable<OH> {
        return this.httpSrv.get<OH>(this.ohParentUrl + pid + this.ohChildUrl + '/' + id);
    }

    public getProductLineById(pid: number, id: number): Observable<CProductLine> {
        return this.httpSrv.get<CProductLine>(this.productLineParentUrl + pid + this.productLineChildUrl + '/' + id);
    }

    public getProductLineOHById(plid: number, id: number): Observable<CLineOHItem> {
        return this.httpSrv.get<CLineOHItem>(this.plOHParentUrl + plid + this.plOHChildUrl + '/' + id);
    }

    public getProductLineDirectById(plid: number, id: number): Observable<CLineDirectItem> {
        return this.httpSrv.get<CLineDirectItem>(this.plDirectParentUrl + plid + this.plDirectChildUrl + '/' + id);
    }

    public getPool(pid: number, id: number): Observable<CPool> {
        return this.httpSrv.get<CPool>(this.poolParentUrl + pid + this.poolChildUrl + '/' + id);
    }

    public getPoolDetails(pid: number, id: number): Observable<CPoolDetail> {
        return this.httpSrv.get<CPoolDetail>(this.poolDetailParentUrl + pid + this.poolDetailChildUrl + '/' + id);
    }

    public getCostCenterById(id: number): Observable<CostCenter> {
        return this.httpSrv.get<CostCenter>(this.costCentersUrl + '/' + id);
    }

    // ########
    // # API  #
    // #    \ #
    // #    V #
    // ########

    public scalaCostingResultToCostingResult(expected: ScalaCostingResult, actual: ScalaCostingResult): CostingResult {
        const r: CostingResult = {
            product: expected ? expected._1 : actual._1,
            actualCost: actual ? actual._2 : 0,
            expectedCost: expected ? expected._2 : 0,
            productAcDescription: null,
            error: null
        };
        if (r.actualCost !== 0) {
            const errVal: number = ((r.expectedCost * 100) / r.actualCost) - 100;
            r.error = (errVal > 0 ? '+' : '') + Math.round(errVal) + '%';
        }
        return r;
    }

    private getResult(url: string): Observable<CostingResult[]> {
        return forkJoin(
            this.httpSrv.get<ScalaCostingResult[]>(url + 'false'),
            this.httpSrv.get<ScalaCostingResult[]>(url + 'true')
        ).pipe(
            map<ScalaCostingResult[][], CostingResult[]>(resultArr => {
                return resultArr[0].map(expected => {
                    const actualArr = resultArr[1].filter(a => a._1.id === expected._1.id);
                    const actual = actualArr.length > 0 ? actualArr[0] : null;
                    return this.scalaCostingResultToCostingResult(expected, actual);
                });
            })
        );
    }

    public getResultSimple(pid: number, kid: number): Observable<CostingResult[]> {
        const url = this.simpleUrl
            + '?' + this.simpleUrlParamProject + '=' + pid
            + '&' + this.simpleUrlParamKey + '=' + kid
            + '&' + this.simpleUrlParamActual + '=';
        return this.getResult(url);
    }

    public getResultStepDown(pid: number): Observable<CostingResult[]> {
        const url = this.stepDownUrl
            + '?' + this.stepDownUrlParamProject + '=' + pid
            + '&' + this.stepDownUrlParamActual + '=';
        return this.getResult(url);
    }

    public getResultActivity(pid: number): Observable<CostingResult[]> {
        const url = this.activityUrl
            + '?' + this.activityUrlParamProject + '=' + pid
            + '&' + this.activityUrlParamActual + '=';
        return this.getResult(url);
    }

    public clone(id: number, code: string, description: string): Observable<any> {
        return this.httpSrv.put(this.cloneUrl + '?'
            + this.cloneUrlParamId + '=' + id
            + '&' + this.cloneUrlParamCode + '=' + code
            + '&' + this.cloneUrlParamDescription + '=' + description
        );
    }

    public getReportList(): Observable<ReportList[]> {
        return this.httpSrv.get<ReportList[]>(this.reportsListUrl + '?' + this.reportsListUrlFilterParam);
    }

    public generateReport(filename: string, paramList: ReportParameter[], type: string): Observable<SafeDomObject> {
        const data = {
            'app': this.appName + '/',
            'rType': type,
            'fileName': filename,
            'paramList': paramList
        };
        if (type === 'HTML') {
            return this.httpSrv.post(this.httpSrv.baseUrl + this.reportsViewUrl, data)
                .pipe(map(res => {
                    return {dom_url: null, blob: null, safeObject: this.sanitizer.bypassSecurityTrustHtml(res)};
                }));
        } else {
            return this.httpSrv.postBlob(this.reportsViewUrl, data)
                .pipe(map((res: ArrayBuffer) => {
                    if (type === 'PDF') {
                        const obj = new Blob([res], {type: 'application/pdf'});
                        // if (this.cPdfSrv.isMobile()) {
                        //     this.cPdfSrv.writeThenOpenFile(obj);
                        //     return null;
                        // }
                        const domUrl = URL.createObjectURL(obj);
                        const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(domUrl);
                        return {dom_url: domUrl, blob: obj, safeObject: safeUrl};
                    } else {
                        const blob = new Blob([res], {type: 'application/octet-stream'});
                        const slash = filename.lastIndexOf('/');
                        // todo: add date & time to file name
                        let fName = filename;
                        if (slash != null && slash >= 0) {
                            fName = fName.substring(slash + 1);
                        }
                        // TODO: xlsx is not the only possible type. other types maybe added in the future!!!
                        // saveAs(blob, fName + '.xlsx');
                        return null;
                    }
                }));
        }
    }

    public releaseReportObject(obj: SafeDomObject) {
        if (obj != null) {
            try {
                if (obj.dom_url) {
                    URL.revokeObjectURL(obj.dom_url);
                }
            } catch (e) {
                // ignored
            }
        }
    }

    // ##########################
    // # AutoComplete Bullshit  #
    // #                      \ #
    // #                      | #
    // #                      V #
    // ##########################

    public clearCache(): void {
        this.productsCache = {};
        this.keysCache = {};
        this.itemsCache = {};
        this.accountsCache = {};
    }

    // accounts
    private accountsFilter(filter: string) {
        return this.httpSrv.getData<any[]>(this.accountsUrl, 0, 5, filter);
    }

    private accountsGetter(obj: any) {
        return obj == null ? null : obj.id;
        // return obj == null ? null : obj.accountno;
    }

    private accountsSetter(obj: any) {
        // I am keeping the code long, but simple to understand.
        if (obj == null) { // if it is null, return null. simple.
            return of(null);
        }
        if (TypesUtil.isNumber(obj) || TypesUtil.isString(obj)) { // if it is a FK, get the object from the db.
            const cachedVal = this.accountsCache[obj];
            if (cachedVal) {
                return of(cachedVal).pipe(delay(50));
            }
            // i am not using getRecord here because the FK is not the id :(
            return this.httpSrv.get<any>(this.accountsUrl + '/' + obj)
                .pipe(map(r => {
                    this.accountsCache[r.id] = r;
                    return r;
                }));
        }
        return of(obj); // the parameter is a full object and not a FK. return it.
    }

    // products
    private productsFilter(filter: string): Observable<CProduct[]> {
        return this.listProducts(0, 5, filter);
    }

    private productsGetter(obj: CProduct): number {
        return obj == null ? null : obj.id;
    }

    private productsSetter(obj: any): Observable<CProduct> {
        if (obj == null) {
            return of(null);
        }
        if (TypesUtil.isNumber(obj)) { // if it is a number (number formatted as string), it is the id
            const id: number = TypesUtil.isString(obj) ? +obj : obj;
            const cachedVal = this.productsCache[id];
            if (cachedVal) {
                return of(cachedVal).pipe(delay(50));
            }
            return this.getProductById(id).pipe(map(p => {
                this.productsCache[p.id] = p;
                return p;
            }));
        }
        return of(obj);
    }

    // keys
    private keysFilter(filter: string): Observable<CKey[]> {
        return this.listKeys(0, 50, filter);
    }

    private keysGetter(obj: CKey): number {
        return obj ? obj.id : null;
    }

    private keysSetter(obj: any): Observable<CKey> {
        if (obj == null) {
            return of(null);
        }
        if (TypesUtil.isNumber(obj)) { // if it is a number (number formatted as string), it is the id
            const id: number = TypesUtil.isString(obj) ? +obj : obj;
            const cachedVal = this.keysCache[id];
            if (cachedVal) {
                return of(cachedVal).pipe(delay(50));
            }
            return this.getKeyById(id).pipe(map(k => {
                this.keysCache[k.id] = k;
                return k;
            }));
        }
        return of(obj);
    }

    // items
    private itemsFilter(filter: string): Observable<CItem[]> {
        return this.listItems(0, 5, filter);
    }

    private itemsGetter(obj: CItem): number {
        return obj ? obj.id : null;
    }

    private itemsSetter(obj: any): Observable<CItem> {
        if (obj == null) {
            return of(null);
        }
        if (TypesUtil.isNumber(obj)) {
            const id: number = TypesUtil.isString(obj) ? +obj : obj;
            const cachedVal = this.itemsCache[id];
            if (cachedVal) {
                return of(cachedVal).pipe(delay(50));
            }
            return this.getItemById(id).pipe(map(i => {
                this.itemsCache[i.id] = i;
                return i;
            }));
        }
        return of(obj);
    }

    // cost centers
    private costCentersFilter(filter: string): Observable<CostCenter[]> {
        return this.listCostCenters(0, 5, filter);
    }

    private costCentersGetter(obj: CostCenter): number {
        return obj ? obj.id : null;
    }

    private costCentersSetter(obj: any): Observable<CostCenter> {
        if (obj == null) {
            return of(null);
        }
        if (TypesUtil.isNumber(obj)) {
            // todo: add cache for this costCenters
            return this.getCostCenterById(obj);
        }
        return of(obj);
    }

    // ###################
    // # Excel Bullshit  #
    // #               \ #
    // #               | #
    // #               V #
    // ###################

    public uploadExcelInjectionFile(file: File, id: number, act?: boolean): Observable<any> {
        const childUrl = act ? this.injectionActChildUrl : this.injectionChildUrl;
        if (!file) {
            return of(null);
        }
        const fd = new FormData();
        fd.append('file', file, file.name);
        return this.httpSrv.upload(
            this.injectionParentUrl + id + childUrl, fd
        );
    }

}
