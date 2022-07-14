import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicLotteryComponent } from './basic-lottery.component';

describe('BasicLotteryComponent', () => {
  let component: BasicLotteryComponent;
  let fixture: ComponentFixture<BasicLotteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicLotteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicLotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
