import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListContactsPage } from './list-contacts';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    ListContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListContactsPage),
  ],
  providers: [
    CallNumber,
  ],
})
export class ListContactsPageModule {}
