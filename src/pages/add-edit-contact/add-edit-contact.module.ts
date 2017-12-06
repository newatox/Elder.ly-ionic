import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEditContactPage } from './add-edit-contact';

@NgModule({
  declarations: [
    AddEditContactPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEditContactPage),
  ],
})
export class AddEditContactPageModule {}
