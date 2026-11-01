import { Component, OnInit, inject, signal } from '@angular/core';
import { JwstService } from '../../../core/services/jwst.service';
import { FavoritesService } from '../../../core/services/favoritos.service';
import { UserPreferencesService } from '../../../core/services/preferences.service';
import { JwstImage } from '../../../core/models/jwst.model';

@Component({
  selector: 'app-jwst-gallery',
  standalone: true,
  templateUrl: './jwst.component.html',
  styleUrls: ['./jwst.component.css']
})
export class JwstGalleryComponent implements OnInit {
  private svc = inject(JwstService);
  private favorites = inject(FavoritesService);
  private prefs = inject(UserPreferencesService);

  items    = signal<JwstImage[]>([]);
  loading  = signal(true);
  errorMsg = signal('');
  page     = signal(1);
  perPage  = signal(24);
  hayMas   = signal(false);

  ngOnInit(): void {
    // Restaurar preferencia de per-page
    this.perPage.set(this.prefs.getPagination().jwstPerPage);
    this.cargar();
  }

  async cargar(): Promise<void> {
    this.loading.set(true);
    this.errorMsg.set('');
    try {
      const res = await this.svc.getImages(this.page(), this.perPage());
      this.items.set(res.body);
      this.hayMas.set(res.hayMas);
    } catch (err: unknown) {
      this.errorMsg.set(err instanceof Error ? err.message : 'Error desconocido');
      this.items.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  prev(): void {
    if (this.page() > 1) { this.page.set(this.page() - 1); this.cargar(); }
  }
  next(): void {
    if (this.hayMas()) { this.page.set(this.page() + 1); this.cargar(); }
  }

  onPerPageChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.perPage.set(value);
    this.prefs.setJwstPerPage(value);   // ← guardar preferencia
    this.page.set(1);
    this.cargar();
  }

  isFav(id: string): boolean { return this.favorites.has(id); }

  toggleFav(item: JwstImage, index: number): void {
    this.favorites.toggle({
      id: item.id,
      title: `JWST image ${index + 1}`,
      type: 'image',
      url: item.url,
      savedAt: new Date().toISOString()
    });
  }

  get favCount(): number { return this.favorites.favorites().length; }
}
