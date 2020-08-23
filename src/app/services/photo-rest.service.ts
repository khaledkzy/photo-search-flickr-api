import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, OperatorFunction } from 'rxjs';
import { LoaderService } from './loader.service';
import {
  BASE_URL,
  RESPONSE_FORMAT,
  NO_JSON_CALLBACK,
  PHOTOS_PER_PAGE
} from './photo-rest-constants';

/**
 * The data structure returned by the flickr api for a single image.
 */
export interface RawFlickrPhoto {
  farm: string;
  id: string;
  secret: string;
  server: string;
  title: string;
}

/**
 * The JSON structure returned by the flickr api.
 */
export interface FlickrSearchResultOutput {
  photos: {
    photo: RawFlickrPhoto[];
  };
}

/**
 * The two size that we use within the app.
 */
export interface DisplayablePhotoSize {
  medium: string;
  large: string;
}

/**
 * The final data structure that is returned from
 * the observable and used within the search component.
 */
export interface DisplayablePhoto {
  url: DisplayablePhotoSize;
  title: string;
}

@Injectable({
  providedIn: 'root',
})

/**
 * Service to handle REST call interactions with the flickr api
 * and returns a `DisplayablePhoto` that the view can subscribe to.
 */
export class RestClientService {
  /**
   * True if the user scrolled down, otherwise false.
   */
  public hasScrolledSubject: BehaviorSubject<boolean> = new BehaviorSubject(
    false
  );

  /**
   * The previous search keyword.
   */
  public previousKeyword: string;

  /**
   * The current page number for the current search keyword.
   */
  public pageCount = 1;

  /**
   * A placeholder array for the list of photos.
   */
  public displayablePhotos: DisplayablePhoto[] = [];

  /**
   * `RestService` constructor.
   *
   * @param http The HttpClient service.
   */
  constructor(private http: HttpClient, public loaderService: LoaderService) {
    /* Empty Constructor */
  }

  /**
   * The observable that we subscribe to from the search component.
   *
   * @param keyword The input search value provided by the user.
   * @returns An array of DisplayablePhoto observable.
   */
  public fetchPhotos(keyword: string): Observable<DisplayablePhoto[]> {
    return this.hasScrolledSubject.pipe(
      tap((_) => this.loaderService.isLoading.next(true)),
      switchMap((hasScrolled) => {
        this.incrementOrResetPageCount(hasScrolled, keyword);
        return this.getPhotos(keyword).pipe(this.mapPhotos());
      })
    );
  }

  /**
   * Query the flickr search api.
   *
   * @param keyword The input search value provided by the user.
   * @return An `Observable` of the response body as a JSON object.
   */
  public getPhotos(keyword: string): Observable<object> {
    return this.http.get(this.constructGetUrl(keyword));
  }

  /**
   * Constructs a GET url using the keyword that is provided by the user.
   *
   * @param keyword The input search value provided by the user.
   * @returns The URL that is used to fetch the photos.
   */
  private constructGetUrl(keyword: string): string {
    return (
      BASE_URL +
      `api_key=${environment.flickr.key}` +
      `&text=${keyword}` +
      `&${RESPONSE_FORMAT}` +
      `&${NO_JSON_CALLBACK}` +
      `safe_search=1` +
      `&${PHOTOS_PER_PAGE}` +
      `&page=${this.pageCount}`
    );
  }

  /**
   * Maps the photos from the raw json format to the DisplayablePhoto.
   *
   * @returns An operator map function with `DisplayablePhoto[]` as its returned value.
   */
  private mapPhotos(): OperatorFunction<FlickrSearchResultOutput, DisplayablePhoto[]> {
    return map((res: FlickrSearchResultOutput) => {
      res && res.photos &&
        res.photos.photo.forEach((photo: RawFlickrPhoto) =>
          this.displayablePhotos.push(this.getPhotoUrlAndTitle(photo))
        );
      return this.displayablePhotos;
    });
  }

  /**
   * Convert the raw json output that is returned by the GET request to
   * an photo object that has a url and a title.
   *
   * @param photo The current photo that is returned from the GET request.
   */
  private getPhotoUrlAndTitle(photo: RawFlickrPhoto): DisplayablePhoto {
    return {
      url: this.constructPhotoUrl(photo),
      title: photo.title.substring(0, 15),
    };
  }

  /**
   * Using the `RawFlickrPhoto` constructs a URL for the two different image sizes.
   *
   * @param photo The raw json photo returned by the GET request.
   * @returns The url of the photo.
   */
  private constructPhotoUrl(photo: RawFlickrPhoto): DisplayablePhotoSize {
    const url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
    return {
      medium: `${url}.jpg`,
      large: `${url}_b.jpg`,
    };
  }

  /**
   * Increment the `pageCount` variable when the user scrolled down, otherwise rests its value.
   *
   * @param hasScrolled True if the user scrolled down, otherwise false.
   * @param keyword The input search value provided by the user.
   */
  private incrementOrResetPageCount(hasScrolled: boolean, keyword: string) {
    if (hasScrolled && this.previousKeyword === keyword) {
      this.pageCount++;
    } else {
      this.displayablePhotos = [];
      this.previousKeyword = keyword;
      this.pageCount = 1;
    }
  }
}
