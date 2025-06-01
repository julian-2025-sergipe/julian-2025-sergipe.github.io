import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCognitoComponent } from './login-cognito.component';

describe('LoginCognitoComponent', () => {
  let component: LoginCognitoComponent;
  let fixture: ComponentFixture<LoginCognitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCognitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCognitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
