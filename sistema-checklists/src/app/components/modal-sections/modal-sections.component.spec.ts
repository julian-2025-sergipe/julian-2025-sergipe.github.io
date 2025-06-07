import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSectionsComponent } from './modal-sections.component';

describe('ModalSectionsComponent', () => {
  let component: ModalSectionsComponent;
  let fixture: ComponentFixture<ModalSectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
