import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCorrectOptionsComponent } from './add-correct-options.component';

describe('AddCorrectOptionsComponent', () => {
  let component: AddCorrectOptionsComponent;
  let fixture: ComponentFixture<AddCorrectOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCorrectOptionsComponent]
    });
    fixture = TestBed.createComponent(AddCorrectOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
