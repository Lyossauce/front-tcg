import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public isGameStarted: boolean = false;
  public gameId: string = "";

  constructor() {}

  public startGame(): void {
    this.isGameStarted = true;
  }

  public goBack(): void {
    this.isGameStarted = false;
  }
}
