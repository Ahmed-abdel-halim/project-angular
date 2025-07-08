import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowdetilsComponent } from './showdetils.component';

describe('ShowdetilsComponent', () => {
  let component: ShowdetilsComponent;
  let fixture: ComponentFixture<ShowdetilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowdetilsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowdetilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
