import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../features/users/services/user.service';
import { inject } from '@angular/core';

import { computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { IUser } from '../../../features/users/interfaces/user.interface';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, MatIconModule, MatMenuModule, MatButtonModule, MatIcon],
  templateUrl: './navbar.html',
})
export class Navbar {

  private userService = inject(UserService);
  user = computed(() => this.userService.user() as unknown as IUser | undefined);

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
    ...(this.user() ? [
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
    this.userService.user.set(undefined);
  };

}
