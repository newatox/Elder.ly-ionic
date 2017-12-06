import {ApiProvider} from "./api";
import {TestBed, getTestBed, inject} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('Api Provider: Testing Web Services', () => {
    let injector: TestBed;
    let apiProvider: ApiProvider;
    let httpMock: HttpTestingController;

    const BASE_URL = "http://familink.cleverapps.io/";
    const LOGIN = "public/login";

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [ApiProvider]
      });
      this.injector = getTestBed();
      this.apiProvider = injector.get(ApiProvider);
      this.httpMock = injector.get(HttpTestingController);
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
      httpMock.verify();
    }));

    it('should get a token', () => {
      const fakeToken = [
        { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjA2MDAwMDAwNDIiLCJpYXQiOjE1MTI1Nzk5ODAsImV4cCI6MTUxMjU4MDI4MH0.xAYorOj-lCoDNplTzBcoq1vZuN0W-QRD6tOqB2dnD9I' }
      ];

      apiProvider.login({phone: "0600000042", password: "0000"}).subscribe(jsonToken => {
        expect(jsonToken.hasOwnProperty("token"))
      });

      const req = httpMock.expectOne(`${BASE_URL}${LOGIN}`);
      expect(req.request.method).toBe("GET");
      req.flush(fakeToken);
    });

    it('should have a token of known length 156', () => {
      apiProvider.login({phone: "0600000042", password: "0000"}).subscribe(jsonToken => {
          expect(jsonToken["token"].toString.length).toBe(156)
      });
    });
});
