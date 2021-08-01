import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptLookupComponent } from './receipt-lookup.component';

describe('ReceiptLookupComponent', () => {
  let component: ReceiptLookupComponent;
  let fixture: ComponentFixture<ReceiptLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceiptLookupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
