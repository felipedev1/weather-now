import { IApiResponse } from './../models/apiResponse.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'http://api.weatherstack.com'

  private access_key = environment.apiKey

  constructor(private http: HttpClient) { }

  public getCurrentWeather(query: string): Observable<IApiResponse> {
    const fullUrl = `${this.baseUrl}/current`
    const options = {
      params: {
        access_key: this.access_key,
        query
      }
    }
    
    return this.http.get<IApiResponse>(fullUrl, options)
  }
}
