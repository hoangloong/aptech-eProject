import { Component } from '@angular/core';
import { SplashScreenService } from 'src/app/@common/services/splash-screen.services';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent {
  // The screen starts with the maximum opacity
  public opacityChange = 1;

  public splashTransition = '';

  // First access the splash is visible
  public showSplash = true;

  readonly ANIMATION_DURATION = 1;

  constructor(private _splashScreen: SplashScreenService) {}

  ngOnInit(): void {
    // Somewhere the stop method has been invoked
    this._splashScreen.subscribe(() => {
      this.hideSplashAnimation();
    });
  }

  private hideSplashAnimation() {
    // Setting the transition
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;

    setTimeout(() => {
      // After the transition is ended the showSplash will be hided
      this.showSplash = !this.showSplash;
    }, 1000);
  }
}
