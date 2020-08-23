import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { DisplayablePhoto, RestClientService } from '../services/photo-rest.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent implements OnInit, OnDestroy {

  /**
   * Images that either null, or not available.
   */
  public erroredPhotos = {};

  /**
   * The list of images that is returned from the observable.
   */
  public photos = [];

  /**
   * triggered when 90% (100% - 10%) has been scrolled.
   */
  public infiniteScrollDistanceValue = 10;

  /**
   * Triggers the onScroll method 1 second after the user stops scrolling.
   */
  public ThrottleValue = 1000;

  /**
   * Form Control for the search input.
   */
  public searchControl: FormControl = new FormControl();

  /**
   * A variable to store the subscription.
   */
  private subscription: Subscription;

  /**
   * A flag to determine weather the user has scrolled or not.
   */
  private hasScrolled = true;

  /**
   * `SearchComponent` constructor.
   *
   * @param rest Rest service that interacts with the flickr api.
   * @param loaderService Service that determine that state of the `SpinnerComponent`.
   */
  constructor(
    private rest: RestClientService,
    public loaderService: LoaderService
  ) {
    /* Empty Constructor */
  }

  /**
   * Triggered after the component has been created by angular.
   */
  ngOnInit(): void {
    this.subscribeToFormValueChange();
  }

  /**
   * Unsubscribe from the observable when the component gets destroyed.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Called when the user has reached the bottom 10% of the page.
   */
  public onScroll(): void {
    this.rest.hasScrolledSubject.next(this.hasScrolled);
  }

  /**
   * Gets called if the photos is broken.
   */
  public onError(i: number) {
    this.erroredPhotos[i] = true;
  }


  /**
   * Subscribes to the changes returned from the `searchControl`.
   */
  public subscribeToFormValueChange(): void {
    this.subscription = this.searchControl.valueChanges
      .pipe(
        tap((_) => this.loaderService.isLoading.next(true)),
        debounceTime(1000),
        switchMap((value: string) => {
          return this.rest.fetchPhotos(value);
        }),
        catchError((err) => of([]))
      )
      .subscribe(
        (res) => {
          // We got data back, remove the loading spinner.
          this.loaderService.isLoading.next(false);
          this.photos = res;
        },
        (error) => {
          // An error ocurred, remove the loading spinner.
          this.loaderService.isLoading.next(false);
          console.error('HTTP Error', error);
        }
      );
  }
}
