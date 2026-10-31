import { Component, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../features/users/services/user.service';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-footer',
  imports: [MatIconModule, RouterLink],
  templateUrl: './footer.html',
})
export class Footer {

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
