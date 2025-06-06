import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JanelaModalSectionComponent } from './janela-modal-section.component';

describe('JanelaModalSectionComponent', () => {
  let component: JanelaModalSectionComponent;
  let fixture: ComponentFixture<JanelaModalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JanelaModalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JanelaModalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
