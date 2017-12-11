import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListContactsPage } from './list-contacts';

@NgModule({
  declarations: [
    ListContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(ListContactsPage),
  ],
})
export class ListContactsPageModule {}
