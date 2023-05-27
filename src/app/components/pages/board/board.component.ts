import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { PlayersService } from 'src/app/services/players/players.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  private subscription : Subscription = new Subscription();

  public players: Player[] = [];
  public passivePlayers: Player[] = [];
  public activePlayer: Player;

  public loading: boolean = true;

  @Input() gameId : string = "";
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private playersService: PlayersService,
  ) {
    this.subscription.add(this.playersService.getPlayersSubject().subscribe((players: Player[]) => {
      this.players = [...players];

      this.activePlayer = this.players.find((player: Player) => player.isPlaying) as Player;
      this.passivePlayers = this.players.filter((player: Player) => !player.isPlaying);

      this.loading = false;
    }));
  }

  ngOnInit(): void {
    this.playersService.fetchPlayers(this.gameId);
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

  skipTurn(): void {
    this.playCard('skip');
  }

  playCard(cardId: string): void {
    this.loading = true;
    this.playersService.playCard({
      cardId,
      gameId: this.gameId,
      playerId: this.activePlayer.id
    });
  }
}
