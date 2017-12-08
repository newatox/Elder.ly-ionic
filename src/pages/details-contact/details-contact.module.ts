import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsContactPage } from './details-contact';
import { PhonePipe } from '../../pipes/phone/phone';

@NgModule({
  declarations: [
    DetailsContactPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsContactPage),
    PhonePipe,
  ],
})
export class DetailsContactPageModule {}
