import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text : string = "";
  @Input() disabled : boolean = false;
  @Output() buttonClicked: EventEmitter<void> = new EventEmitter<void>();
}
