import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  handleClickSubscribe() {
    if (this.email.invalid) {
      this.email.markAllAsTouched();
    } else {
      alert('Thank You For Subscribing!');
    }
  }
}
