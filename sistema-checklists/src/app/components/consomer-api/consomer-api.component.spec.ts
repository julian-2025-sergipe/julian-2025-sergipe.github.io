import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsomerApiComponent } from './consomer-api.component';

describe('ConsomerApiComponent', () => {
  let component: ConsomerApiComponent;
  let fixture: ComponentFixture<ConsomerApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsomerApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsomerApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
