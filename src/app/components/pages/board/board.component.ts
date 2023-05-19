import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() gameId : string = "";
  @Output() goBack: EventEmitter<void> = new EventEmitter<void>();
}
