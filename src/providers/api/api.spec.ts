import { ApiProvider } from './api';
import {TestBed, getTestBed, async, inject} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('Api Provider: Testing Web Services', () => {
    //let injector: TestBed;
    //let apiProvider: ApiProvider;
    //let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [ApiProvider]
      });
      //injector = getTestBed();
      //apiProvider = injector.get(ApiProvider);
      //httpMock = injector.get(HttpTestingController);
    });

    it('should get a foo', inject([ApiProvider], (apiProvider) =>
        apiProvider.login({phone: "0600000042", password: "0000"}).subscribe(jsonToken => {
          console.log('test jsonToken 1 : ', jsonToken);
          expect('a').toEqual('a')
        }))
    );

    it('should get a foo', async(() => {
      let apiP = TestBed.get(ApiProvider);
      apiP.login({phone: "0600000042", password: "0000"}).subscribe(jsonToken => {
        console.log('test jsonToken 2 : ', jsonToken);
        expect('a').toEqual('b')
      })
    }));
});
