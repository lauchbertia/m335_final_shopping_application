import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FoodService } from '../services/item.service';
import { CommonModule } from '@angular/common';
import { Food } from 'src/app/data/food';
import { Router } from '@angular/router';
import { Category } from '../data/category';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss'],
  imports: [IonicModule,CommonModule],
  standalone: true
})
export class ItemListComponent  implements OnInit {

  foods : Array<Food> | null = []
  categories : Array<Category> | null = []

  constructor(
    private foodService : FoodService,
    private router : Router) { }

  ngOnInit() {
    this.loadData()
  }

  loadData () {
    this.foodService.getCategories()
      .then(data => {
        this.categories = data
      })
    this.foodService.getFoods()
      .then(data => {
        this.foods = data
      })
  }

  getFoodsOfCategory (category : number) {
    let filteredFoods : Array<Food> = []
    if (this.foods) {
      filteredFoods = this.foods
        .filter(food => food.category == category)
    }
    return filteredFoods

  }

  async handleRefresh (event : any) {
    await this.loadData()
    event.target.complete()
  }

  async edit (food:Food) {
    await this.router.navigate(['tabs/tab4/food', food.id])
  }

  delete (food:Food) {
    this.foodService.deleteFood(food)
      .then(payload =>  {
        this.foodService.getFoods()
          .then(data => {
            this.foods = data
          })
      })
  }

}
