import { IErrorResponse } from './../models/errorResponse.model';
import { map } from 'rxjs/operators';
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

    return this.http.get(fullUrl, options).pipe(
      map((response) => {
        // as the API returns errors with a status of 200 OK, 
        // I had to throw an error manually

        const errorResponse = response as IErrorResponse
        const successResponse = response as IApiResponse

        if (errorResponse.success === false) {
          alert('Request failed. Check the city and try again')
          throw errorResponse
        }

        return successResponse
      })
    )
  }
}
