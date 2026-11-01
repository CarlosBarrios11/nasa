import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NasaLibraryService, SearchResult } from '../../../core/services/nasa-library.service';
import { FavoritesService } from '../../../core/services/favoritos.service';
import { UserPreferencesService } from '../../../core/services/preferences.service';
import { NasaCard } from '../../../core/models/nasa-item.model';

@Component({
  selector: 'app-nasa-library',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nasaLibrary.component.html',
  styleUrls: ['./nasaLibrary.component.css']
})
export class NasaLibraryComponent implements OnInit {
  private svc = inject(NasaLibraryService);
  private favorites = inject(FavoritesService);
  private prefs = inject(UserPreferencesService);

  q          = signal('');
  mediaType  = signal<'' | 'image' | 'video' | 'audio'>('');
  yearStart  = signal('');
  yearEnd    = signal('');

  items    = signal<NasaCard[]>([]);
  loading  = signal(false);
  errorMsg = signal('');
  page     = signal(1);
  pageSize = signal(12);
  total    = signal(0);

  ngOnInit(): void {
    // Restaurar preferencias
    this.pageSize.set(this.prefs.getPagination().libraryPerPage);
    const cookieType = this.prefs.getMediaTypeCookie();
    if (cookieType === 'image' || cookieType === 'video' || cookieType === 'audio') {
      this.mediaType.set(cookieType);
    }
    this.buscar();
  }

  async buscar(): Promise<void> {
    this.loading.set(true);
    this.errorMsg.set('');
    try {
      const res: SearchResult = await this.svc.search({
        q: this.q(),
        media_type: this.mediaType(),
        year_start: this.yearStart(),
        year_end: this.yearEnd(),
        page: this.page(),
        page_size: this.pageSize()
      });
      this.items.set(res.items);
      this.total.set(res.total);
    } catch (err: unknown) {
      this.errorMsg.set(err instanceof Error ? err.message : 'Error desconocido');
      this.items.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  limpiar(): void {
    this.q.set('');
    this.mediaType.set('');
    this.yearStart.set('');
    this.yearEnd.set('');
    this.page.set(1);
    this.prefs.clearMediaTypeCookie();   // ← borrar cookie
    this.buscar();
  }

  onMediaTypeChange(value: string): void {
    this.mediaType.set(value as '' | 'image' | 'video' | 'audio');
    this.prefs.setMediaTypeCookie(value);  // ← guardar cookie
  }

  onPerPageChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement).value);
    this.pageSize.set(value);
    this.prefs.setLibraryPerPage(value);   // ← guardar preferencia
    this.page.set(1);
    this.buscar();
  }

  prev(): void {
    if (this.page() > 1) { this.page.set(this.page() - 1); this.buscar(); }
  }
  next(): void {
    if (this.page() * this.pageSize() < this.total()) {
      this.page.set(this.page() + 1);
      this.buscar();
    }
  }

  isFav(id: string): boolean { return this.favorites.has(id); }

  toggleFav(item: NasaCard): void {
    this.favorites.toggle({
      id: item.id,
      title: item.title,
      type: item.type,
      url: item.type === 'image' ? item.thumbnail : item.detailUrl,
      thumbnail: item.thumbnail,
      savedAt: new Date().toISOString()
    });
  }

  get favCount(): number { return this.favorites.favorites().length; }
  get totalPaginas(): number {
    return Math.ceil(this.total() / this.pageSize()) || 1;
  }
}
