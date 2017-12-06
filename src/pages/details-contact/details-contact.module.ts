import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsContactPage } from './details-contact';

@NgModule({
  declarations: [
    DetailsContactPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsContactPage),
  ],
})
export class DetailsContactPageModule {}
