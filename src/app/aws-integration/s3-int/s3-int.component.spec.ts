import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S3IntComponent } from './s3-int.component';

describe('S3IntComponent', () => {
  let component: S3IntComponent;
  let fixture: ComponentFixture<S3IntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S3IntComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S3IntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
