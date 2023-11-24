import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ConfiguratorComponent } from '../configurator/configurator.component';
import { GeolocatorComponent } from '../geolocator/geolocator.component';
import { BatteryStatusComponent } from '../battery-status/battery-status.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, ConfiguratorComponent, GeolocatorComponent,BatteryStatusComponent],
})
export class Tab1Page {
  constructor() {}
}
