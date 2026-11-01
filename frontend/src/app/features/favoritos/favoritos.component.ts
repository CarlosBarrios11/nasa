import { Component, inject } from '@angular/core';
import { FavoritesService } from '../../core/services/favoritos.service';
import { Favorite } from '../../core/models/favoritos.model';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.css']
})
export class FavoritosComponent {
  favorites = inject(FavoritesService);

  limpiarTodo(): void {
    if (confirm('¿Borrar todos los favoritos?')) {
      this.favorites.clear();
    }
  }

  quitar(id: string): void {
    this.favorites.remove(id);
  }
}
