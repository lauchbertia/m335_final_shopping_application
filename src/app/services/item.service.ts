import { Injectable } from "@angular/core";

import { LoadingController } from "@ionic/angular";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Food } from "src/app/data/food";
import { environment } from "src/environments/environment";

export const FOOD_TABLE = 'food'
export const CATEGORIES_TABLE = 'categories'

@Injectable({
  providedIn: 'root'
})

export class FoodService {

  private supabase: SupabaseClient

  constructor (private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

  async getCategories () {
    const { data, error } = await this.supabase
      .from(CATEGORIES_TABLE)
      .select('*')
      .order('name')

    return data || []
  }

  async getFood (id: number) {
    const { data, error } = await this.supabase
      .from(FOOD_TABLE)
      .select('*')
      .eq('id', id)
      .single()

    return data || {}
  }

  async getFoods () {
    const { data, error} = await this.supabase
      .from(FOOD_TABLE)
      .select('*')
      .order('name')

    return data || []
  }

  async updateFood (food: Food) {
    const {data, error} = await this.supabase
      .from(FOOD_TABLE)
      .update(food)
      .eq('id', food.id)
      .select()

    return data
  }

  async createFood(food : Food) {

    const {data, error} = await this.supabase
      .from(FOOD_TABLE)
      .insert({
        name: food.name,
        category: food.category,
        score: food.score
      })
      .select('*')
      .single();

    return data
  }

  async deleteFood (food: Food) {
    const {data, error} = await this.supabase
      .from(FOOD_TABLE)
      .delete()
      .eq('id', food.id)
      .select()

    return data
  }

}
