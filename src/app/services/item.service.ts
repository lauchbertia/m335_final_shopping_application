import { Injectable } from "@angular/core";

import { LoadingController } from "@ionic/angular";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Item } from "src/app/data/item";
import { environment } from "src/environments/environment";
import { List } from "../data/list";

export const ITEMS_TABLE = 'items'
export const LISTS_TABLE = 'lists'

@Injectable({
  providedIn: 'root'
})

export class ItemService {

  private supabase: SupabaseClient

  constructor (private loadingCtrl: LoadingController) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  createLoader() {
    return this.loadingCtrl.create()
  }

  async getList (id: number) {
    const { data, error } = await this.supabase
      .from(LISTS_TABLE)
      .select('*')
      .eq('id', id)
      .single()

    return data || {}
  }

  async getLists () {
    const { data, error } = await this.supabase
      .from(LISTS_TABLE)
      .select('*')
      .order('name')

    return data || []
  }

  async updateList (list: List) {
    const {data, error} = await this.supabase
      .from(LISTS_TABLE)
      .update(list)
      .eq('id', list.id)
      .select()

    return data
  }

  async createList(list: List) {

    const {data, error} = await this.supabase
      .from(LISTS_TABLE)
      .insert({
        name: list.name,
      })
      .select('*')
      .single();

    return data
  }

  async deleteList (list: List) {
    const {data, error} = await this.supabase
      .from(LISTS_TABLE)
      .delete()
      .eq('id', list.id)
      .select()

    return data
  }

  async getItem (id: number) {
    const { data, error } = await this.supabase
      .from(ITEMS_TABLE)
      .select('*')
      .eq('id', id)
      .single()

    return data || {}
  }

  async getItems () {
    const { data, error} = await this.supabase
      .from(ITEMS_TABLE)
      .select('*')
      .order('name')

    return data || []
  }

  async updateItem (item: Item) {
    const {data, error} = await this.supabase
      .from(ITEMS_TABLE)
      .update(item)
      .eq('id', item.id)
      .select()

    return data
  }

  async createItem(item: Item) {
    try {
      const imageUrl = item.url;
      const base64Image = await this.imageToBase64(imageUrl);
  
      const { data, error } = await this.supabase
        .from(ITEMS_TABLE)
        .insert({
          name: item.name,
          list: item.list,
          url: base64Image,
        })
        .select('*')
        .single();
  
      if (error) {
        console.error('Supabase error:', error);
        throw new Error('Supabase error occurred.');
      }
  
      console.log('Supabase response:', data);
  
      return data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw new Error('Error creating item.');
    }
  }

  async imageToBase64(imageUrl: string): Promise<string> {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return this.blobToBase64(blob);
  }

  async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

  async deleteItem (item: Item) {
    const {data, error} = await this.supabase
      .from(ITEMS_TABLE)
      .delete()
      .eq('id', item.id)
      .select()

    return data
  }

}
