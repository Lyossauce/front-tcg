import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { HttpService } from 'src/app/services/http/http.service';
import { PlayersService } from 'src/app/services/players/players.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  private subscription : Subscription = new Subscription();

  public players: Player[] = [];

  @Input() gameId : string = "";
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private httpService: HttpService,
    private playersService: PlayersService,
  ) {
    this.subscription.add(this.playersService.getPlayersSubject().subscribe((players: Player[]) => {
      this.players = [...players];

      console.log(this.players);
    }));
  }

  ngOnInit(): void {
    this.playersService.fetchPlayers(this.gameId);
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }
}
