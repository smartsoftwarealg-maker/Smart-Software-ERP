import {Component, OnInit, OnDestroy} from '@angular/core';
import {ShellService, SideNavNode} from '@ss/common/ui-shell';
import {LanguageService} from "@ss/common/ui-lang";

interface NavNode {
    icon: string[];
    name: string[];
    route: string;
}

@Component({
    selector: 'ss-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {

    links: NavNode[] = [];

    constructor(private shellSrv: ShellService, public langSrv: LanguageService) {
    }

    ngOnInit(): void {
        this.shellSrv.setTilte('SMART_ERP');
        this.shellSrv.enableSearch(
            'SEARCH_APP',
            e => e.subscribe(
                f => {
                    const lowF = f ? f.toLowerCase().trim() : null;
                    if (f && f.length) {
                        const flatTree: NavNode[] = this.flattenNodes(this.shellSrv.sideNavDataSource.data, [], []);
                        this.links = flatTree.filter(n => n.name.join(', ').toLowerCase().indexOf(lowF) >= 0);
                    } else {
                        this.links = [];
                    }
                },
                err => console.error(err)
            )
        );
    }

    flattenNode(node: SideNavNode, parentName: string[], parentIcon: string[]): NavNode[] {
        if (node) {
            const result: NavNode = {
                icon: parentIcon.concat(node.icon),
                name: parentName.concat(this.langSrv.translate(node.name)),
                route: node.route
            };
            let arr: NavNode[] = [result];
            if (node.children && node.children.length) {
                arr = arr.concat(...this.flattenNodes(node.children, result.name, result.icon));
            }
            return arr;
        }
        return [];
    }

    flattenNodes(nodes: SideNavNode[], parentName: string[], parentIcon: string[]): NavNode[] {
        if (nodes && nodes.length) {
            return [].concat(...nodes.map(n => this.flattenNode(n, parentName, parentIcon)));
        }
        return [];
    }

    ngOnDestroy(): void {
        this.shellSrv.reset();
    }

}
