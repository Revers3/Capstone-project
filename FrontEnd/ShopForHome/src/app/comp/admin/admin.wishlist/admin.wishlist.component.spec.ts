import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWishlistComponent } from './admin.wishlist.component';

describe('AdminWishlistComponent', () => {
  let component: AdminWishlistComponent;
  let fixture: ComponentFixture<AdminWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminWishlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
