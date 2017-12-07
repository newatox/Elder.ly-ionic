import { ApiProvider } from './api';
import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Api Provider: Testing Web Services', () => {
    let injector: TestBed;
    //let apiProvider: ApiProvider;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ApiProvider]
      });
      injector = getTestBed();
      //apiProvider = injector.get(ApiProvider);
      httpMock = injector.get(HttpTestingController);
    });
    /*
    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
      httpMock.verify();
    }));
    */
    it('should get a token', () => {
      inject([ApiProvider], (apiProvider) =>
      apiProvider.login({phone: "0600000042", password: "0000"}).subscribe(jsonToken => {
        console.log('test jsonToken : ', jsonToken);
        expect(jsonToken.hasOwnProperty("token"))
      }));
    });

  it('should have a token of known length 156', () => {
    inject([ApiProvider], (apiProvider) =>
      apiProvider.login({phone: "0600000042", password: "0000"}).subscribe(jsonToken => {
        expect(jsonToken["token"].toString.length).toBe(156)
      }));
  });
});
