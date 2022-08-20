import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportSelectorComponent } from './report-selector/report-selector.component';
import { ReportViewerComponent } from './report-viewer/report-viewer.component';
import { ReportSelectorService } from './report-selector/report-selector.service';
import { ReportViewerService } from './report-viewer/report-viewer.service';
import { ReportViewComponent } from './report-view/report-view.component';
import { ReportService } from './report-service';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SafePipe } from './safe.directive';
import { ReportCatalogComponent } from './report-catalog/report-catalog.component';
import { ReportCatalogDetailComponent } from './report-catalog-detail/report-catalog-detail.component';
import { ReportCatalogService } from './report-catalog/report-catalog.service';
import { SaveBarModule } from '../../../common/save-bar/save-bar.module';
import { MaterialModule } from '../material.module';
import { PaginationModule } from '../../../common/pagination/pagination.module';
import { CommonUiLangModule } from '@ss/common/ui-lang';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        PaginationModule,
        SaveBarModule,
        MaterialModule,
        CommonUiLangModule
    ],
    declarations: [
        ReportViewerComponent,
        ReportSelectorComponent,
        ReportViewComponent,
        SafePipe,
        ReportCatalogComponent,
        ReportCatalogDetailComponent
    ],
    exports: [
        SafePipe
    ],
    providers: [
        ReportSelectorService,
        ReportViewerService,
        ReportCatalogService,
        ReportService
    ]
})
export class ReportsModule {
}
