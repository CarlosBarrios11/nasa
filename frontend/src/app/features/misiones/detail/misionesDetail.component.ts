import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MisionesService } from '../../../core/services/misiones.service';
import { Mision } from '../../../core/models/mision.model';

@Component({
  selector: 'app-misiones-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './misionesDetail.component.html',
  styleUrls: ['./misionesDetail.component.css']
})
export class MisionesDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private svc = inject(MisionesService);

  misiones: Mision[] = [];       // ← array (no null, no Mision[])
  destinoBuscado = '';           // ← para mostrar en el título
  loading = true;
  errorMsg = '';

  async ngOnInit(): Promise<void> {
    const destinoParam = this.route.snapshot.paramMap.get('destino');

    if (!destinoParam) {
      this.errorMsg = 'Destino inválido';
      this.loading = false;
      return;
    }

    this.destinoBuscado = decodeURIComponent(destinoParam);

    try {
      // El service ya sabe traducir esto a ?destino=... en el backend,
      // y el backend invoca filtrarPorDestino()
      const data = await this.svc.getAll(this.destinoBuscado);
      this.misiones = data;

      if (data.length === 0) {
        this.errorMsg = `No hay misiones registradas para "${this.destinoBuscado}"`;
      }
    } catch (err: unknown) {
      this.errorMsg = err instanceof Error ? err.message : 'Error desconocido';
    } finally {
      this.loading = false;
    }
  }
}
