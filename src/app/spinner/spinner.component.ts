import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.less'],
})
/**
 * Shows a loading spinner when an api called.
 */
export class SpinnerComponent implements OnInit, OnDestroy {

  /**
   * A flag to either hide or show the spinner.
   */
  isLoading: boolean;

  /**
   * A variable to store the subscription.
   */
  private subscription: Subscription;

  /**
   * `SpinnerComponent` Constructor.
   *
   * @param loaderService Service that determine that state of the `SpinnerComponent`.
   */
  constructor(public loaderService: LoaderService) { }

  /**
   * Subscribe to the `LoaderService` after the component has been created by angular.
   */
  ngOnInit() {
    this.subscription = this.loaderService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  /**
   * Unsubscribe from the observable when the component gets destroyed.
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
