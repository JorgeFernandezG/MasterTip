import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BetsPage } from './bets.page';

describe('BetsPage', () => {
  let component: BetsPage;
  let fixture: ComponentFixture<BetsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
