import { Component, OnInit, inject, signal } from '@angular/core';
import { ApodService } from '../../../core/services/apod.services';
import { FavoritesService } from '../../../core/services/favoritos.service';
import { Apod } from '../../../core/models/apod.model';

@Component({
  selector: 'app-apod',
  standalone: true,
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.css']
})
export class ApodComponent implements OnInit {
  private apodService = inject(ApodService);
  private favorites = inject(FavoritesService);

  apod = signal<Apod | null>(null);
  loading = signal(true);
  errorMsg = signal('');

  ngOnInit(): void {
    this.apodService.getToday()
      .then((data) => {
        this.apod.set(data);
        this.loading.set(false);
      })
      .catch((err: Error) => {
        this.errorMsg.set(err.message);
        this.loading.set(false);
      });
  }

  get saved(): boolean {
    const a = this.apod();
    return a ? this.favorites.has(`apod-${a.fecha}`) : false;
  }

  toggleFav(): void {
    const a = this.apod();
    if (!a) return;
    this.favorites.toggle({
      id: `apod-${a.fecha}`,
      title: a.titulo,
      type: a.tipoMedio,
      url: a.urlRecurso,
      savedAt: new Date().toISOString()
    });
  }
}
