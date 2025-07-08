import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NNavbarComponent } from './n-navbar.component';

describe('NNavbarComponent', () => {
  let component: NNavbarComponent;
  let fixture: ComponentFixture<NNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
