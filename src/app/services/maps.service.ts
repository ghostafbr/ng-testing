import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  center = { lat: 0, lng: 0 };

  constructor() {}

  getCurrentPosition() {
    console.log(navigator);
    navigator.geolocation.getCurrentPosition((position: any) => {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
    });
  }
}
