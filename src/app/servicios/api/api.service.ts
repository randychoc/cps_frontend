import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaisesI } from '../../modelos/paises.interface';
import { RegionI } from '../../modelos/regiones.interface';
import { DescI } from '../../modelos/desc.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllPaises(): Observable<PaisesI[]> {
    let direccion = '/api/paises';
    return this.http.get<PaisesI[]>(direccion);
  }

  getAllRegiones(): Observable<RegionI[]> {
    let direccion = '/api/regiones';
    return this.http.get<RegionI[]>(direccion);
  }

  getSomeRegiones(id: number): Observable<RegionI[]> {
    let direccion = '/api/regiones/query?idPais=' + id;
    return this.http.get<RegionI[]>(direccion);
  }

  getAllDesc(): Observable<DescI[]> {
    let direccion = '/api/desc';
    return this.http.get<DescI[]>(direccion);
  }
  getOneDesc(id: number): Observable<DescI[]> {
    let direccion = '/api/desc/' + id;
    return this.http.get<DescI[]>(direccion);
  }
}
