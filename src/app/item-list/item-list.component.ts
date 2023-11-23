import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ItemService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { Item } from 'src/app/data/item';
import { Router } from '@angular/router';
import { List } from '../data/list';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  imports: [IonicModule,CommonModule],
  standalone: true
})
export class ItemListComponent  implements OnInit {

  items : Array<Item> | null = []
  lists : Array<List> | null = []

  constructor(
    private itemService : ItemService,
    private router : Router) { }

  ngOnInit() {
    this.loadData()
  }

  loadData () {
    this.itemService.getLists()
      .then(data => {
        this.lists = data
      })
    this.itemService.getItems()
      .then(data => {
        this.items = data
      })
  }

  getItemsOfList (list : number) {
    let filteredFoods : Array<Item> = []
    if (this.items) {
      filteredFoods = this.items
        .filter(food => food.list == list)
    }
    return filteredFoods

  }

  async handleRefresh (event : any) {
    await this.loadData()
    event.target.complete()
  }

  async edit (item:Item) {
    await this.router.navigate(['tabs/tab4/item', item.id])
  }

  delete (item:Item) {
    this.itemService.deleteItem(item)
      .then(payload =>  {
        this.itemService.getItems()
          .then(data => {
            this.items = data
          })
      })
  }

}
