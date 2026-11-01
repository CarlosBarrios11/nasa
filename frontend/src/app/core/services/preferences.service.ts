import { Injectable } from '@angular/core';

const PAGINATION_KEY = 'astrolab_pagination_prefs';
const MEDIA_TYPE_COOKIE = 'astrolab_tipo_media';

interface PaginationPrefs {
  jwstPerPage: number;
  libraryPerPage: number;
}

const DEFAULT_PREFS: PaginationPrefs = {
  jwstPerPage: 24,
  libraryPerPage: 12
};

@Injectable({ providedIn: 'root' })
export class UserPreferencesService {
  //PAGINACIÓN (localStorage)

  getPagination(): PaginationPrefs {
    try {
      const raw = localStorage.getItem(PAGINATION_KEY);
      if (!raw) return { ...DEFAULT_PREFS };
      const parsed = JSON.parse(raw);
      return {
        jwstPerPage: Number(parsed.jwstPerPage) || DEFAULT_PREFS.jwstPerPage,
        libraryPerPage: Number(parsed.libraryPerPage) || DEFAULT_PREFS.libraryPerPage
      };
    } catch {
      return { ...DEFAULT_PREFS };
    }
  }

  setJwstPerPage(value: number): void {
    const prefs = this.getPagination();
    prefs.jwstPerPage = value;
    this.savePagination(prefs);
  }

  setLibraryPerPage(value: number): void {
    const prefs = this.getPagination();
    prefs.libraryPerPage = value;
    this.savePagination(prefs);
  }

  private savePagination(prefs: PaginationPrefs): void {
    try {
      localStorage.setItem(PAGINATION_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.error('[UserPreferencesService] no se pudo guardar paginación', e);
    }
  }

  // ============ MEDIA TYPE (cookie) ============
  // guarda la preferencia del filtro "Tipo".
  // Expira en 30 días y se borra con clearMediaTypeCookie().

  getMediaTypeCookie(): string {
    const prefix = `${encodeURIComponent(MEDIA_TYPE_COOKIE)}=`;
    const match = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(prefix));
    return match ? decodeURIComponent(match.slice(prefix.length)) : '';
  }

  setMediaTypeCookie(value: string): void {
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie =
      `${encodeURIComponent(MEDIA_TYPE_COOKIE)}=${encodeURIComponent(value)};` +
      ` expires=${expires}; path=/; SameSite=Lax`;
  }

  clearMediaTypeCookie(): void {
    document.cookie =
      `${encodeURIComponent(MEDIA_TYPE_COOKIE)}=;` +
      ` expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
}
