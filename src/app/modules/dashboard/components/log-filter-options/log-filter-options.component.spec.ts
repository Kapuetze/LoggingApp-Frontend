import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogFilterOptionsComponent } from './log-filter-options.component';

describe('LogFilterOptionsComponent', () => {
  let component: LogFilterOptionsComponent;
  let fixture: ComponentFixture<LogFilterOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogFilterOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
