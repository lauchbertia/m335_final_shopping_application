import { Component, OnInit } from '@angular/core';
import { Food } from '../data/food';
import { Category } from '../data/category';
import { CommonModule } from '@angular/common';
import { FoodService } from '../services/item.service';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
  imports: [IonicModule,FormsModule,ReactiveFormsModule,CommonModule],
  standalone: true
})
export class ItemComponent  implements OnInit {

  food : Food = new Food()
  categories : Array<Category> = []

  public foodForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    score: new FormControl(0, Validators.required),
    category: new FormControl(0, Validators.required)
  })

  constructor(
      private foodService : FoodService,
      private formBuilder : FormBuilder,
      private router : Router,
      private route : ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
        const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);
        this.foodService.getFood(id).then(
          data => {
            this.food = data
            this.foodForm = this.formBuilder.group(this.food)
        })
    }
    this.foodService.getCategories().then(
      data => this.categories = data
    )
  }

  async back () {
    await this.router.navigate(['tabs','tab4'])
  }

  saveFood (formData : any) {
    this.food = Object.assign(formData)

    if (this.food.id) {
      this.foodService.updateFood(this.food)
        .then(payload=>{
          this.back()
        })
      } else {
        this.foodService.createFood(this.food)
          .then(payload=>{
            this.back()
          })
      }
  }


}
