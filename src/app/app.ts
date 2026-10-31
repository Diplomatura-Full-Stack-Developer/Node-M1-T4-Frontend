import { Component, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { IconService } from './services/icon.service';
@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-m1-t3');


  constructor(private router: Router, private iconService: IconService) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        localStorage.setItem('lastUrl', event.urlAfterRedirects);
      });
    this.iconService.registerSocialIcons();
  }

  ngOnInit(): void {
    const lastUrl = localStorage.getItem('lastUrl');

    if (lastUrl) {
      this.router.navigateByUrl(lastUrl);
    }
  }
}
