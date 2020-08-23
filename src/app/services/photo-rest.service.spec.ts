import { fakeAsync, TestBed } from '@angular/core/testing';
import { RestClientService } from './photo-rest.service';
import { LoaderService } from './loader.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('RestService', () => {
  let httpMock: HttpTestingController;
  let service: RestClientService;
  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RestClientService, LoaderService],
    });
    service = bed.get(RestClientService);
    httpMock = bed.get(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the rest service at least once', fakeAsync(() => {
    let response;
    service.fetchPhotos('a').toPromise()
      .then(value => {
        response = value;
      });
    httpMock.expectOne(() => true);
  }));
});
