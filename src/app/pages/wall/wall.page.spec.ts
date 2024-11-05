import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WallPage } from './wall.page';

describe('WallPage', () => {
  let component: WallPage;
  let fixture: ComponentFixture<WallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
