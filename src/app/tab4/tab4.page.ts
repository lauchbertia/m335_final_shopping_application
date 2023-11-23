import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ItemComponent } from '../item/item.component';
import { ItemListComponent } from '../item-list/item-list.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule,ItemListComponent,ItemComponent,RouterModule]
})
export class Tab4Page {

  constructor(
      private router : Router
  ) {}

  async create () {
    await this.router.navigate(['tabs/tab4/item'])
  }

}
