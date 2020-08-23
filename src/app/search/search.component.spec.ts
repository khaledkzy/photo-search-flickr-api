import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ModalImageComponent } from '../modal-image/modal-image.component';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReactiveFormsModule } from '@angular/forms';
import { RestClientService } from '../services/photo-rest.service';
import { LoaderService } from '../services/loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, ModalImageComponent],
      imports: [
        InfiniteScrollModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [RestClientService, LoaderService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check that subscribeToFormValueChange is called from ngOnInit', () => {
    const spySubscribable = spyOn(component, 'subscribeToFormValueChange');
    component.ngOnInit();
    expect(spySubscribable).toHaveBeenCalled();
  });

});
