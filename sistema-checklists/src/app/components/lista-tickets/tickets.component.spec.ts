import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTicketsComponent } from './tickets.component';

describe('TicketsComponent', () => {
  let component: ListaTicketsComponent;
  let fixture: ComponentFixture<ListaTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
