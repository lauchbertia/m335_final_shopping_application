import { Component, OnInit } from '@angular/core';
import { Item } from '../data/item';
import { List } from '../data/list';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  imports: [IonicModule,FormsModule,ReactiveFormsModule,CommonModule],
  standalone: true
})
export class ItemComponent  implements OnInit {

  item : Item = new Item()
  lists : Array<List> = []

  public itemForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    score: new FormControl(0, Validators.required),
    list: new FormControl(0,Validators.required),
    url: new FormControl('')
  })

  constructor(
      private itemService : ItemService,
      private formBuilder : FormBuilder,
      private router : Router,
      private route : ActivatedRoute) { }

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

  async back () {
    await this.router.navigate(['tabs','tab4'])
  }

  saveItem (formData : any) {
    this.item = Object.assign(formData)

    if (this.item.id) {
      this.itemService.updateItem(this.item)
        .then(payload=>{
          this.back()
        })
      } else {
        this.itemService.createItem(this.item)
          .then(payload=>{
            this.back()
          })
      }
  }


}
