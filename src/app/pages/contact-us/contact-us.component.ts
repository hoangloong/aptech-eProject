import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  apiLoaded: Observable<boolean>;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 21.028718, lng: 105.782159 },
  };

  formContact = this._fb.group({
    full_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  constructor(httpClient: HttpClient, private _fb: FormBuilder) {
    // If you're using the `<map-heatmap-layer>` directive, you also have to include the `visualization` library
    // when loading the Google Maps API. To do so, you can add `&libraries=visualization` to the script URL:
    // https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization

    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCG_KYT4YuFlvPKkFmmQ_aV7dMH8nfwo5c',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  handleSubmit() {
    console.log(this.formContact);

    if (this.formContact.invalid) {
      this.formContact.markAllAsTouched();
    } else {
      alert('Thank You For Contact Us!');
    }
  }
}
