import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CameraComponent } from '../camera/camera.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CameraComponent],
})
export class Tab3Page {
  constructor() {}
}
