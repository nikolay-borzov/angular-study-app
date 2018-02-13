import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'input-error',
  templateUrl: 'input-error.html'
})
export class InputErrorComponent {
  @Input() input: ElementRef;

  constructor() {}
}
