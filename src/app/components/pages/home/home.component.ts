import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpCreatedBody } from 'src/app/models/utils.model';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private subscription : Subscription = new Subscription();

  public isGameStarted: boolean = false;
  public gameId: string = "";

  constructor(
    private httpService: HttpService,
  ) {}

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

  public startGame(): void {
    this.subscription.add(this.httpService.createGame({player1Name: "player1", player2Name: "player2"}).subscribe((response: HttpCreatedBody) => {
      this.gameId = response.id;
      this.isGameStarted = true;

      console.log(this.gameId);
      console.log(this.isGameStarted);
    }));
  }

  public goBack(): void {
    this.isGameStarted = false;
  }
}
