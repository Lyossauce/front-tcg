import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { ButtonComponent } from '../../elements/button/button.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent, ButtonComponent]
    });
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display button goBack', () => {
    expect(fixture.nativeElement.querySelector('app-button')).toBeTruthy();
  })
});
