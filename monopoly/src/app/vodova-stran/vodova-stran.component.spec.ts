import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodovaStranComponent } from './vodova-stran.component';

describe('VodovaStranComponent', () => {
  let component: VodovaStranComponent;
  let fixture: ComponentFixture<VodovaStranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodovaStranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodovaStranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
