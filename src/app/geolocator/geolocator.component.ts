import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GeolocatorService } from '../services/geolocator.service';

interface Coordinates {
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-geolocator',
  templateUrl: './geolocator.component.html',
  styleUrls: ['./geolocator.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class GeolocatorComponent implements OnInit {

  latitude: number = 0;
  longitude: number = 0;
  altitude: number | null = 0;
  distanceToHome: number | null = null;
  HOME_LOCATION: Coordinates = { latitude: 0, longitude: 0 }; // Beispielkoordinaten

  constructor(public geolocationService: GeolocatorService) { }

  async getCurrentPosition() {
    const position = await this.geolocationService.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.altitude = position.coords.altitude;
  }

  resetPosition() {
    this.latitude = 0;
    this.longitude = 0;
    this.altitude = null;
  }

  ngOnInit() {
    this.getCurrentPosition();
  }

  calculateDistance(coord1: Coordinates, coord2: Coordinates): number {
    const earthRadius = 6371e3; // Erdradius in Metern
  
    const lat1 = this.degreesToRadians(coord1.latitude);
    const lat2 = this.degreesToRadians(coord2.latitude);
    const deltaLat = this.degreesToRadians(coord2.latitude - coord1.latitude);
    const deltaLon = this.degreesToRadians(coord2.longitude - coord1.longitude);
  
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return earthRadius * c; // Distanz in Metern
  }

  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  setHomeLocation(latitude: number, longitude: number) {
    this.HOME_LOCATION.latitude = latitude;
    this.HOME_LOCATION.longitude = longitude;
  }

  setHome() {
    const latitude = 47.5596;
    const longitude = 7.5886;
    this.setHomeLocation(this.latitude, this.longitude);
  }

  calculateDistanceToHome() {
    if (this.HOME_LOCATION.latitude !== 0 || this.HOME_LOCATION.longitude !== 0) {
      this.distanceToHome = this.calculateDistance(
        { latitude: this.latitude, longitude: this.longitude },
        this.HOME_LOCATION
      );
    } else {
      // Behandlung, falls Zuhause noch nicht gesetzt wurde
      console.error("Zuhause-Standort ist nicht gesetzt.");
    }
  }

}
