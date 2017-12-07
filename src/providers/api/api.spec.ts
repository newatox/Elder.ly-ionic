import { ApiProvider } from './api';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

describe('Api Provider: Testing Web Services', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiProvider],
    });
  });

  it('Token length should be 156', async(() => {
    const apiP = TestBed.get(ApiProvider);
    apiP.login({ phone: '0600000042', password: '0000' }).subscribe((jsonToken) => {
      expect(jsonToken['token'].length).toBe(156);
    });
  }));
});
