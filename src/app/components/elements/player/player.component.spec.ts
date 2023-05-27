import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerComponent } from './player.component';
import { By } from '@angular/platform-browser';

describe('PlayerComponent', () => {
  let component: PlayerComponent;
  let fixture: ComponentFixture<PlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerComponent]
    });
    fixture = TestBed.createComponent(PlayerComponent);
    component = fixture.componentInstance;
    component.player = {
      id: "1",
      name: "Player 1",
      healthPoints: 30,
      handCards: [],
      hiddenCards: [],
      isPlaying: false,
      mana: 0,
      turnNumber: 0,
      playOrder: 0,
      handCardsNumber: 0,
      hiddenCardsNumber: 0
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all player information', () => {
    fixture.detectChanges();
    let title = fixture.debugElement.query(By.css(".title"));
    let properties = fixture.debugElement.queryAll(By.css('.property'))
    expect(title.nativeElement.textContent).toBe("Player 1");
    expect(properties[0].nativeElement.textContent).toBe("Health Points : 30");
    expect(properties[1].nativeElement.textContent).toBe("Mana : 0");
    expect(properties[2].nativeElement.textContent).toBe("Hand Cards : 0");
    expect(properties[3].nativeElement.textContent).toBe("Hidden Cards : 0");
  });
});
