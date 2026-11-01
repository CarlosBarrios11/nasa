import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <header class="header">
      <div class="container header-inner">
        <a routerLink="/" class="logo">AstroLab</a>
        <nav>
          <a routerLink="/" fragment="apod">APOD</a>
          <a routerLink="/" fragment="jwst">JWST</a>
          <a routerLink="/" fragment="nasa">NASA</a>
          <a routerLink="/favoritos">Favoritos</a>
          <a routerLink="/misiones">Misiones</a>
        </nav>
      </div>
    </header>
    <main class="container">
      <router-outlet />
    </main>
  `
})
export class AppComponent {}
