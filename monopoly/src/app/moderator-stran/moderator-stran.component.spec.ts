import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorStranComponent } from './moderator-stran.component';

describe('ModeratorStranComponent', () => {
  let component: ModeratorStranComponent;
  let fixture: ComponentFixture<ModeratorStranComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorStranComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorStranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
