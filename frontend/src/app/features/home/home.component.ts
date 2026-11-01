import { Component } from '@angular/core';
import { ApodComponent } from './apod/apod.component';
import { JwstGalleryComponent } from './jwst/jwst.component';
import { NasaLibraryComponent } from './nasaLibrary/nasaLibrary.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ApodComponent, JwstGalleryComponent, NasaLibraryComponent],
  template: `
    <app-apod id="apod" />
    <app-jwst-gallery id="jwst" />
    <app-nasa-library id="nasa" />
  `
})
export class HomeComponent {}
