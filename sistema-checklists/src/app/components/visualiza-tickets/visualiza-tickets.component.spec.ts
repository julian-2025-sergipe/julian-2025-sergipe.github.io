import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizaTicketsComponent } from './visualiza-tickets.component';

describe('VisualizaTicketsComponent', () => {
  let component: VisualizaTicketsComponent;
  let fixture: ComponentFixture<VisualizaTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizaTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizaTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
