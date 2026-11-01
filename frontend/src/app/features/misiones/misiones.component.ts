import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MisionesService } from '../../core/services/misiones.service';
import { Mision } from '../../core/models/mision.model';

@Component({
  selector: 'app-misiones',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './misiones.component.html',
  styleUrls: ['./misiones.component.css']
})
export class MisionesComponent implements OnInit {
  private svc = inject(MisionesService);

  items         = signal<Mision[]>([]);
  filtroDestino = signal('todos');
  loading       = signal(true);
  errorMsg      = signal('');

  ngOnInit(): void {
    this.cargar();
  }

  async cargar(): Promise<void> {
    this.loading.set(true);
    this.errorMsg.set('');
    try {
      const data = await this.svc.getAll(this.filtroDestino());
      this.items.set(data);
    } catch (err: unknown) {
      this.errorMsg.set(err instanceof Error ? err.message : 'Error desconocido');
      this.items.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  onFiltroChange(event: Event): void {
    this.filtroDestino.set((event.target as HTMLSelectElement).value);
    this.cargar();
  }
}
