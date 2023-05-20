import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { AppModule } from 'src/app/app.module';
import { PlayersService } from 'src/app/services/players/players.service';
import { of } from 'rxjs';
import { PLAYERS } from 'src/datas/players';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  const playersServiceSpy : any = jasmine.createSpyObj('PlayersService', ["getPlayersSubject", "fetchPlayers"]);

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
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
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

  it('should display button goBack', () => {
    expect(fixture.nativeElement.querySelector('app-button')).toBeTruthy();
  })
});
