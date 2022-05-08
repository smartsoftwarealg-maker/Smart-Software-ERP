import { Component, OnInit } from '@angular/core';
import { HttpService, LanguageService } from '@ss/common/api-common';
import { Lookup, ORGANIZATION_URL, Organization } from '@ss/organizations/api-organizations';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OrganizationsDetailComponent } from './organizations-detail.component';
import { TreeNode } from 'angular13-organization-chart';
import { EmployeeService, Employee } from '@ss/payroll/api-employee';
import { ImageModel } from '@ss/common/ui-image-input';
import {ActivatedRoute} from '@angular/router';
import { DivisionService, DepartmentService, ServiceService, OfficeService, Division, Department, Service, Office } from '@ss/common/api-lookup';
import { switchMap, tap } from 'rxjs/operators';
import { Level } from './common';

interface OrgTreeNode extends TreeNode {
    id: number;
    parentId: number;
    name: string;
    responsible?: number;
    imageModel?: ImageModel;
    children: OrgTreeNode[];
}


@Component({
    selector: 'ss-organizations',
    styleUrls: ['./organizations.component.scss'],
    templateUrl: 'organizations.component.html'
})
export class OrganizationsComponent implements OnInit {

    constructor(private httpSrv: HttpService,
                private shellSrv: ShellService,
                private matDialog: MatDialog,
                private snackBarSrv: SnackBarService,
                private personSrv: EmployeeService,
                private divisionsSrv: DivisionService,
                private departmentSrv: DepartmentService,
                private serviceSrv: ServiceService,
                private officeSrv: OfficeService,
                private route: ActivatedRoute,
                private confirmationSrv: ConfirmationDialogService,
                private langSrv: LanguageService) { }

    readonly defaultStyle = '';

    root: OrgTreeNode;

    selected: OrgTreeNode;
    selectedLevel: Level = Level.None;
    people: { [key: number]: string} = {};

    public addButton: ToolbarButton = {
        icon: 'fas fa-plus',
        label: 'COMMON_ADD',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.showDetail(true)
    };

    public editButton: ToolbarButton = {
        icon: 'fas fa-pen',
        label: 'COMMON_EDIT_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.showDetail(false)
    };

    public deleteButton: ToolbarButton = {
        icon: 'fas fa-trash-alt',
        label: 'COMMON_DEL_SELECTED',
        disabled: true,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => this.deleteSelected()
    };

    public refreshButton: ToolbarButton = {
        icon: 'fas fa-sync-alt',
        label: 'COMMON_REFRESH',
        disabled: false,
        visible: true,
        keepOnToolbar: KeepOnToolbar.DYNAMIC,
        click: () => {
            this.refresh();
        }
    };

    ngOnInit() {
        this.refresh();
        this.shellSrv.setGoBackPath('..', this.route);
    }

    refresh() {
        this.shellSrv.setLoading(true);
        this.people = {};
        this.shellSrv.setButtons([this.refreshButton, this.addButton, this.editButton, this.deleteButton]);
        this.root = this.lookupToChartNode(0, this.langSrv.translate('ORGANIZATION'), 0, null, Level.Root);
        const divisions: { [key: number]: OrgTreeNode; } = {};
        const departments: { [key: number]: OrgTreeNode; } = {};
        const services: { [key: number]: OrgTreeNode; } = {};
        const offices: { [key: number]: OrgTreeNode; } = {};
        this.divisionsSrv.getListSimple()
            .pipe(
                tap(ds => {
                    ds.forEach((d: Division) => {
                        const node = this.lookupToChartNode(d.id, d.description, null, d.responsible, Level.Division);
                        divisions[d.id] = node;
                        this.root.children.push(node);
                    });
                }),
                switchMap(() => this.departmentSrv.getListSimple()),
                tap(ds => {
                    ds.forEach(d => {
                        departments[d.id] = this.lookupToChartNode(d.id, d.description, null, d.responsible, Level.Department);
                    });
                }),
                switchMap(() => this.serviceSrv.getListSimple()),
                tap(ss => {
                    ss.forEach((s: Service) => {
                        services[s.id] = this.lookupToChartNode(s.id, s.description, null, s.responsible, Level.Service);
                    });
                }),
                switchMap(() => this.officeSrv.getListSimple()),
                tap(os => {
                    os.forEach((o: Office) => {
                        offices[o.id] = this.lookupToChartNode(o.id, o.description, null, o.responsible, Level.Office);
                    });
                }),
                switchMap(() => this.httpSrv.get<Organization[]>(ORGANIZATION_URL))
            )
            .subscribe((organizations: Organization[]) => {
                organizations.forEach(org => {
                    // todo: add person
                    if (org.division) {
                        // don't do shit!
                    } else if (org.department) {
                        const p = divisions[org.parentId];
                        const c = departments[org.department];
                        if (p && c) {
                            p.children.push(c);
                        }
                    } else if (org.service) {
                        const p = departments[org.parentId];
                        const c = services[org.service];
                        if (p && c) {
                            p.children.push(c);
                        }
                    } else if (org.office) {
                        const p = services[org.parentId];
                        const c = offices[org.office];
                        if (p && c) {
                            p.children.push(c);
                        }
                    }
                });
                this.shellSrv.setLoading(false);
            });
    }

    loadPersonName(id: number) {
        if (id) {
            this.personSrv.get(id)
                .subscribe((p: Employee) => this.people[p.id] = this.langSrv.formatFullName(p.firstName, p.lastName));
        }
    }

    lookupToChartNode(id: number, description: string, parent: number, responsibleId: number, level: Level): OrgTreeNode {
//        const types = [
//           ' ',
//           'COMMON_DIVISION',
//           'COMMON_DEPARTMENT',
//           'COMMON_SERVICE',
//           'COMMON_OFFICE'
//        ];
        let imgModel = null;
        if (responsibleId) {
            imgModel = new ImageModel(this.httpSrv);
            imgModel.readOnly = true;
            imgModel.setImageUrl(this.personSrv.getPhotoUrl(responsibleId), false);
            this.loadPersonName(responsibleId);
        }
        const node: OrgTreeNode = {
            id: id,
            parentId: parent,
            // chart fields
            responsible: responsibleId,
            name: description,
//            type: this.langSrv.translate(types[level]),
            css: this.defaultStyle,
            imageModel: imgModel,
            children: []
        };
        node.onClick = () => this.select(node, level);
        return node;
    }

    select(node: OrgTreeNode, level: Level) {
        if (level === this.selectedLevel && this.selected != null && node.id === this.selected.id) {
            this.deselect();
            this.updateUi();
            return;
        }
        this.deselect();
        this.selectedLevel = level;
        this.selected = node;
        node.cssClass = 'selected';
        this.updateUi();
    }

    deselect() {
        if (this.selected) {
            this.selected.cssClass = '';
        }
        this.selected = null;
        this.selectedLevel = Level.None;
    }

    updateUi() {
        const disabled = this.selectedLevel === Level.None || this.selectedLevel == Level.Root;
        this.editButton.disabled = disabled;
        this.deleteButton.disabled = disabled;
        this.addButton.disabled = this.selectedLevel === Level.Office || this.selectedLevel === Level.None;
        this.shellSrv.updateShell();
    }

    public deleteSelected(): void {
        /*this.confirmationSrv.confirmDelete()
            .subscribe((b: boolean) => {
                if (b) {
                    if (this.selected && this.selected.id > 0) {
                        this.shellSrv.setLoading(true);
                        this.httpSrv.remove(this.getSelectedEntityUrl() + '/' + this.selected.id)
                            .subscribe(
                                () => {
                                    this.snackBarSrv.showSuccessMessage();
                                    this.refresh();
                                },
                                (err: HttpErrorResponse) => {
                                    this.snackBarSrv.showFailureMessage();
                                    this.shellSrv.setLoading(false);
                                    throw err;
                                }
                            );
                    }
                }
            });*/
    }

    public showDetail(create: boolean): void {
        if (!this.selected || !this.selectedLevel) {
            return;
        }

        const config = new MatDialogConfig();
        config.disableClose = true;
        config.width = '400px';
        config.maxWidth = '100%';
        config.data = {
            id: this.selected.id,
            level: this.selectedLevel,
        };
        this.matDialog.open(OrganizationsDetailComponent, config)
            .afterClosed()
            .subscribe((b: boolean) => {
                if (b) {
                    this.refresh();
                }
            });
    }
}
