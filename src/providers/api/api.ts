import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const BASE_URL = "http://familink.cleverapps.io/";
const LOGIN = "public/login";

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  login(body: {phone: String, password: String}) {
    console.log('API-PROVIDER', 'login');
    return this.http.post(`${BASE_URL}${LOGIN}`, body).subscribe();
  }

}
