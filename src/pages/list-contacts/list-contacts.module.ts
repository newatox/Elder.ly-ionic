import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListContactsPage } from './list-contacts';
import {ContactCellComponent} from "../../components/contact-cell/contact-cell";

@NgModule({
  declarations: [
    ListContactsPage,
    ContactCellComponent,
  ],
  imports: [
    IonicPageModule.forChild(ListContactsPage),
  ],
})
export class ListContactsPageModule {}
