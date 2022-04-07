import { Component, OnInit } from '@angular/core';
import { HttpService, LanguageService } from '@ss/common/api-common';
import { DIVISIONS_URL, Division, Service, Department, DEPARTMENTS_URL, SERVICES_URL, Office, OFFICES_URL, Lookup } from '@ss/organizations/api-organizations';
import { switchMap } from 'rxjs';
import { KeepOnToolbar, ShellService, SnackBarService, ToolbarButton } from '@ss/common/ui-shell';
import { ConfirmationDialogService } from '@ss/common/ui-confirmation-dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { OrganizationsDetailComponent } from './organizations-detail.component';
import { TreeNode } from 'angular13-organization-chart';
import { EmployeeService, Employee } from '@ss/payroll/api-employee';
import { ImageModel } from '@ss/common/ui-image-input';
import {ActivatedRoute} from '@angular/router';

interface OrgTreeNode extends TreeNode {
    id: number;
    parentId: number;
    name: string;
    responsible?: number;
    imageModel?: ImageModel;
    children: OrgTreeNode[];
}

enum Level {
    None = -1,
    Root = 0,
    Division = 1,
    Department = 2,
    Service = 3,
    Office = 4
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
        this.httpSrv.get<Division[]>(DIVISIONS_URL)
            .pipe(
                switchMap((divs: Division[]) => {
                    this.root.children = divs.map(d => {
                        const node = this.lookupToChartNode(d.id, d.description, 0, d.responsible, Level.Division);
                        divisions[d.id] = node;
                        this.loadPersonName(d.responsible);
                        return node;
                    });
                    return this.httpSrv.get<Department[]>(DEPARTMENTS_URL[0] + 0 + DEPARTMENTS_URL[1]);
                }),
                switchMap((ds: Department[]) => {
                    ds.forEach(d => {
                        const node = this.lookupToChartNode(d.id, d.description, d.division, d.responsible, Level.Department);
                        departments[d.id] = node;
                        divisions[d.division]?.children.push(node);
                        this.loadPersonName(d.responsible);
                    });
                    return this.httpSrv.get<Service[]>(SERVICES_URL[0] + 0 + SERVICES_URL[1]);
                }),
                switchMap((srv: Service[]) => {
                    srv.forEach(s => {
                        const node = this.lookupToChartNode(s.id, s.description, s.department, s.responsible, Level.Service);
                        services[s.id] = node;
                        departments[s.department]?.children.push(node);
                        this.loadPersonName(s.responsible);
                    });
                    return this.httpSrv.get<Office[]>(OFFICES_URL[0] + 0 + OFFICES_URL[1]);
                })
            ).subscribe((offices: Office[]) => {
                offices.forEach(o => {
                    services[o.service]?.children.push(this.lookupToChartNode(o.id, o.description, o.service, null, Level.Office));
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
            console.log(this.httpSrv.baseUrl + this.personSrv.getPhotoUrl(responsibleId));
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
        console.log(node);
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

    getSelectedEntityUrl(): string {
        switch (this.selectedLevel) {
            case Level.Division:
                return DIVISIONS_URL;
            case Level.Department:
                return DEPARTMENTS_URL[0] + this.selected.parentId + DEPARTMENTS_URL[1];
            case Level.Service:
                return SERVICES_URL[0] + this.selected.parentId + SERVICES_URL[1];
            case Level.Office:
                return OFFICES_URL[0] + this.selected.parentId + OFFICES_URL[1];
        }
        return null;
    }

    public deleteSelected(): void {
        this.confirmationSrv.confirmDelete()
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
            });

    }

    public showDetail(create: boolean): void {
        let lookup: Division | Department | Service | Office = { id: 0, description: '', responsible: null };
        let title = '';
        let url = '';
        switch (this.selectedLevel) {
            case Level.Root:
                if (create) {
                    title = 'COMMON_EDIT_DIVISION';
                    url = DIVISIONS_URL;
                    lookup = { id: 0, description: '', responsible: null };
                } else {
                    return;
                }
                break;
            case Level.Division:
                if (create) {
                    title = 'COMMON_EDIT_DEPARTMENT';
                    url = DEPARTMENTS_URL[0] + this.selected.id + DEPARTMENTS_URL[1];
                    lookup = { id: 0, description: '', division: this.selected.id, responsible: null };
                } else {
                    title = 'COMMON_EDIT_DIVISION';
                    url = DIVISIONS_URL;
                    lookup = { id: this.selected.id, description: this.selected.name, responsible: this.selected.responsible };
                }
                break;
            case Level.Department:
                if (create) {
                    title = 'COMMON_EDIT_SERVICE';
                    url = SERVICES_URL[0] + this.selected.id + SERVICES_URL[1];
                    lookup = { id: 0, description: '', department: this.selected.id, responsible: null };
                } else {
                    title = 'COMMON_EDIT_DEPARTMENT';
                    url = DEPARTMENTS_URL[0] + this.selected.parentId + DEPARTMENTS_URL[1];
                    lookup = { id: this.selected.id, description: this.selected.name, division: this.selected.parentId, responsible: this.selected.responsible };
                }
                break;
            case Level.Service:
                if (create) {
                    title = 'COMMON_EDIT_OFFICE';
                    url = OFFICES_URL[0] + this.selected.id + OFFICES_URL[1];
                    lookup = { id: 0, description: '', service: this.selected.id, responsible: null };
                } else {
                    title = 'COMMON_EDIT_SERVICE';
                    url = SERVICES_URL[0] + this.selected.parentId + SERVICES_URL[1];
                    lookup = { id: this.selected.id, description: this.selected.name, department: this.selected.parentId, responsible: this.selected.responsible };
                }
                break;
            case Level.Office:
                if (!create) {
                    title = 'COMMON_EDIT_OFFICE';
                    url = OFFICES_URL[0] + this.selected.parentId + OFFICES_URL[1];
                    lookup = { id: this.selected.id, description: this.selected.name, service: this.selected.parentId };
                } else {
                    return;
                }
                break;
            default: return;
        }
        const config = new MatDialogConfig();
        config.disableClose = true;
        config.width = '400px';
        config.maxWidth = '100%';
        config.data = {
            url: url,
            title: title,
            lookup: lookup
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
