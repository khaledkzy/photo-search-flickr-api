import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Hold the state of whether to show or hide the loading spinner.
 */
export class LoaderService {

  /**
   * A subject that hold a boolean value.
   * `true` to show the `spinner` or `false` to hide.
   */
  public isLoading = new BehaviorSubject(false);

  /**
   * Constructs an new instant of the `LoaderService`
   */
  constructor() {
    /* Empty constructor */
  }
}
