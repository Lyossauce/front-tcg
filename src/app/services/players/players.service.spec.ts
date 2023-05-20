import { TestBed } from '@angular/core/testing';

import { PlayersService } from './players.service';
import { HttpService } from '../http/http.service';
import { PLAYERS } from 'src/datas/players';
import { Player } from 'src/app/models/player.model';
import { of, throwError } from 'rxjs';

describe('PlayersService', () => {
  let service: PlayersService;
  let httpService : HttpService

  const httpServiceSpy = jasmine.createSpyObj('HttpService', ["getPlayers"]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpService, useValue: httpServiceSpy},
        PlayersService
      ]
    });
    service = TestBed.inject(PlayersService);
    httpService = TestBed.inject(HttpService);

    service['players'] = PLAYERS;
    service['$players'].next(PLAYERS);
    service['$playersError'].next(undefined);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get players subject', () => {
    service.getPlayersSubject().subscribe((players: Player[]) => {
      expect(players).toEqual(PLAYERS);
    });
  });

  it('should get players error subject', () => {
    service.getPlayersErrorSubject().subscribe((error: string | undefined) => {
      expect(error).toEqual(undefined);
    });
  });

  it('should fetch players with no errors', () => {
    httpServiceSpy.getPlayers.and.returnValue(of({results: PLAYERS}));
    service.fetchPlayers('gameId');
    expect(service['players']).toEqual(PLAYERS);
    expect(service['$players'].value).toEqual(PLAYERS);
    expect(service['$playersError'].value).toEqual(undefined);
  });

  it('should fetch players with errors', () => {
    httpServiceSpy.getPlayers.and.returnValue(
      throwError(() => new Error('Error message'))
    );
    service.fetchPlayers('gameId');
    expect(service['$playersError'].value).toEqual('Error message');
  });

  it('should quit game', () => {
    service.quitGame();
    expect(service['players']).toEqual([]);
    expect(service['$players'].value).toEqual([]);
    expect(service['$playersError'].value).toEqual(undefined);
  }); 
});
