import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FoodListComponent } from '../food-list/food-list.component';
import { FoodDetailComponent } from '../food-detail/food-detail.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule,FoodListComponent,FoodDetailComponent,RouterModule]
})
export class Tab4Page {

  constructor(
      private router : Router
  ) {}

  async create () {
    await this.router.navigate(['tabs/tab4/food'])
  }

}
