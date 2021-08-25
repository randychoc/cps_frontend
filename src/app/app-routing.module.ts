import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CotizadorComponent } from './vistas/cotizador/cotizador.component';

const routes: Routes = [
  { path: '', redirectTo: 'cotizador', pathMatch: 'full' },
  { path: 'cotizador', component: CotizadorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [CotizadorComponent];
