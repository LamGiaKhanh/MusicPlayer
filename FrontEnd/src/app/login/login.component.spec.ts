import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { LoginComponent } from './login.component';
import { StorageService } from '../storage.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],

    }).compileComponents();
    
  }));

  beforeEach(async() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('TC_DN_01 - Login button should disable when Email & Password empty', async() => {
    
    fixture.whenStable().then( () => {
      let email = component.loginForm.controls['email'];
      email.setValue("")
      let password = component.loginForm.controls['password'];
      password.setValue("")
      expect(component.loginForm.invalid).toBeTrue();
    })
  });

  it('TC_DN_02 - Should raise the invalid error at Email field', async() => {
    
    fixture.whenStable().then( () => {
      let email = component.loginForm.controls['email'];
      email.setValue("17110214@")
      expect(email.errors['pattern']).toBeTruthy();
      let password = component.loginForm.controls['password'];
      password.setValue("17110214")
      expect(component.loginForm.invalid).toBeTrue();
    })
  });

  it('TC_DN_03 - Should raise no error & Login button should enable', async() => {
    
    fixture.whenStable().then( () => {
      let email = component.loginForm.controls['email'];
      email.setValue("17110214@gmail.com")
      let password = component.loginForm.controls['password'];
      password.setValue("17110214")
      expect(component.loginForm.valid).toBeTrue();
    })
  });

  it('TC_DN_04 - User should be authorized', async() => {
    
    fixture.whenStable().then( () => {
      let email = component.loginForm.controls['email'];
      email.setValue("17110214@student.hcmute.edu.vn")
      let password = component.loginForm.controls['password'];
      password.setValue("121899")
      expect(component.loginForm.valid).toBeTrue();
      component.login();
      let account = sessionStorage.getItem(StorageService.accountStorage)
      expect(account).not.toEqual(null || undefined)
    })
  });

  it('TC_DN_05 - Invalid user error should be raised', async() => {
    
    fixture.whenStable().then( () => {
      let email = component.loginForm.controls['email'];
      email.setValue("17110214@student.hcmute.edu.vn")
      let password = component.loginForm.controls['password'];
      password.setValue("120699")
      expect(component.loginForm.valid).toBeTrue();
      component.login();
      let account = sessionStorage.getItem(StorageService.accountStorage)
      expect(account).toEqual(null)
    })
  });


});
