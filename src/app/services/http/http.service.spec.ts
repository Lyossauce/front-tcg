import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

import { HttpService } from './http.service';
import { AppModule } from 'src/app/app.module';
import { HttpGetPlayerResponse, Player } from 'src/app/models/player.model';
import { environment } from 'src/environments/environments';
import { GameCreationObject } from 'src/app/models/game.model';
import { HttpCreatedBody } from 'src/app/models/utils.model';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule,
        HttpClientTestingModule,
      ],
      providers: [
        HttpService
      ]
    });

    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject<HttpTestingController>(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get players', () => {
    service.getPlayers("id").subscribe((response: HttpGetPlayerResponse) => {
      expect(response).toBeTruthy('No players returned');
    });

    const req = httpTestingController.expectOne(`${environment.backurl}/games/id/players`);
    expect(req.request.method).toEqual('GET');
  });

  it('should create game', () => {
    const gameCreationObject : GameCreationObject = {
      player1Name: "name",
      player2Name: "name",
    };
    service.createGame(gameCreationObject).subscribe((response: HttpCreatedBody) => {
      expect(response).toBeTruthy('No game created');
    });

    const req = httpTestingController.expectOne(`${environment.backurl}/games`);
    expect(req.request.method).toEqual('POST');
  });

  it('should play card', () => {
    const playCardObject = {
      gameId: "id",
      playerId: "id",
      cardId: "id",
    };
    service.playCard(playCardObject).subscribe((response: any) => {
      expect(response).toBeTruthy('No card played');
    });

    const req = httpTestingController.expectOne(`${environment.backurl}/games/${playCardObject.gameId}/players/${playCardObject.playerId}/card`);
    expect(req.request.method).toEqual('POST');
  });

});
