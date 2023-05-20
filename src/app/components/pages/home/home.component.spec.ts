import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ButtonComponent } from '../../elements/button/button.component';
import { BoardComponent } from '../board/board.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, ButtonComponent, BoardComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`shouldn't show board on start but should display button`, () => {
    component.isGameStarted = false;
    expect(fixture.nativeElement.querySelector('app-board')).toBeFalsy();
    expect(fixture.nativeElement.querySelector('app-button')).toBeTruthy();
  });

  it('should display board on startGame event', () => {
    component.isGameStarted = false;
    component.startGame();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('app-board')).toBeTruthy();
    expect(component.isGameStarted).toBeTruthy();
  });

});
