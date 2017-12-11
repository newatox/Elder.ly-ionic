import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, Tab, Tabs } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddEditContactPage } from '../add-edit-contact/add-edit-contact';
import Contact from '../../models/Contact';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { DetailsContactPage } from '../details-contact/details-contact';

@Component({
  selector: 'page-list',
  templateUrl: 'list-contacts.html',
})
export class ListContactsPage {
  isLogged: boolean = false;
  displayedList: Contact[] = [];
  contacts: Contact[] = [];
  favorites: Contact[] = [];
  frequents: Contact[] = [];
  root = DetailsContactPage;
  searchBarInput: string;

  @ViewChild('tabbar') tabRef: Tabs;
  @ViewChild('fav') tabFav: Tab;
  @ViewChild('all') tabAll: Tab;
  @ViewChild('frq') tabFrq: Tab;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,
              public contactProvider: ContactsProvider) {
  }

  ionViewDidLoad() {
    if (!this.isLogged) {
      const loginModal = this.modalCtrl.create(LoginPage);
      loginModal.present().then(() => { console.log('login opened'); });
    }
  }

  ionViewDidEnter() {
    this.contactProvider.all()
      .then((result) => {
        this.contacts = result;
        this.resetList();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openAddEdit() {
    this.navCtrl.push(AddEditContactPage).then();
  }

  displayFavorites() {
    this.favorites = [];
    this.contacts.map((contact) => { if (contact.isFavorite) this.favorites.push(contact); });
    this.favorites.sort((a, b) => { return a.firstName.localeCompare(b.firstName); });
    this.displayedList = this.favorites;
    if (this.searchBarInput !== '')
      this.searchLocalContacts(this.searchBarInput, this.favorites);
  }
  displayFrequent() {
    this.frequents = [];
    this.contacts.sort((a, b) => b.frequency - a.frequency);
    this.contacts.map((contact) => {
      if (contact.frequency > 0 && this.frequents.length < 5) this.frequents.push(contact);
    });
    this.displayedList = this.frequents;
  }
  displayAllContacts() {
    this.contacts.sort((a, b) => { return a.firstName.localeCompare(b.firstName); });
    this.displayedList = this.contacts;
    if (this.searchBarInput !== '')
      this.searchLocalContacts(this.searchBarInput, this.contacts);
  }
  resetList() {
    const currentTab = this.tabRef.getSelected();
    if (currentTab === this.tabAll) this.displayAllContacts();
    else if (currentTab === this.tabFav) this.displayFavorites();
    else if (currentTab === this.tabFrq) this.displayFrequent();
  }
  doSearch(ev) {
    const content = ev.target.value;
    const currentTab = this.tabRef.getSelected();
    if (!content || !content.trim()) {
      this.resetList();
      return;
    }
    console.log(this.searchBarInput);
    if (currentTab === this.tabAll) this.searchLocalContacts(content, this.contacts);
    else if (currentTab === this.tabFav) this.searchLocalContacts(content, this.favorites);
  }
  searchLocalContacts(content: string, list: Contact[]) {
    const matchingContacts = [];
    const regExp = RegExp(content, 'gi');
    list.forEach((contact) => {
      if (contact.firstName.search(regExp) !== -1
        || contact.lastName.search(regExp) !== -1
        || contact.email.search(regExp) !== -1)
        matchingContacts.push(contact);
    });
    this.displayedList = matchingContacts;
  }

}
