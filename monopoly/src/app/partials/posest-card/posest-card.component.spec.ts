import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosestCardComponent } from './posest-card.component';

describe('PosestCardComponent', () => {
  let component: PosestCardComponent;
  let fixture: ComponentFixture<PosestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PosestCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PosestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
