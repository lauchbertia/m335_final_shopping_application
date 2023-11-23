import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class ConfiguratorComponent {

  name: string = ''
  color: string = ''
  size: number = 0

  getFontSize () : string {
    return 20 + (this.size * 10) + 'px'
  }

  constructor() { }

}
