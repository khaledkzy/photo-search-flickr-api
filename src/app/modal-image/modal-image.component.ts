import { Component, ElementRef, ViewChild } from '@angular/core';
import { DisplayablePhoto } from '../services/photo-rest.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.less'],
})

/**
 * Popup window that displays an image with its title.
 */
export class ModalImageComponent {
  /**
   * Reference to the modal div.
   */
  @ViewChild('modal', { static: true }) MyDOMElement: ElementRef;

  constructor() {
    /* Empty Constructor */
  }

  /**
   * Injects the image inside the model div.
   * @param image The image to display.
   */
  showImageInModal(image: DisplayablePhoto): void {
    const modalImg = this.MyDOMElement.nativeElement.children[1];
    const imageTitle = this.MyDOMElement.nativeElement.children[2];
    this.MyDOMElement.nativeElement.style.display = 'block';
    modalImg.src = image.url.large;
    imageTitle.innerHTML = image.title;
    modalImg.alt = image.title;
  }

  /**
   * Closes the image modal.
   */
  closeModal(): void {
    this.MyDOMElement.nativeElement.style.display = 'none';
  }
}
