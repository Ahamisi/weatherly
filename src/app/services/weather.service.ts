import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeatherData(cityName: string): Observable<WeatherData>{
    return this.http.get<WeatherData>(environment.weatherApibaseUrl,{
       headers: new HttpHeaders()
       .set(environment.XRapidAPIHostHeaderName,environment.XRapidAPIHostHeaderValue)
       .set(environment.XRapidAPIKeyHeaderName,environment.XRapidAPIKeyHeaderValue),
       params: new HttpParams()
       .set('location', cityName)
       .set('format', 'json')
       .set('u', 'c')
     })
   }
}
