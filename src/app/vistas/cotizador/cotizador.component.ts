import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../servicios/api/api.service';
import { PaisesI } from '../../modelos/paises.interface';
import { RegionI } from 'src/app/modelos/regiones.interface';
import { DescI } from 'src/app/modelos/desc.interface';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css'],
})
export class CotizadorComponent implements OnInit {
  cotizadorForm = new FormGroup({
    pais: new FormControl('', Validators.required),
    region: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
    ancho: new FormControl('', Validators.required),
    largo: new FormControl('', Validators.required),
    alto: new FormControl('', Validators.required),
    codigo: new FormControl('0', Validators.required),
  });

  public paises: PaisesI[] = [];
  public selectedPais: PaisesI = { idPais: 0, pais: '' };
  public regiones: RegionI[] = [];
  public descs: DescI[] = [
    { idDesc: 0, tipoCliente: 'Visitante', descuento: 0 },
  ];

  public peso: number = 0.1;
  public ancho: number = 0.1;
  public largo: number = 0.1;
  public alto: number = 0.1;
  public codigo: number = 0;
  public desc: any = 0;
  public tarifa: number = 0;
  public resultado: number = 0;
  public descTipoCliente: any = 'Visitante';
  public estimado: string = 'Q0.00';

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getAllPaises().subscribe((data) => {
      this.paises = data;
    });
  }

  onCotizar(form: any) {
    this.onEstimar();
  }

  onSelectPais(id: number): void {
    this.api.getSomeRegiones(id).subscribe((data) => {
      this.regiones = data;
    });
  }

  onSelectTarifa(tarifa: number): void {
    this.tarifa = tarifa;
  }

  onValCodigo() {
    this.api.getOneDesc(this.codigo).subscribe((data) => {
      try {
        this.descs = Object.values(data);
        this.descTipoCliente = this.descs[1];
        this.desc = this.descs[2];
        return true;
      } catch (error) {
        return false;
      }
    });
    this.descTipoCliente = 'Visitante';
  }

  onEstimar() {
    this.resultado =
      this.peso * this.tarifa +
      1.66 * this.alto * this.largo * this.ancho -
      this.desc * 0.5 * this.peso;
    this.estimado = 'Q' + this.resultado;
  }
}
