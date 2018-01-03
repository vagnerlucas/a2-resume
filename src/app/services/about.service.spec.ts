import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { HttpService } from './http.service';
import { AboutService } from './about.service';

describe('AboutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [HttpService, AboutService]
    });
  });

  it('should be created', inject([AboutService], (service: AboutService) => {
    expect(service).toBeTruthy();
  }));

  it('should get about data', inject([AboutService], (service: AboutService) => {
    let result = service.getAbout();
    console.log(result);
    expect(result).not.toBeNull();
  }));
});
