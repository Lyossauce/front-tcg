import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent]
    });
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.card = "1";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display mana and damage', () => {
    fixture.detectChanges();
    let mana = fixture.nativeElement.querySelector('.mana');
    let damage = fixture.nativeElement.querySelector('.damage');
    expect(mana.textContent).toBe("1");
    expect(damage.textContent).toBe("1");
  })
});
