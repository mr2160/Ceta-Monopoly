import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VodCardComponent } from './vod-card.component';

describe('VodCardComponent', () => {
  let component: VodCardComponent;
  let fixture: ComponentFixture<VodCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VodCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VodCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
