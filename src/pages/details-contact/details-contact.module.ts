import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsContactPage } from './details-contact';
import { PhonePipe } from '../../pipes/phone/phone';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    DetailsContactPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsContactPage),
    PhonePipe,
  ],
  providers: [
    CallNumber,
  ],
})
export class DetailsContactPageModule {}
