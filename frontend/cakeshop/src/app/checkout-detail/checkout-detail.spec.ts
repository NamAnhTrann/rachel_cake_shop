import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutDetail } from './checkout-detail';

describe('CheckoutDetail', () => {
  let component: CheckoutDetail;
  let fixture: ComponentFixture<CheckoutDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
