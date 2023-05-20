import { Injectable } from '@angular/core';
import { HttpGetPlayerResponse, PlayCardObject, Player } from 'src/app/models/player.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { GameCreationObject } from 'src/app/models/game.model';
import { HttpCreatedBody } from 'src/app/models/utils.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly backUrl: string = environment.backurl;

  constructor(
    private http: HttpClient
  ) { }

  public getPlayers(gameId: string): Observable<HttpGetPlayerResponse> {
    return this.http.get<HttpGetPlayerResponse>(`${this.backUrl}/games/${gameId}/players`);
  }

  public createGame(body: GameCreationObject): Observable<HttpCreatedBody> {
    return this.http.post(`${this.backUrl}/games`, body) as Observable<HttpCreatedBody>;
  }

  public playCard(playCardObject: PlayCardObject): Observable<any> {
    return this.http.post(`${this.backUrl}/games/${playCardObject.gameId}/players/${playCardObject.playerId}/cards`, 
    {cardId: playCardObject.cardId});
  }
}
