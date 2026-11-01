import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FavoritosComponent } from './features/favoritos/favoritos.component';
import { MisionesComponent } from './features/misiones/misiones.component';
import { MisionesDetailComponent } from './features/misiones/detail/misionesDetail.component';

export const routes: Routes = [
  { path: '',                component: HomeComponent },
  { path: 'favoritos',       component: FavoritosComponent },
  { path: 'misiones',        component: MisionesComponent },
  { path: 'misiones/:id',    component: MisionesDetailComponent },
  { path: '**',              redirectTo: '' }
];
