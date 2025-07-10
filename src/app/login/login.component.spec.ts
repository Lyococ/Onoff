import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authMock = jasmine.createSpyObj('AuthService', ['login', 'setToken']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should login and navigate on success', () => {
    const mockResponse = { token: 'abc123' };
    authServiceSpy.login.and.returnValue(of({
      token: 'abc123',
      userId: 'u123',
      email: 'test@mail.com',
      role: 'Admin'
    }));

    component.email = 'test@mail.com';
    component.password = '123456';
    component.onLogin();

    expect(authServiceSpy.login).toHaveBeenCalledWith('test@mail.com', '123456');
    expect(authServiceSpy.setToken).toHaveBeenCalledWith('abc123');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/todo']);
  });

  it('should display error message on failure', () => {
    const error = { message: 'Credenciales inválidas' };
    authServiceSpy.login.and.returnValue(throwError(() => error));

    component.onLogin();

    expect(component.errorMessage).toBe('Credenciales inválidas');
  });
});
