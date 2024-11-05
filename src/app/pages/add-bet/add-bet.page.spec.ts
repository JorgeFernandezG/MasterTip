import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBetPage } from './add-bet.page';

describe('AddBetPage', () => {
  let component: AddBetPage;
  let fixture: ComponentFixture<AddBetPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddBetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
