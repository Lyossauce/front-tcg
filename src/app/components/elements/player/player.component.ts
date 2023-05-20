import { Component, Input } from '@angular/core';
import { Player, PlayerProperty, PlayerPropertyObject } from 'src/app/models/player.model';



@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  public PROPERTIES_TO_DISPLAY : PlayerPropertyObject[] = [
    {
      label: 'Health Points',
      propertyName: 'healthPoints'
    },
    {
      label: 'Mana',
      propertyName: 'mana'
    },
    {
      label: 'Hand Cards',
      propertyName: 'handCardsNumber',
    },
    {
      label: 'Hidden Cards',
      propertyName: 'hiddenCardsNumber',
    },
  ]

  @Input() player : Player;
}
