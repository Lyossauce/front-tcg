import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpGetPlayerResponse, PlayCardObject, Player } from 'src/app/models/player.model';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  private subscription: Subscription = new Subscription();
  private players : Player[] = [];

  private $players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>(this.players);
  private $playersError: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);  
  constructor(
    private httpService: HttpService
  ) { }

  public getPlayersSubject(): BehaviorSubject<Player[]> {
    return this.$players;
  }

  public getPlayersErrorSubject(): BehaviorSubject<string | undefined> {
    return this.$playersError;
  }

  public fetchPlayers(gameId: string): void {
    this.subscription.add(this.httpService.getPlayers(gameId).subscribe({
      next: (response: HttpGetPlayerResponse) => {
        const players = this.formatePlayers(response);
        this.players = [...players];
        this.$players.next([...players]);
        this.$playersError.next(undefined);
      },
      error: (error: any) => {
        this.$playersError.next(error.message);
      }
    }));
  }

  public playCard(input: PlayCardObject): void {
    this.subscription.add(this.httpService.playCard(input).subscribe({
      next: () => {
        this.fetchPlayers(input.gameId);
      },
      error: (error: any) => {
        this.$playersError.next(error.message);
      }
    }));
  }

  public quitGame(): void {
    this.players = [];
    this.$players.next([]);
    this.$playersError.next(undefined);
  }

  private formatePlayers(response: HttpGetPlayerResponse): Player[] {
    return response.results.map((player: Player) => {
      return {
        ...player,
        handCardsNumber: player.handCards.length,
        hiddenCardsNumber: player.hiddenCards.length,
      }
    })
  }

}
