import { NgClass } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from '@components/side-menu/side-menu.component';
import { sideMenuInterface } from '@components/side-menu/side-menu.interface';
import { AuthService } from '@services/auth.service';
import { InterceptorService } from '@services/interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule, SideMenuComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private authSvc: AuthService) {}
  ngOnInit(): void {
    this.authSvc.nextAuth(this.authSvc.getAuth());
    this.authSvc.authObs.subscribe((res) => {
      if (res) {
        this.buttonMenu = [
          ...this.buttonMenuBasic,
          {
            text: 'Cerrar Sesión',
            click: this.logout,
            icon: 'logout',
            show: true,
          },
        ];
      } else {
        this.buttonMenu = [
          ...this.buttonMenuBasic,
          {
            text: 'Iniciar sesión',
            click: '/home',
            icon: 'login',
            show: true,
          },
        ];
      }
    });
  }

  isCollapsed: boolean = true;
  buttonMenu: sideMenuInterface[] = [];

  buttonMenuBasic: sideMenuInterface[] = [
    { text: 'Autores', click: '/authors', icon: 'person', show: true },
    { text: 'Libros', click: '/books', icon: 'book', show: true },
  ];
  private logout = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Cerrar Sesión',
      cancelButtonText: 'Cancelar',
    });
    if (result.isConfirmed) this.authSvc.logout();
  };
}
