import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from '../models/ICity.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private citiesApiBaseUrl = 'https://localhost:44360/api/cities'

  constructor(private http: HttpClient) { }

  public getCities(query: string): Observable<ICity[]> {
    const options = {
      params: {
        query
      }
    }

    return this.http.get<ICity[]>(this.citiesApiBaseUrl, options)
  }

  public saveCity(city: ICity): Observable<ICity> {
    return this.http.post<ICity>(this.citiesApiBaseUrl, city)
  }
}
