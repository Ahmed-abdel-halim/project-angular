import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent1 } from './register1.component';

describe('RegisterComponent1', () => {
  let component: RegisterComponent1;
  let fixture: ComponentFixture<RegisterComponent1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent1);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
