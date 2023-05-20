import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HttpGetPlayerResponse, Player } from 'src/app/models/player.model';
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
        this.players = [...response.results];
        this.$players.next([...response.results]);
        this.$playersError.next(undefined);
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

}
