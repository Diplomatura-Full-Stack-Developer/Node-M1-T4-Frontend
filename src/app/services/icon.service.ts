import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private readonly iconRegistry: MatIconRegistry,
    private readonly sanitizer: DomSanitizer
  ) { }

  registerSocialIcons(): void {
    this.register('brand-whatsapp');
    this.register('brand-facebook');
    this.register('brand-instagram');
  }

  private register(name: string): void {
    this.iconRegistry.addSvgIcon(
      name,
      this.sanitizer.bypassSecurityTrustResourceUrl(
        `assets/icons/${name}.svg`
      )
    );
  }
}
