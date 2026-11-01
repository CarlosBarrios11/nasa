import { Injectable, signal } from '@angular/core';
import { Favorite } from '../models/favoritos.model';

const STORAGE_KEY = 'astrolab_favorites';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  favorites = signal<Favorite[]>(this.load());

  private load(): Favorite[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.favorites()));
    } catch (e) {
      console.error('[FavoritesService] no se pudo guardar', e);
    }
  }

  has(id: string): boolean {
    return this.favorites().some((f) => f.id === id);
  }

  toggle(fav: Favorite): void {
    const current = this.favorites();
    const exists = current.some((f) => f.id === fav.id);
    const next = exists
      ? current.filter((f) => f.id !== fav.id)
      : [...current, fav];
    this.favorites.set(next);
    this.persist();
  }

  remove(id: string): void {
    this.favorites.set(this.favorites().filter((f) => f.id !== id));
    this.persist();
  }

  clear(): void {
    this.favorites.set([]);
    this.persist();
  }
}
