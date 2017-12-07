import { Component } from '@angular/core';

/**
 * Generated class for the ContactCellComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contact-cell',
  templateUrl: 'contact-cell.html',
})
export class ContactCellComponent {

  text: string;

  constructor() {
    console.log('Hello ContactCellComponent Component');
    this.text = 'Hello World';
  }

}
