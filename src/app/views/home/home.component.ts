import { IApiResponse } from './../../shared/models/apiResponse.model';
import { WeatherService } from './../../shared/services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public city = ''
  public weather: IApiResponse

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    const initialCity = localStorage.getItem('last_city') || 'New York'
    this.weatherService.getCurrentWeather(initialCity).subscribe({
      next: (weather: IApiResponse) => {
        this.weather = weather
      },
      error: (err) => console.log(err),
    })
  }

  

  search(): void {
    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: (weather: IApiResponse) => {
        this.weather = weather
        localStorage.setItem('last_city', this.city)
      },
      error: (err) => console.log(err),
    })
  }

}
