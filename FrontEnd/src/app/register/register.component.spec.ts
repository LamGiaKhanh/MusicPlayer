import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let elements = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    elements = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TC_DK_01 - Register button should disable when one of the field is empty', async() => {
    
    fixture.whenStable().then( () => {
      let email = component.registerForm.controls['email'];
      email.setValue("")

      let password = component.registerForm.controls['password'];
      password.setValue("")

      let confirm = component.registerForm.controls['confirm'];
      confirm.setValue("17110214")
      expect(component.registerForm.invalid).toBeTrue();
    })
  });

  it('TC_DK_02 - Password length error should be raise', async() => {
    
    fixture.whenStable().then( () => {
      let email = component.registerForm.controls['email'];
      email.setValue("17110214@gmail.com")

      let password = component.registerForm.controls['password'];
      password.setValue("123")
      expect(password.errors['minlength']).toBeTruthy();

      let confirm = component.registerForm.controls['confirm'];
      confirm.setValue("123")
      expect(component.registerForm.invalid).toBeTrue();
    })
  });

  it('TC_DK_03 - Unmatched passwords error should be raise', async() => {
    
    fixture.whenStable().then( () => {
      let email = component.registerForm.controls['email'];
      email.setValue("17110214@gmail.com")

      let password = component.registerForm.controls['password'];
      password.setValue("123456")

      let confirm = component.registerForm.controls['confirm'];
      confirm.setValue("123")

      fixture.detectChanges();
      expect(elements.nativeElement.querySelector('button').disabled).toBeTruthy();
    })
  });

});
