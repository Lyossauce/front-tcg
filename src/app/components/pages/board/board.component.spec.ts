import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { AppModule } from 'src/app/app.module';
import { PlayersService } from 'src/app/services/players/players.service';
import { of } from 'rxjs';
import { PLAYERS } from 'src/datas/players';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  const playersServiceSpy : any = jasmine.createSpyObj('PlayersService', ["getPlayersSubject", "getPlayersErrorSubject", "fetchPlayers", "playCard"]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        { provide: PlayersService, useValue: playersServiceSpy }
      ],
      declarations: [BoardComponent]
    });
    playersServiceSpy.getPlayersSubject.and.returnValue(of(PLAYERS));
    playersServiceSpy.getPlayersErrorSubject.and.returnValue(of('error'));
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    component.gameId = "1";
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch players on init', () => {
    expect(playersServiceSpy.getPlayersSubject).toHaveBeenCalled();
    expect(playersServiceSpy.fetchPlayers).toHaveBeenCalled();
    expect(component.players).toEqual(PLAYERS);
  });

  it('should display Quit game and Skip Turn button', () => {
    const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe("Quit Game");
    expect(buttons[1].textContent).toBe("Skip Turn");
  })

  it('should display players', () => {
    const players = fixture.debugElement.nativeElement.querySelectorAll('app-player');
    expect(players.length).toBe(PLAYERS.length);
  });

  it('should display error', () => {
    const error = fixture.debugElement.nativeElement.querySelector('.error');
    expect(error.textContent).toBe("error");
  });

  it('should display cards', () => {
    const cards = fixture.debugElement.nativeElement.querySelectorAll('app-card');
    expect(cards.length).toBe(PLAYERS[0].handCards.length);
  });

  it('should display turn number and active player', () => {
    const activePlayer = fixture.debugElement.nativeElement.querySelector('.playing');
    expect(activePlayer.textContent).toBe("Round 1: Player 1 is Playing !");
  })

  it('should playCard on skip turn', () => {
    const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
    const skipTurnButton = buttons[1];
    skipTurnButton.click();
    expect(playersServiceSpy.playCard).toHaveBeenCalled();
    expect(component.loading).toBe(true);
  })

  it('should playCard on card click', () => {
    const card = fixture.debugElement.nativeElement.querySelector('app-card');
    card.click();
    expect(playersServiceSpy.playCard).toHaveBeenCalled();
    expect(component.loading).toBe(true);
  })

  it('should quit game on quit game click', () => {
    spyOn(component.goBack, "emit");
    const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
    const quitGameButton = buttons[0];
    quitGameButton.click();
    expect(component.goBack.emit).toHaveBeenCalled();
  })
});
