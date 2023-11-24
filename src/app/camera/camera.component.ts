import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class CameraComponent {

  imageUrl : string | undefined
  @Output() imageChanged = new EventEmitter<string>();

  constructor() { }

  async takePicture() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      quality: 100,
    });
  
    this.imageUrl = image.dataUrl;
    this.imageChanged.emit(this.imageUrl); // Emit the data URL directly
  }


  resetPicture () {
    this.imageUrl = ''
  }

  //ngOnInit() {}

}
