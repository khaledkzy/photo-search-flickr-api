import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ModalImageComponent } from './modal-image//modal-image.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RestClientService } from './services/photo-rest.service';
import { LoaderService } from './services/loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        SearchComponent,
        SpinnerComponent,
        ModalImageComponent,
      ],
      providers: [RestClientService, LoaderService],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
