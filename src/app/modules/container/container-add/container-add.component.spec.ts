import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerAddComponent } from './container-add.component';

describe('ContainerAddComponent', () => {
  let component: ContainerAddComponent;
  let fixture: ComponentFixture<ContainerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
