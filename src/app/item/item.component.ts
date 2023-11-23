import { Component, OnInit } from '@angular/core';
import { Item } from '../data/item';
import { List } from '../data/list';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { CameraComponent } from '../camera/camera.component';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, CommonModule, CameraComponent],
  standalone: true
})
export class ItemComponent implements OnInit {

  item: Item = new Item()
  lists: Array<List> = []
  imageUrl: string | undefined;

  public itemForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    score: new FormControl(0, Validators.required),
    list: new FormControl(0, Validators.required),
    url: new FormControl('')
  })

  constructor(
    private itemService: ItemService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService,) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
      this.itemService.getItem(id).then(
        data => {
          this.item = data
          this.itemForm = this.formBuilder.group(this.item)
        })
    }
    this.itemService.getLists().then(
      data => this.lists = data
    )
  }

  async back() {
    await this.router.navigate(['tabs', 'tab4'])
  }

  saveItem(formData: any) {
    this.item = Object.assign(formData)

    if (this.item.id) {
      this.itemService.updateItem(this.item)
        .then(payload => {
          this.back()
        })
    } else {
      const formData = this.itemForm.value;
      formData.url = this.imageUrl;
      this.notificationService.sendLocalNotification('Obacht','Da gibt es etwas neues auf deiner Liste!');
      this.itemService.createItem(this.item)
        .then(payload => {
          this.back()
        })
    }
  }

  handleImageChange(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
}
