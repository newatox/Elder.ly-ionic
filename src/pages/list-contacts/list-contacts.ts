import { Component, ViewChild } from '@angular/core';
import { Events, ModalController, NavController, Platform, Tab, Tabs } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AddEditContactPage } from '../add-edit-contact/add-edit-contact';
import Contact from '../../models/Contact';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { DetailsContactPage } from '../details-contact/details-contact';
import { TranslateService } from '@ngx-translate/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NetworkService } from '../../services/NetworkService';
import { CallNumber } from '@ionic-native/call-number';
import { FavoriteProvider } from '../../providers/favorite/favorite';

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
  searchBarInput: string = '';

  favoriteContactsTabName = 'FAVORITE_TAB';
  allContactsTabName = 'ALL_TAB';
  frequentContactsTabName = 'FREQUENT_TAB';

  @ViewChild('tabbar') tabRef: Tabs;
  @ViewChild('fav') tabFav: Tab;
  @ViewChild('all') tabAll: Tab;
  @ViewChild('frq') tabFrq: Tab;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public contactProvider: ContactsProvider,
    public translate: TranslateService,
    public splashScreen: SplashScreen,
    public events: Events,
    public platform: Platform,
    public networkService: NetworkService,
    private callNumber: CallNumber,
    public favProvider: FavoriteProvider,
  ) {
    /**
     * Tab names cannot be translated in HTML with the 'translate' pipe (no pipe allowed there).
     * Therefore I translate them here.
     */
    translate.get(this.favoriteContactsTabName).subscribe(
      (translation) => {
        this.favoriteContactsTabName = translation;
      });
    translate.get(this.allContactsTabName).subscribe(
      (translation) => {
        this.allContactsTabName = translation;
      });
    translate.get(this.frequentContactsTabName).subscribe(
      (translation) => {
        this.frequentContactsTabName = translation;
      });

    // Subscribe to the login event
    this.events.subscribe('auth:login', () => { this.isLogged = true; this.fetchContacts(); });
  }

  ionViewDidLoad() {
    this.networkService.watch();
    if (!this.isLogged) {
      const loginModal = this.modalCtrl.create(LoginPage);
      loginModal.present().then(() => { console.log('login opened'); });
    } else {
      if (this.platform.is('ios') || this.platform.is('android')) {
        this.splashScreen.hide();
      }
    }
  }

  ionViewDidEnter() {
    if (this.isLogged) { this.fetchContacts(); }
  }

  fetchContacts() {
    this.contactProvider.all()
      .then((result) => {
        this.resetList();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  callContact(contact: Contact) {
    event.stopPropagation();
    event.preventDefault();
    this.favProvider.increaseFrequentStatus(contact,2).then(() => {

    });
    this.callNumber.callNumber(contact.phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  navigateToDetails(contact) {
    this.navCtrl.push(DetailsContactPage, { contact }).then();
  }

  openAddEdit() {
    this.navCtrl.push(AddEditContactPage).then();
  }

  displayFavorites() {
    const promises = [];
    this.favorites = [];
    this.contacts.map((contact) => {
      promises.push(new Promise ((resolve, reject) => {
        this.favProvider.isLocalFavorite(contact)
          .then((isFav: boolean) => {
            if (isFav) this.favorites.push(contact);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      }));
    });
    Promise.all(promises)
      .then(() => {
        this.displayedList = this.favorites;
        if (this.searchBarInput !== '')
          this.searchLocalContacts(this.searchBarInput, this.favorites);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  displayFrequent() {
    this.frequents = [];
    this.favProvider.getMostFrequentContacts()
      .then((frequentContacts: {id, frequency}[]) => {
        frequentContacts.forEach((frequentContact) => {
          this.contacts.map((contact) => {
            if (contact.wsId === frequentContact.id) {
              this.frequents.push(contact);
            }
          });
        });
        this.displayedList = this.frequents;
        if (this.searchBarInput !== '')
          this.searchLocalContacts(this.searchBarInput, this.frequents);
      })
      .catch((error) => {
        console.log(error);
      });
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
    else if (currentTab === this.tabFrq) this.searchLocalContacts(content, this.frequents);
  }

  searchLocalContacts(content: string, list: Contact[]) {
    const matchingContacts = [];
    const normalizedContent = content.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const regExp = RegExp(normalizedContent, 'gi');
    list.forEach((contact) => {
      if (contact.firstName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').search(regExp) !== -1
        || contact.lastName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').search(regExp) !== -1
        || contact.email.normalize('NFD').replace(/[\u0300-\u036f]/g, '').search(regExp) !== -1)
        matchingContacts.push(contact);
    });
    this.displayedList = matchingContacts;
  }

}
