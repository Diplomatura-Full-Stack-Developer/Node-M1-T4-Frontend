import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../features/users/services/user.service';
import { inject } from '@angular/core';

import { computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatIconModule, MatMenuModule, MatButtonModule, MatIcon],
  templateUrl: './navbar.html',
})
export class Navbar {

  private userService = inject(UserService);
  session = toSignal(this.userService.session$, { initialValue: undefined });

  menuItems = computed<{ label: string; routerLink?: string; action?: () => void }[]>(() => [
    {
      label: 'Inicio',
      routerLink: '/'
    },
    {
      label: 'Nosotros',
      routerLink: '/about'
    },
    {
      label: 'Contacto',
      routerLink: '/contact'
    },
    ...(this.session() ? [
      {
        label: 'Cerrar sesión',
        action: () => this.logout()
      }
    ] : [
      {
        label: 'Iniciar sesión',
        routerLink: '/login'
      }
    ])
  ]);



  logout = () => {
    this.userService.logoutUser();
  };

}
