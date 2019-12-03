import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerManageComponent } from './container-manage.component';

describe('ContainerManageComponent', () => {
  let component: ContainerManageComponent;
  let fixture: ComponentFixture<ContainerManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
