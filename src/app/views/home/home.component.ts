import { IApiResponse } from './../../shared/models/apiResponse.model';
import { WeatherService } from './../../shared/services/weather.service';
import { Component, OnInit } from '@angular/core';
import { CitiesService } from 'src/app/shared/services/cities.service';
import { ICity } from 'src/app/shared/models/ICity.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public city = ''
  public searchControl = new FormControl('')
  public suggestedCities: ICity[]
  public weather: IApiResponse

  constructor(private weatherService: WeatherService,
              private citiesService: CitiesService) { }

  ngOnInit(): void {
    const initialCity = localStorage.getItem('last_city') || 'New York'
    this.weatherService.getCurrentWeather(initialCity).subscribe({
      next: (weather: IApiResponse) => {
        this.weather = weather
      },
      error: (err) => console.log(err),
    })

    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe(value => {
        this.city = value
        this.citiesService.getCities(value).subscribe({
          next: (cities => {
            this.suggestedCities = cities
          }),
          error: (err) => console.log(err)
        })
      })
  }

  search(): void {
    this.weatherService.getCurrentWeather(this.city).subscribe({
      next: (weather: IApiResponse) => {
        this.weather = weather
        localStorage.setItem('last_city', this.city)

        this.citiesService.saveCity({
          cityName: weather.location.name,
          country: weather.location.country,
          region: weather.location.region
        }).subscribe()
      },
      error: (err) => console.log(err),
    })
  }

}
