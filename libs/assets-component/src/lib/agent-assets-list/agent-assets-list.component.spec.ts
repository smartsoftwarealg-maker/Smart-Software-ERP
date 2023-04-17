import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentAssetsListComponent } from './agent-assets-list.component';

describe('AgentAssetsListComponent', () => {
    let component: AgentAssetsListComponent;
    let fixture: ComponentFixture<AgentAssetsListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AgentAssetsListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AgentAssetsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
